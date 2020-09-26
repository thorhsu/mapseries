import Vue from 'vue'
import Router from 'vue-router'
import Kml from './views/Kml.vue'
import disaster from './views/disaster.vue'
import test from './views/test.vue'
import testMap from './views/testMap.vue'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/kml/:kmlFile',
        component: Kml
    },{
        path: '/disaster',
        component: disaster
    },
    {
        path: '/test',
        component: test
    },
    {
        path: '/testMap',
        component: testMap
    }]
})