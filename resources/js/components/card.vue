<template>
    <div class="col-sm-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-success">{{ title }}</h5>
                <p class="card-text">{{ body }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",

        props: {
            title: String,
            body: String
        },
    }
</script>