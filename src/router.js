import Vue from 'vue'
import Router from 'vue-router'
import Kml from './views/Kml.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/kml/:kmlFile',
        component: Kml
    }]
})