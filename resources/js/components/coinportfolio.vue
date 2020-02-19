<template>
    <div class="col-md-12">
        <table class="bg-light table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center border-success bg-green">Name</th>
                    <th class="text-center border-success bg-green">Symbol</th>
                    <th class="text-center border-success bg-green">Price $</th>
                    <th class="text-center border-success bg-green">Owned $</th>
                    <th class="text-center border-success bg-green">Owned #</th>
                    <th class="text-center border-success bg-green">Set #</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="coin in myCoins" :key="coin.coin_id">
                    <td>{{ coin.name }} </td>
                    <td><img class="mr-2" height="20" :src="'images/coin-logos/' + coin.coin_id + '.png'" />{{ coin.symbol }}</td>
                    <td>{{ coin.priceUsd }}</td>
                    <td>{{ coin.priceUsd * coin.count}}</td>
                    <td>{{ coin.count }}</td>
                    <td>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Amount" aria-label="Amount">
                            <div class="input-group-append">
                                <button @click="UpdateAmount(coin.coin_id)" class="btn btn-outline-success" type="button">Set # owned</button>
                            </div>
                            <div class="input-group-append">
                                <button @click="RemoveCoin(coin.coin_id)" class="btn btn-outline-danger" type="button">Remove</button>
                            </div>
                        </div>
                    </td>
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
                myCoins: []
            }
        },

        methods: {
            UpdateAmount(coin) {
                console.log("Updating " + coin)
            }
        },

        computed:{
        },

        mounted() {
            // Retrieve my coins
            Axios.get("/mycoins").then((response) => {
                this.myCoins = response.data;

                console.log(this.myCoins);

                // Get all id's
                var coinCapUrl = 'https://api.coincap.io/v2/assets?ids=';

                // Constructs list of all assets, using coin id + ','
                this.myCoins.forEach(coin => { coinCapUrl += coin.coin_id + ','; })

                console.log("Getting coin data from url: " + coinCapUrl);

                // Retrieve coin data for owned coins
                Axios.get(coinCapUrl).then((response) => {
                    this.coins = response.data.data;

                    response.data.data.forEach(coin => {
                        // Find coin by id
                        var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coin.id);

                        // Update price if coin found
                        if (myCoin != null)
                            myCoin.name = coin.name;
                            myCoin.symbol = coin.symbol;
                            myCoin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);
                    });
                });
            })
        }
    }
</script>