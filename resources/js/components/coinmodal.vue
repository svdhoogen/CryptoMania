<template>
    <div id="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    {{ coin.name }}
                </div>
                <div class="modal-body">
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

                console.log("Showing graph for coin: " + coin.id)
                $('#modal').modal('show');
                this.GetCoinHistory();
            }
        },

        mounted() {
            Event.$on('showGraph', this.PresentModal);
        }
    }
</script>