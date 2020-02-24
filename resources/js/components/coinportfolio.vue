<template>
    <div class="col-md-12" ref="these">
        <!-- Crypto portfolio table -->
        <table class="bg-light table table-bordered">
            <!-- Table header -->
            <thead class="thead-dark">
                <tr>
                    <th class="text-center border-success bg-green">Name</th>
                    <th class="text-center border-success bg-green">Symbol</th>
                    <th class="text-center border-success bg-green">Price $</th>
                    <th class="text-center border-success bg-green">Owned $</th>
                    <th class="text-center border-success bg-green">Owned #</th>
                    <th class="text-center border-success bg-green">Set # owned</th>
                </tr>
            </thead>

            <!-- Table body -->
            <tbody>
                <tr v-for="coin in myCoins" :key="coin.coin_id">
                    <td>{{ coin.name }} </td>
                    <td><img class="mr-2" height="20" :src="'images/coin-logos/' + coin.coin_id + '.png'" />{{ coin.symbol }}</td>
                    <td>{{ coin.priceUsd }}</td>
                    <td>{{ coin.priceUsd * coin.count}}</td>
                    <td>{{ coin.count }}</td>
                    <td>
                        <div class="input-group">
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
        <div class="d-flex justify-content-center" v-if="!myCoins.length && !noData">
            <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        
        <!-- Feedback notifications -->
        <notifications ref="notifications"></notifications>
    </div>
</template>

<script>
    import notifications from "./notifications";
    import Axios from "axios";

    export default {
        name: "coinportfolio",

        components: { notifications },

        data() {
            return {
                myCoins: [],
                noData: false
            }
        },

        methods: {
            // Get my coin data from server
            GetMyCoinData() {
                // Get my coin data
                Axios.get("/mycoins")
                    .then((response) => this.MyCoinDataReceived(response))
                    .catch((response) => console.log(response));
            },

            // Handle my coin data and get coin data from API
            MyCoinDataReceived(response) {
                // Set data
                this.myCoins = response.data;

                // No coins retrieved, redirect user
                if (this.myCoins == undefined || this.myCoins.length == 0) {
                    this.RedirectUser();
                    return;
                }

                console.log("Retrieved my coins successfully!");

                // Coin cap url
                var coinCapUrl = 'https://api.coincap.io/v2/assets?ids=';

                // Add each coin id to coin cap url for requesting coin data
                this.myCoins.forEach(coin => { coinCapUrl += coin.coin_id + ','; })

                console.log("Getting coin data about my coins from url: " + coinCapUrl);

                // Retrieve coin data from api
                Axios.get(coinCapUrl)
                    .then((response) => this.CoinDataRetrieved(response))
                    .catch((response) => console.log(response));
            },

            // Handle coin data when received
            CoinDataRetrieved(response) {
                // Fill in missing coin data
                response.data.data.forEach(coin => {
                    // Find coin by id
                    var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coin.id);

                    // Set data for coin if found
                    if (myCoin == null) {
                        myCoin.name = coin.name;
                        myCoin.symbol = coin.symbol;
                        myCoin.priceUsd = parseFloat(coin.priceUsd).toFixed(8);
                    }
                });

                // Force update, vue doesn't detect changes made by above for loop
                this.$forceUpdate();

                console.log("Retrieved data for my coins successfully!");
            },

            // Update coin owned amount on user request
            UpdateCoinAmount(coinId) {
                // Retrieve new amount
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

                // Send request to update coin owned amount
                Axios.post("/mycoins", formData)
                    .then((response) => this.CoinAmountUpdated(response, myCoin))
                    .catch((response) => console.log(response));
            },
            
            // When coin amount has been updated
            CoinAmountUpdated(response, myCoin) {
                // Get new amount
                var newAmount = response.data;

                // Check if amount is valid
                if (newAmount == undefined || newAmount == '' || isNaN(newAmount) || parseFloat(newAmount) <= 0) {
                    console.log("ERROR: Tried to parse new coin amount, but returned value isn't valid!");
                    return;
                }

                console.log("Succesfully updated coin amount to: " + newAmount + "!");

                // Update count
                myCoin.count = newAmount;

                // Show message to user
                this.$refs.notifications.AddMessage("Succesfully updated " + myCoin.name + " amount to: " + newAmount, "alert-success", true);
            },

            // Remove coin from portfolio on user request
            RemoveCoin(coinId) {
                console.log("Removing " + coinId);

                // Retrieve coin to delete
                var myCoin = this.myCoins.find(myCoin => myCoin.coin_id === coinId);

                // Check if coin found
                if (myCoin == undefined) {
                    console.log("ERROR: Tried to retrieve coin to delete, but coin was not found!");
                    return;
                }

                // Send request to delete delete coin
                Axios.delete("/mycoins/" + myCoin.coin_id)
                    .then((response) => this.CoinRemoved(response))
                    .catch((response) => console.log(response));
            },

            // When coin has been removed
            CoinRemoved(response) {
                // Get coin id
                var coinId = response.data;

                // Check if id is valid
                if (coinId == undefined || coinId == '') {
                    console.log("ERROR: Tried to parse deleted coin, but returned coin id isn't valid!");
                    return;
                }
                
                // Remove coin from my coins
                this.myCoins.splice(this.myCoins.findIndex(coin => coin.coin_id == coinId), 1);

                // Show message to user
                this.$refs.notifications.AddMessage("Succesfully removed coin from your portfolio!", "alert-success", true);

                console.log("Succesfully removed coin!");

                // No more coins, redirect user
                if (this.myCoins.length == 0)
                    this.RedirectUser();
            },

            // Redirect user in 5 seconds and show message
            RedirectUser() {
                console.log("No coins! Redirecting user!");

                // No data
                this.noData = true;

                // Show message to user
                this.$refs.notifications.AddMessage("You have no coins! Add them from the crypto table by clicking a coin and setting amount there! Redirecting in 5 seconds...", "alert-warning", false);

                // Redirect to home after 5 secs
                setTimeout(function() { window.location.href = "/"; }, 5000);
            }
        },

        mounted() {
            // Get my coin data
            this.GetMyCoinData();
        }
    }
</script>