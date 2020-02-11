<template>
    <table class="table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Supply</th>
                <th>Max supply</th>
                <th>Market cap $</th>
                <th>Volume $ hr</th>
                <th>Price $</th>
                <th>% Change 24 hr</th>
                <th>Vwap 24 hr</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" v-bind:key="item.rank">
                <td>{{ item.rank }}</td>
                <td>{{ item.symbol }}</td>
                <td>{{ item.name }} </td>
                <td>{{ item.supply}} </td>
                <td>{{ item.maxSupply}} </td>
                <td>{{ item.marketCapUsd }}</td>
                <td>{{ item.volumeUsd24Hr }}</td>
                <td>{{ item.priceUsd }}</td>
                <td>{{ item.changePercent24Hr }}</td>
                <td>{{ item.vwap24Hr }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "cointable",

        props: {
        },

        data() {
            return {
                data: []
            }
        },

        methods: {
            GetCoinData () {
                axios.get("https://api.coincap.io/v2/assets").then((response) => {
                    console.log(response.data.data);
                    this.data = response.data.data;
                    console.log(this.data);
                });
            }
        },

        mounted() {
            this.GetCoinData();
        }
    }
</script>