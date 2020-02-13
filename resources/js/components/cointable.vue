<template>
    <div>
        <table class="bg-light table table-bordered table-hover table-coin">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center bg-success border-green">Rank</th>
                    <th class="text-center bg-success border-green">Name</th>
                    <th class="text-center bg-success border-green">Symbol</th>
                    <th class="text-center bg-success border-green">Price $</th>
                    <th class="text-center bg-success border-green">Market cap $</th>
                    <th class="text-center bg-success border-green">% 24hr</th>
                </tr>
            </thead>
            <tbody id="table-body-coin">
                <tr v-for="coin in data" v-bind:key="coin.rank" v-on:click="">
                    <td>{{ coin.rank }}</td>
                    <td>{{ coin.name }} </td>
                    <td>{{ coin.symbol }}</td>
                    <td>{{ coin.priceUsd }}</td>
                    <td>{{ coin.marketCapUsd }}</td>
                    <td v-bind:class="{ 'text-success': coin.changePercent24Hr > 0, 'text-danger': coin.changePercent24Hr < 0 }">{{ coin.changePercent24Hr }}</td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-center">
            <div v-if="!data.length" class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "cointable",

        props: {
            source: String
        },

        data() {
            return {
                data: []
            }
        },

        methods: {
            GetCoinData () {
                Axios.get("https://api.coincap.io/v2/assets").then((response) => {
                    this.data = response.data.data;
                    console.log(this.data);

                    this.data.forEach(coin => {
                        coin.priceUsd = parseFloat(coin.priceUsd).toFixed(2);
                        coin.marketCapUsd = parseFloat(coin.marketCapUsd).toFixed(2);
                        coin.changePercent24Hr =  parseFloat(coin.changePercent24Hr).toFixed(2);
                    });
                });
            }
        },

        mounted() {
            this.GetCoinData();
        }
    }
</script>