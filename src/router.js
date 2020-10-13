import Vue from 'vue'
import Router from 'vue-router'
import Kml from './views/Kml.vue'
import disaster from './views/disaster.vue'
import construction from './views/construction.vue'
import testMap from './views/testMap.vue'
import disasterMapTest from './views/disasterMapTest.vue'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/kml/:kmlFile',
            component: Kml,
            meta: {
                keepAlive: true // 需要被cache
            }
        }, {
            path: '/disaster',
            component: disaster,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/construction',
            component: construction,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/waterMap',
            component: testMap,
            meta: {
                keepAlive: false
            }
        }, {
            path: '/disasterMapTest',
            component: disasterMapTest,
            meta: {
                keepAlive: false
            }
        }
    ]
})