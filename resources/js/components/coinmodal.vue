<template>
    <div id="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <!-- Modal header -->
                <div class="modal-header">
                    <h2 class="text-bold text-success">{{ coin.name }} ({{ coin.symbol }})</h2>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="modal-body row">
                    <!-- Coin price -->
                    <card title="Price" :body="coin.priceUsd"></card>

                    <!-- Coin market cap -->
                    <card title="Market cap" :body="coin.marketCapUsd"></card>

                    <!-- Coin supply -->
                    <card title="Supply" :body="coin.supply"></card>

                    <!-- Coin volume -->
                    <card title="Volume" :body="coin.volumeUsd24Hr"></card>

                    <!-- Coin portfolio adding logic -->
                    <div v-if="loggedin" class="input-group col-md-6 justify-content-center mt-3 mb-3">
                        <input :ref="'amount'" class="form-control" value="" type="text" placeholder="Amount" aria-label="Amount">

                        <div class="input-group-append">
                            <button @click="UpdateCoinAmount()" class="btn btn-outline-success" type="button">Set # owned</button>
                        </div>

                        <div class="input-group-append">
                            <a href="/portfolio" class="btn btn-outline-success">Manage coins</a>
                        </div>
                    </div>

                    <!-- Coin price chart -->
                    <line-chart v-if="chartData.labels.length" class="col-md-12" :chart-data="chartData" :options="options"></line-chart>

                    <!-- Loading spinner animation -->
                    <div class="d-flex col-md-12 justify-content-center mt-3" v-if="!chartData.labels.length">
                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>

                    <!-- Feedback notifications -->
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
    import card from "./card";
    import $ from "jquery";

    export default {
        name: "coinmodal",

        components: { LineChart, notifications, card },

        props: {
            loggedin: Boolean
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
            // Present modal to user for coin
            PresentModal(coin) {
                // Set current coin
                this.coin = coin;

                console.log("Requesting coin history for coin: " + this.coin.id);

                // Get coin history
                Axios.get("https://api.coincap.io/v2/assets/" + this.coin.id + "/history?interval=d1")
                    .then((response) => this.CoinHistoryReceived(response))
                    .catch((response) => console.log(response));

                // Get my coin data, if logged in
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

            // Handle coin history when received
            CoinHistoryReceived (response) {        
                // Add coin price data for every seventh day to chart data
                for (var index = response.data.data.length - 1; index > 0; index -= 7) {
                    this.chartData.labels.push(moment(response.data.data[index].time).format('LL'));
                    this.chartData.datasets[0].data.push(response.data.data[index].priceUsd);
                }

                // Reverse data to ascending date
                this.chartData.labels.reverse();
                this.chartData.datasets[0].data.reverse();

                console.log("Succesfully set chart price data!");
            },

            // Handle my coin amount when received
            MyCoinDataReceived(response) {
                // Get owned amount
                var amount = response.data;

                // Check if amount is valid
                if (amount == undefined || isNaN(amount) || parseFloat(amount) <= 0) {
                    console.log("ERROR: Tried to parse received coin count, but value was empty, not a valid float or <= 0!");
                    return;
                }

                // Set amount owned
                this.$refs.amount.value = amount;

                console.log("Succesfully set owned coin amount!");
            },

            // Reset modal completely
            ResetModal() {
                // Reset chart data
                this.chartData.labels = [];
                this.chartData.datasets[0].data = [];

                // Reset coin
                this.coin = [];

                // Reset amount owned
                if (this.$refs.amount != null)
                    this.$refs.amount.value = "";

                // Clear messages
                this.$refs.notifications.ClearMessages();

                console.log("Hiding modal!!!!!")
            },

            // Update coin owned amount on user request
            UpdateCoinAmount() {
                // Retrieve new amount form input
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

                // Send request to update coin owned amount
                Axios.post("/mycoins/" + this.coin.id, formData)
                    .then((response) => this.CoinAmountUpdated(response, this.coin.id))
                    .catch((response) => console.log(response));
            },

            // When coin amount has been updated
            CoinAmountUpdated(response, coinId) {
                // Get new amount
                var newAmount = response.data;

                // Check if new amount is valid
                if (newAmount == undefined || newAmount == '' || isNaN(newAmount) || parseFloat(newAmount) <= 0 || this.coin.id != coinId) {
                    console.log("ERROR: Tried to parse new coin amount, but returned value isn't valid or a new coin is shown!");
                    return;
                }

                // Update count
                this.$refs.amount.value = newAmount;
                
                // Show message to user
                this.$refs.notifications.AddMessage("You now own " + newAmount + " coins of id coinId!", "alert-success", true);
                
                console.log("Succesfully updated coin amount to: " + newAmount + "!");
            }
        },

        mounted() {
            // When show graph event fires, present modal
            Event.$on('showGraph', this.PresentModal);

            // Reset modal when modal is dismissing
            $("#modal").on('hide.bs.modal', this.ResetModal);
        }
    }
</script>