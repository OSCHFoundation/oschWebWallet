import Vue from 'vue'
import Router from 'vue-router'
import Create from '../components/Create/create.vue'
import Wallet from '../components/Wallet/wallet.vue'
// import Swap from '../components/Swap/swap.vue'
import Transaction from '../components/Transaction/transaction.vue'
import Loging from '../components/Create/login.vue'
import TransactionLogin from '../components/Transaction/Tlogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/create'
    },
    {
      path: '/transactionlogin',
      name: 'transactionLogin',
      component: TransactionLogin
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/wallet/:id',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/login',
      name: 'login',
      component: Loging
    },
    // {
    //   path: '/wallet:id',
    //   name: 'wallet',
    //   component: Wallet
    // },
    // {
    //   path: '/swap',
    //   name: 'swap',
    //   component: Swap
    // },
    {
      path: '/transaction/:id',
      name: 'transaction',
      component: Transaction
    }
  ]
})
