import Vue from 'vue'
import Router from 'vue-router'
import Kml from './views/Kml.vue'
import disaster from './views/disaster.vue'
import test from './views/test.vue'
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
        },
        {
            path: '/test',
            component: test,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/testMap',
            component: testMap,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/disasterMapTest',
            component: disasterMapTest,
            meta: {
                keepAlive: false
            }
        }

    ]
})