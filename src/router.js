import Vue from 'vue'
import Router from 'vue-router'
import Kml from './views/Kml.vue'
import disaster from './views/disaster.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/kml/:kmlFile',
        component: Kml
    },{
        path: '/disaster',
        component: disaster
    }]
})