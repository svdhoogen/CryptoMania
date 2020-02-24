import Axios from "axios";
import _ from 'bootstrap';
import Vue from 'vue';

import notifications from './components/notifications';
import coinportfolio from './components/coinportfolio';
import cointable from './components/cointable';
import coinmodal from './components/coinmodal';
import coinnews from './components/coinnews';

// Enable vue event logic
window.Event = new Vue();

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = new Vue({
    el: '#root',

    components: {
        notifications,
        coinportfolio,
        cointable,
        coinmodal,
        coinnews,
    },
});
