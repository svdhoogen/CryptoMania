import Vue from 'vue';
import Bootstrap from 'bootstrap';
import Axios from "axios";
import cointable from './components/cointable';

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
    el: '#root',

    components: {
        cointable,
    },
});
