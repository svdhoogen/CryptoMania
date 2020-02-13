<template>
    <div id="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    {{ coin.name }}
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Price</h5>
                            <p class="card-text">$ {{ coin.priceUsd }}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Market cap</h5>
                            <p class="card-text">$ {{ coin.marketCapUsd }}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Supply</h5>
                            <p class="card-text">{{ coin.supply }}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Volume</h5>
                            <p class="card-text">{{ coin.volumeUsd24Hr }}</p>
                        </div>
                    </div>

                    <!-- Loading spinner animation -->
                    <div class="d-flex justify-content-center" v-if="!history.length">
                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";
    import $ from "jquery";

    export default {
        name: "coinmodal",

        data() {
            return {
                coin: [],
                history: []
            }
        },

        methods: {
            GetCoinHistory () {
                Axios.get("https://api.coincap.io/v2/assets/" + this.coin.id + "/history?interval=d1").then((response) => {
                    this.history = response.data.data;
                    console.log(this.history);
                });
            },

            PresentModal(coin) {
                this.coin = coin;

                console.log("Presenting modal for coin: " + coin.id)
                $('#modal').modal('show');
                this.GetCoinHistory();
            },

            ResetModal() {
                this.coin = [];
                this.history = [];
                console.log("Hiding modal!!!!!")
            }
        },

        mounted() {
            Event.$on('showGraph', this.PresentModal);

            $("#modal").on('hide.bs.modal', this.ResetModal);
        }
    }
</script>