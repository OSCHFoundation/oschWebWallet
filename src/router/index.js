import Vue from 'vue'
import Router from 'vue-router'
import Created from '../components/Created'
import Privacy from '../components/HelpList/Privacy.vue'
//import Help from '../components/HelpList'
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
      component: resolve => require(['../components/main.vue'], resolve)
    },
    {
      path: '/help',
      name: 'help',
      component: resolve => require(['../components/HelpList'], resolve)
    },
    {
      path: '/created',
      name: 'created',
      component: Created
    },
    {
      path: '/service',
      name: 'service',
      component: Privacy
    },
  ]
})
