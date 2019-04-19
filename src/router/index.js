import Vue from 'vue'
import Router from 'vue-router'
import Create from '../components/Create/create.vue'
//import Wallet from '../components/Wallet/wallet.vue'
// import Swap from '../components/Swap/swap.vue'
import Transaction from '../components/Transaction/transaction.vue'


import Main from '../components/main.vue'
import Help from '../components/help.vue'
import Created from '../components/Created'
import Service from '../components/helpList/service1.vue'

Vue.use(Router)

//import TransactionLogin from '../components/Transaction/Tlogin.vue'
// {
//   path: '/transactionlogin',
//   name: 'transactionLogin',
//   component: TransactionLogin
// },
// {
//   path: '/wallet/:id',
//   name: 'wallet',
//   component: Wallet
// },
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/created'
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    
    {
      path: '/transaction/:id',
      name: 'transaction',
      component: Transaction
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
