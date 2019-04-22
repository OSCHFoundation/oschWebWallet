import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main.vue'
import Help from '../components/help.vue'
import Created from '../components/Created'
import Service from '../components/helpList/service1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/created'
    },
  
    {
      path: '/inner/:id',
      name: 'inner',
      component: Main
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/created',
      name: 'created',
      component: Created
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    },
  ]
})
