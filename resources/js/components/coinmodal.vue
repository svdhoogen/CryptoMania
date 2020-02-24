<template>
    <div id="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-bold text-success">{{ coin.name }} ({{ coin.symbol }})</h2>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row">
                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-success">Price</h5>
                                <p class="card-text">$ {{ coin.priceUsd }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-success">Market cap</h5>
                                <p class="card-text">$ {{ coin.marketCapUsd }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-success">Supply</h5>
                                <p class="card-text">{{ coin.supply }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-success">Volume</h5>
                                <p class="card-text">{{ coin.volumeUsd24Hr }}</p>
                            </div>
                        </div>
                    </div>

                    <div v-if="loggedin" class="input-group col-md-6 justify-content-center mt-3 mb-3">
                        <input :ref="'amount'" class="form-control" value="" type="text" placeholder="Amount" aria-label="Amount">

                        <div class="input-group-append">
                            <button @click="UpdateCoinAmount()" class="btn btn-outline-success" type="button">Set # owned</button>
                        </div>

                        <div class="input-group-append">
                            <a href="/portfolio" class="btn btn-outline-success">Manage coins</a>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <line-chart v-if="chartData.labels.length" :chart-data="chartData" :options="options"></line-chart>
                    </div>

                    <!-- Loading spinner animation -->
                    <div class="d-flex col-md-12 justify-content-center mt-3" v-if="!chartData.labels.length">
                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>

                    <notifications class="col-md-12 mt-4" ref="notifications"></notifications>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import notifications from "./notifications";
    import LineChart from "../LineChart.js";
    import moment from "moment";
    import Axios from "axios";
    import $ from "jquery";

    export default {
        name: "coinmodal",

        components: { LineChart, notifications },

        props: {
            loggedin: String
        },

        data() {
            return {
                coin: [],
                chartData: {
                    labels: [],
                    datasets: [{
                        label: 'Price past 2 years',
                        data: [],
                        borderColor: "#21bb45",
                        backgroundColor: "rgba(44, 211, 83, 0.2)",
                        pointBackgroundColor: "#39e661",
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        },

        methods: {
            // Handle coin history when received
            CoinHistoryReceived (response) {
                console.log(response);
                
                for (var index = response.data.data.length - 1; index > 0; index -= 7) {
                    this.chartData.labels.push(moment(response.data.data[index].time).format('LL'));
                    this.chartData.datasets[0].data.push(response.data.data[index].priceUsd);
                }

                this.chartData.labels.reverse();
                this.chartData.datasets[0].data.reverse();

                console.log("Succesfully set chart data!");
                console.log(this.chartData);
            },

            // Handle my coin data when received
            MyCoinDataReceived(response) {
                console.log(response);

                var amount = response.data;

                if (amount == undefined || isNaN(amount) || parseFloat(amount) <= 0) {
                    console.log("ERROR: Tried to parse received coin count, but value was empty, not a valid float or <= 0!");
                    return;
                }

                console.log("Succesfully set coin count!");

                // Update count
                this.$refs['amount'].value = amount;
            },

            // Present modal to user
            PresentModal(coin) {
                // Update current coin
                this.coin = coin;

                console.log("Requesting coin history for coin: " + this.coin.id);

                // Get coin history
                Axios.get("https://api.coincap.io/v2/assets/" + this.coin.id + "/history?interval=d1")
                    .then((response) => this.CoinHistoryReceived(response))
                    .catch((response) => console.log(response));

                // Get my coin data
                if (this.loggedin) {
                    console.log("Logged in so requestion my coin count for: " + this.coin.id);
                    Axios.get("/mycoins/" + coin.id)
                        .then((response) => this.MyCoinDataReceived(response))
                        .catch((response) => console.log(response));
                }

                console.log("Presenting modal for coin: " + coin.id)

                // Show modal
                $('#modal').modal('show');
            },

            // Reset modal completely
            ResetModal() {
                // Reset amount
                this.$refs['amount'].value = "";

                // Reset coin
                this.coin = [];

                // Reset chart data
                this.chartData.labels = [];
                this.chartData.datasets[0].data = [];

                console.log("Hiding modal!!!!!")
            },

            // When user wants to update coin amount
            UpdateCoinAmount() {
                // Retrieve new value form input
                var newAmount = this.$refs['amount'].value;

                // Check if new amount is valid
                if (newAmount == undefined || isNaN(newAmount) || parseFloat(newAmount) <= 0 || this.coin.count == newAmount) {
                    console.log("ERROR: Tried to parse amount entered, but value was empty, not a valid float or equal to current amount!");
                    return;
                }

                console.log("Updating " + this.coin.id + " to new amount: " + parseFloat(newAmount));

                // Create form data
                var formData = new FormData();
                formData.append("count", newAmount);

                // Send post request to update coin amount
                Axios.post("/mycoins/" + this.coin.id, formData)
                    .then((response) => this.CoinAmountUpdated(response, this.coin.id))
                    .catch((response) => console.log(response));
            },

            // When coin amount has been updated
            CoinAmountUpdated(response, coinId) {
                console.log(response);

                // Get new amount
                var newAmount = response.data;

                // Check if amount is valid
                if (newAmount == undefined || newAmount == '' || isNaN(newAmount) || parseFloat(newAmount) <= 0 || this.coin.id != coinId) {
                    console.log("ERROR: Tried to parse new coin amount, but returned value isn't valid or a new coin is shown!");
                    return;
                }

                // Update count
                this.$refs['amount'].value = newAmount;
                
            
                this.$refs.notifications.AddMessage("You now own " + newAmount + " coins of id coinId!", "alert-success", true);
                
                console.log("Succesfully updated coin amount to: " + newAmount + "!");
            }
        },

        mounted() {
            Event.$on('showGraph', this.PresentModal);

            $("#modal").on('hide.bs.modal', this.ResetModal);
        }
    }
</script>