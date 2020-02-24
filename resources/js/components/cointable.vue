<template>
    <div class="col-md-12">
        <!-- Search box -->
        <input class="form-control col-md-3 mb-3" v-model="filter" type="text" placeholder="Search" aria-label="Search"/>

        <!-- Crypto coin table -->
        <table id="table-coin" class="bg-light table table-bordered table-hover">
            <!-- Table header -->
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

            <!-- Table body -->
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
                requestOffset: 0,
                sort: 'rank',
                sortDir:'asc',
                filter:''
            }
        },

        methods: {
            // Emits show graph event for requested coin
            ShowGraph(coin) {
                console.log("Raising show graph event for coin: " + coin);

                Event.$emit('showGraph', coin);
            },

            // Updates current table sort
            SortTable(newSort) {
                // If same sort, reverse order
                if (newSort === this.sort)
                    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';

                // Else default to ascending
                else
                    this.sortDir = 'asc';

                // Update current sort
                this.sort = newSort;
            },

            // When user scrolls to bottom, load more coins
            OnScroll() {
                if (window.scrollY + window.innerHeight > document.body.scrollHeight - 1)
                    this.LoadMoreCoins();
            },

            // Load more coins
            LoadMoreCoins() {
                console.log("Loading more coins! Offset: " + this.offset);

                // Get coin data for current offset
                Axios.get("https://api.coincap.io/v2/assets?offset=" + this.requestOffset * 100)
                    .then((response) => this.CoinDataReceived(response))
                    .catch((response) => console.log(response));
            },

            // Handle coin data when received and initialize web socket
            CoinDataReceived(response) {
                console.log("Received response for coin data! Adding data to coins!");

                // Request offset up
                this.requestOffset++;

                // Get new coins
                var newCoins = response.data.data;

                // Normalize values and add each coin to coins
                newCoins.forEach(coin => {
                    // Eight decimals for price
                    coin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);

                    // Two decimals for other values
                    coin.changePercent24Hr =  parseFloat(coin.changePercent24Hr).toFixed(2);
                    coin.volumeUsd24Hr =  parseFloat(coin.volumeUsd24Hr).toFixed(2);
                    coin.marketCapUsd = parseFloat(coin.marketCapUsd).toFixed(2);
                    coin.supply =  parseFloat(coin.supply).toFixed(2);

                    // Push coin to coins
                    this.coins.push(coin);
                });

                // Initialize web socket for new coins
                this.InitializeWebSocket(newCoins);
            },

            // Init web socket to live update coin prices
            InitializeWebSocket(newCoins) {
                // Id's of new coins
                var assets = [];

                // Constructs list of all assets, using coin id + ','
                newCoins.forEach(coin => { assets.push(coin.id + ','); })

                // Create web socket for assets
                const priceUpdate = new WebSocket('wss://ws.coincap.io/prices?assets=' + assets);

                // On price update, update prices
                priceUpdate.onmessage = (msg) => this.UpdatePrices(JSON.parse(msg.data));;
            },

            // Updates price when new price is received
            UpdatePrices(prices) {
                for (var key in prices) {
                    // Find coin by id
                    var coin = this.coins.find(coin => coin.id === key);

                    // Update coin price
                    if (coin != null)
                        coin.priceUsd = prices[key]
                }
            }
        },

        computed:{
            // Reactive array of coins, sorted by current order and search term
            sortedCoins() {
                // Get coins
                var filteredCoins = this.coins;

                // Filter by search term
                if (this.filter != '')
                    filteredCoins = this.coins.filter(coin => coin.name.toLowerCase().trim().includes(this.filter.toLowerCase().trim()));
                
                // Return filtered coins, sorted as strings
                if (this.sort == 'name' || this.sort == 'symbol') {
                    return filteredCoins.sort((a, b) => {
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
                    });
                }
                
                // Return filtered coins, sorted as int
                return filteredCoins.sort((a, b) => {
                    // Return sorting order
                    if (this.sortDir == 'asc')
                        return a[this.sort] - b[this.sort];
                    else
                        return b[this.sort] - a[this.sort]
                });
            }
        },

        mounted() {
            // Subscribe to on scroll event
            window.onscroll = () => this.OnScroll();

            // Load initial coins
            this.LoadMoreCoins();
        }
    }
</script>