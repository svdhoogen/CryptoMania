<template>
    <div class="col-md-12">
        <input class="form-control col-md-3 mb-3" v-model="filter" type="text" placeholder="Search" aria-label="Search"/>

        <table id="table-coin" class="bg-light table table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center border-success bg-green" @click="SortTable('rank')">Rank</th>
                    <th class="text-center border-success bg-green" @click="SortTable('name')">Name</th>
                    <th class="text-center border-success bg-green" @click="SortTable('symbol')">Symbol</th>
                    <th class="text-center border-success bg-green" @click="SortTable('priceUsd')">Price $</th>
                    <th class="text-center border-success bg-green" @click="SortTable('marketCapUsd')">Market cap $</th>
                    <th class="text-center border-success bg-green" @click="SortTable('changePercent24Hr')">% 24hr</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coin in sortedCoins" :key="coin.rank" @click="ShowGraph(coin)">
                    <td>{{ coin.rank }}</td>
                    <td>{{ coin.name }} </td>
                    <td><img class="mr-2" height="20" :src="'images/coin-logos/' + coin.id + '.png'" />{{ coin.symbol }}</td>
                    <td>{{ coin.priceUsd }}</td>
                    <td>{{ coin.marketCapUsd }}</td>
                    <td v-bind:class="{ 'text-success': coin.changePercent24Hr > 0, 'text-danger': coin.changePercent24Hr < 0 }">{{ coin.changePercent24Hr }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Loading spinner animation -->
        <div class="d-flex justify-content-center" v-if="!coins.length">
            <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";
    
    export default {
        name: "cointable",

        data() {
            return {
                coins: [],
                sort: 'rank',
                sortDir:'asc',
                filter:''
            }
        },

        methods: {
            // When initial coin data has been received, handle data + initialize web socket
            CoinDataReceived(response) {
                this.coins = response.data.data;

                console.log(this.coins);

                // Normalize values to 2 decimals
                this.coins.forEach(coin => {
                    coin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);
                    coin.marketCapUsd = parseFloat(coin.marketCapUsd).toFixed(2);
                    coin.changePercent24Hr =  parseFloat(coin.changePercent24Hr).toFixed(2);
                    coin.volumeUsd24Hr =  parseFloat(coin.volumeUsd24Hr).toFixed(2);
                    coin.supply =  parseFloat(coin.supply).toFixed(2);
                });

                this.InitializeWebSocket();
            },

            // Initializes web socket for live updated prices
            InitializeWebSocket() {
                var assets = [];

                // Constructs list of all assets, using coin id + ','
                this.coins.forEach(coin => { assets.push(coin.id + ','); })

                // Init websocket from adress with all 200 assets
                const priceUpdate = new WebSocket('wss://ws.coincap.io/prices?assets=' + assets);

                // On price update, update prices
                priceUpdate.onmessage = (msg) => this.UpdatePrices(JSON.parse(msg.data));;
            },

            // Emits show graph event with corresponding coin
            ShowGraph(coin) {
                console.log("Raising show graph event for coin: " + coin);
                Event.$emit('showGraph', coin);
            },

            // Updates the table with a new sort
            SortTable(newSort) {
                // If same sort, reverse order
                if (newSort === this.sort)
                    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';

                // Else reset to ascending
                else
                    this.sortDir = 'asc';

                // Update current sort
                this.sort = newSort;
            },

            // Updates price on new price received
            UpdatePrices(prices) {
                for (var key in prices) {
                    // Find coin by id
                    var coin = this.coins.find(coin => coin.id === key);

                    // Update price if coin found
                    if (coin != null)
                        coin.priceUsd = prices[key]
                }
            },

            // When user scrolls, check if reached the bottom and load more coins if he has
            OnScroll() {
                if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1)
                    this.LoadMoreCoins();
            },

            // Load more coins
            LoadMoreCoins() {
                console.log("Loading more coins!");
            }
        },

        computed:{
            // Reactive array of coins sorted by current configuration
            sortedCoins() {
                var filteredCoins = this.coins;

                if (this.filter != '')
                    filteredCoins = this.coins.filter(coin => coin.name.toLowerCase().trim().includes(this.filter.toLowerCase().trim()));
                   
                
                console.log(this.filter);

                console.log(filteredCoins);

                return filteredCoins.sort((a, b) => {
                    if (this.sort == 'name' || this.sort == 'symbol') {
                        let modifier = 1;

                        // Descending, reverse order
                        if (this.sortDir == 'desc')
                            modifier = -1;
                        
                        // String is alphabetically later
                        if (a[this.sort] > b[this.sort])
                            return modifier;

                        // String is alphabetically first
                        if (a[this.sort] < b[this.sort])
                            return -modifier;

                        // Strings are equal
                        return 0;
                    }
                    
                    // Return sorting order
                    if (this.sortDir == 'asc')
                        return a[this.sort] - b[this.sort];
                    else
                        return b[this.sort] - a[this.sort]
                });
            }
        },

        mounted() {
            window.onscroll = () => this.OnScroll();

            // Retrieve initial coin data + initialize web socket when done
            Axios.get("https://api.coincap.io/v2/assets")
                .then((response) => this.CoinDataReceived(response))
                .catch((response) => console.log(response));
        }
    }
</script>