import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// eslint-disable-next-line  
delete L.Icon.Default.prototype._getIconUrl

// eslint-disable-next-line  
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')