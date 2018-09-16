import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import user from '@/components/user-manage/user'
import staff from '@/components/user-manage/staff'
import role from '@/components/user-manage/role'
import addRole from '@/components/user-manage/addRole'
import borrower from '@/components/credit-manage/borrower'
import bidTable from '@/components/credit-manage/bidTable'
import capitalFlow from '@/components/finance-manage/capitalFlow'
import investmentRecord from '@/components/finance-manage/investmentRecord'
import offlineRecharge from '@/components/finance-manage/offlineRecharge'
import onlineRecharge from '@/components/finance-manage/onlineRecharge'
import withdrawCash from '@/components/finance-manage/withdrawCash'
import repayment from '@/components/finance-manage/repayment'
import gathering from '@/components/finance-manage/gathering'
import userAssets from '@/components/finance-manage/userAssets'
import content from '@/components/content-manage/content'
import book from '@/components/technicalTerm/book'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/staff',
      name: 'staff',
      component: staff
    },
    {
      path: '/role',
      name: 'role',
      component: role
    },
    {
      path: '/addRole',
      name: 'addRole',
      component: addRole
    },
    {
      path: '/borrower',
      name: 'borrower',
      component: borrower
    },
    {
      path: '/bidTable',
      name: 'bidTable',
      component: bidTable
    },
    {
      path: '/capitalFlow',
      name: 'capitalFlow',
      component: capitalFlow
    },
    {
      path: '/investmentRecord',
      name: 'investmentRecord',
      component: investmentRecord
    },
    {
      path: '/offlineRecharge',
      name: 'offlineRecharge',
      component: offlineRecharge
    },
    {
      path: '/onlineRecharge',
      name: 'onlineRecharge',
      component: onlineRecharge
    },
    {
      path: '/withdrawCash',
      name: 'withdrawCash',
      component: withdrawCash
    },
    {
      path: '/repayment',
      name: 'repayment',
      component: repayment
    },
    {
      path: '/gathering',
      name: 'gathering',
      component: gathering
    },
    {
      path: '/userAssets',
      name: 'userAssets',
      component: userAssets
    },
    {
      path: '/content',
      name: 'content',
      component: content
    },
    {
      path: '/book',
      name: 'book',
      component: book
    }
  ],
  mode: 'history'
})
