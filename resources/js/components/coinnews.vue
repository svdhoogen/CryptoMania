<template>
    <div class="col-md-8 justify-content-center">
        <!-- News item -->
        <div class="card mb-2" v-for="news in data" :key="news.id">
            <div class="card-body row">
                <!-- Image thumbnail -->
                <div class="col-md-3">
                    <a :href="news.url">
                        <img :src="news.thumbnail" alt="Article image">
                    </a>
                </div>

                <!-- Title + intro -->
                <div class="col-md-9">
                    <a :href="news.url">
                        <h5 class="card-title text-success">{{ news.title }}</h5>
                    </a>
                    <p class="card-text">{{ news.description}}</p>
                </div>

                <!-- Source link -->
                <a :href="news.url">
                    <p class="text-muted font-weight-lighter font-italic mb-0 ml-3 mt-2">Source: {{ news.source.name }}, {{ news.publishedAt }}</p>
                </a>
            </div>
        </div>

        <!-- Loading spinner animation -->
        <div class="d-flex justify-content-center mt-5" v-if="!data.length">
            <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import Axios from "axios";

    export default {
        name: "coinnews",

        data() {
            return {
                data: []
            }
        },

        methods: {
            // Handle news data when received
            NewsDataReceived (response) {
                // Get received data
                this.data = response.data;

                // Format published date
                this.data.forEach(news => {
                    news.publishedAt = moment(news.publishedAt).format('LL');
                });
            },
        },

        mounted() {
            // Get news articles from crypto control API
            Axios.get("https://cryptocontrol.io/api/v1/public/news?language=en", { 'headers': { 'x-api-key': "ca309c24e5710df683fcfbeb52ebd9fd" } })
                .then((response) => this.NewsDataReceived(response))
                .catch((response) => console.log(response));
        }
    }
</script>