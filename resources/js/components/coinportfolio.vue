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
                <tr v-for="coin in coins" :key="coin.coin_id">
                    <td>{{ coin.name }} </td>
                    <td><img class="mr-2" height="20" :src="'images/coin-logos/' + coin.coin_id + '.png'" />{{ coin.symbol }}</td>
                    <td>{{ coin.priceUsd }}</td>
                    <td>{{ coin.priceUsd * coin.count}}</td>
                    <td>{{ coin.count }}</td>
                    <td>
                        <div class="input-group mb-3">
                            <input :ref="'amount-' + coin.coin_id" class="form-control" :value="coin.count" type="text" placeholder="Amount" aria-label="Amount">
                            <div class="input-group-append">
                                <button @click="UpdateCoinAmount(coin.coin_id)" class="btn btn-outline-success" type="button">Set # owned</button>
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
                myCoins: [],
                coins: []
            }
        },

        methods: {
            // When user wants to update coin amount
            UpdateCoinAmount(coinId) {
                // Retrieve new value form input
                var newAmount = this.$refs['amount-' + coinId][0].value;

                // Retrieve coin to update
                var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coinId);

                // Check if new amount is valid
                if (myCoin == undefined || newAmount == undefined || isNaN(newAmount) || parseFloat(newAmount) <= 0 || myCoin.count == newAmount) {
                    console.log("ERROR: Tried to parse amount entered, but value was empty, not a valid float or equal to current amount!");
                    return;
                }

                console.log("Updating " + myCoin.coin_id + " to new amount: " + parseFloat(newAmount));

                // Create form data
                var formData = new FormData();
                formData.append("coin_id", myCoin.coin_id);
                formData.append("count", newAmount);

                // Send post request to update coin amount
                Axios.post("/mycoins", formData).then((response) => this.CoinAmountUpdated(response, myCoin));
            },
            
            // When coin amount has been updated
            CoinAmountUpdated(response, myCoin) {
                console.log(response);

                // Get new amount
                var newAmount = response.data;

                // Check if amount is valid
                if (newAmount == undefined || newAmount == '' || isNaN(newAmount) || parseFloat(newAmount) <= 0) {
                    console.log("ERROR: Tried to parse new coin amount, but returned value isn't valid!");
                    return;
                }

                console.log("Succesfully updated coin amount to: " + newAmount + "!");

                // Update local count
                myCoin.count = newAmount;
            },

            // When user wants to remove a coin
            RemoveCoin(coinId) {
                console.log("Removing " + coinId);

                // Retrieve coin to delete
                var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coinId);

                // Check if coin found
                if (myCoin == undefined) {
                    console.log("ERROR: Tried to retrieve coin to delete, but coin was not found!");
                    return;
                }

                // Send delete request to delete coin
                Axios.delete("/mycoins/" + myCoin.coin_id).then((response) => this.CoinRemoved(response))
            },

            // When coin has been removed
            CoinRemoved(response) {
                console.log(response);

                // Get coin id
                var coinId = response.data;

                // Check if id is valid
                if (coinId == undefined || coinId == '') {
                    console.log("ERROR: Tried to parse deleted coin, but returned coin id isn't valid!");
                    return;
                }

                // Retrieve coin to delete
                var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coinId);

                // Check if coin found
                if (myCoin == undefined) {
                    console.log("ERROR: Tried to retrieve coin which was delete, but coin was not found!");
                    return;
                }

                // Null coin
                myCoin = null;
            },

            // Retrieved my coins
            MyCoinsRetrieved(response) {
                // Set data
                this.myCoins = response.data;

                console.log("Retrieved my coins successfully!");

                // Coin cap url
                var coinCapUrl = 'https://api.coincap.io/v2/assets?ids=';

                // Add each id to coin cap url
                this.myCoins.forEach(coin => { coinCapUrl += coin.coin_id + ','; })

                console.log("Getting coin data about my coins from url: " + coinCapUrl);

                // Retrieve coin data
                Axios.get(coinCapUrl).then((response) => this.CoinDataRetrieved(response));
            },

            // When coin data retrieved, add data from coins to my coin array
            CoinDataRetrieved(response) {
                response.data.data.forEach(coin => {
                    // Find coin by id
                    var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coin.id);

                    // Update price if coin found
                    if (myCoin != null) {
                        myCoin.name = coin.name;
                        myCoin.symbol = coin.symbol;
                        myCoin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);
                    }
                });

                // Set coins
                this.coins = this.myCoins;

                console.log("Retrieved data for my coins successfully!");
                console.log(this.coins);
            }
        },

        computed:{
        },

        mounted() {
            Axios.get("/mycoins").then((response) => this.MyCoinsRetrieved(response));
        }
    }
</script>