<template>
    <div class="col-md-12">
        <table id="table-coin" class="bg-light table table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center border-success bg-green" @click="SortTable('name')">Name</th>
                    <th class="text-center border-success bg-green" @click="SortTable('symbol')">Symbol</th>
                    <th class="text-center border-success bg-green" @click="SortTable('priceUsd')">Price $</th>
                    <th class="text-center border-success bg-green" @click="SortTable('priceUsd')">Owned #</th>
                    <th class="text-center border-success bg-green" @click="SortTable('priceUsd')">Owned $</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coin in coins" :key="coin.rank" @click="ShowGraph(coin)">
                    <td>{{ coin.name }} </td>
                    <td><img class="mr-2" height="20" :src="'images/coin-logos/' + coin.id + '.png'" />{{ coin.symbol }}</td>
                    <td>{{ coin.priceUsd }}</td>
                    <td>{{ coin.count }}</td>
                    <td>{{ coin.priceUsd * coin.count}}</td>
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
        name: "coinportfolio",

        data() {
            return {
                coins: [],
            }
        },

        methods: {
        },

        computed:{
        },

        mounted() {
            // Retrieve coin data for owned coins
            Axios.get("https://api.coincap.io/v2/assets").then((response) => {
                
            });
        }
    }
</script>