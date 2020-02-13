import Vue from 'vue';
import Bootstrap from 'bootstrap';
import Axios from "axios";
import cointable from './components/cointable';
import coinmodal from './components/coinmodal';

// Enable vue event logic
window.Event = new Vue();

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
    el: '#root',

    components: {
        cointable,
        coinmodal,
    },
});
