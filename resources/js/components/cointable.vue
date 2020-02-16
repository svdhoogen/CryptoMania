<template>
    <div class="col-md-12 mt-5">
        <table class="bg-light table table-bordered table-hover table-coin">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center border-success bg-green">Rank</th>
                    <th class="text-center border-success bg-green">Name</th>
                    <th class="text-center border-success bg-green">Symbol</th>
                    <th class="text-center border-success bg-green">Price $</th>
                    <th class="text-center border-success bg-green">Market cap $</th>
                    <th class="text-center border-success bg-green">% 24hr</th>
                </tr>
            </thead>
            <tbody id="table-body-coin">
                <tr v-for="coin in coins" :key="coin.rank" @click="ShowGraph(coin)">
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
                coins: []
            }
        },

        methods: {
            GetCoinData () {
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

            ShowGraph(coin) {
                console.log("Raising show graph event for coin: " + coin);
                Event.$emit('showGraph', coin);
            }
        },

        mounted() {
            this.GetCoinData();
        }
    }
</script>