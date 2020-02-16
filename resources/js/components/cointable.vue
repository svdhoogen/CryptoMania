<template>
    <div class="col-md-12 mt-5">
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
                    <td>{{ coin.symbol }}</td>
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
                sortDir:'asc'
            }
        },

        methods: {
            // Retrieves coin data from coincap api
            GetCoinData() {
                Axios.get("https://api.coincap.io/v2/assets").then((response) => {
                    this.coins = response.data.data;
                    console.log(this.coins);

                    this.coins.forEach(coin => {
                        coin.priceUsd = parseFloat(coin.priceUsd).toFixed(2);
                        coin.marketCapUsd = parseFloat(coin.marketCapUsd).toFixed(2);
                        coin.changePercent24Hr =  parseFloat(coin.changePercent24Hr).toFixed(2);
                        coin.volumeUsd24Hr =  parseFloat(coin.volumeUsd24Hr).toFixed(2);
                        coin.supply =  parseFloat(coin.supply).toFixed(2);
                    });
                });
            },

            // Emits show graph event with corresponding coin
            ShowGraph(coin) {
                console.log("Raising show graph event for coin: " + coin);
                Event.$emit('showGraph', coin);
            },

            // Updates the table with a new sort
            SortTable(newSort) {
                // If new sort is current sort, reverse order
                if (newSort == this.sort)
                    this.sortDir = this.sortDir == 'asc' ? 'desc' : 'asc';

                // Else reset order to ascending
                else
                    this.sortDir = 'asc';

                // Update sort
                this.sort = newSort;
            }
        },

        computed:{
            // Array of coins sorted by user's liking, reactive property
            sortedCoins() {
                var sorted;

                // Sort as string
                if (this.sort == 'name' || this.sort == 'symbol') {
                    console.log('Sorting ' + this.sort + ' as strings!');

                    sorted = this.coins.sort((a, b) => {
                        // String a goes later
                        if (a[this.sort] > b[this.sort])
                            return 1;

                        // String b goes later
                        if (a[this.sort] < b[this.sort])
                            return -1;

                        // Same string
                        return 0;
                    });
                }
                // Sort as numeric
                else {
                    console.log('Sorting ' + this.sort + ' as numeric!');

                    sorted = this.coins.sort((a, b) => {
                            return a[this.sort] - b[this.sort];
                    });
                }

                // Reverse array if descending
                if (this.sortDir == 'desc')
                    sorted.reverse();

                // Return array
                return sorted;
            }
        },

        mounted() {
            this.GetCoinData();
        }
    }
</script>