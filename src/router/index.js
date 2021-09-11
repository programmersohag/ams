import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import StorageService from "@/shared/common/storage.service";

// Login
const Login = () => import('@/components/login/Index')

Vue.use(Router)

const baseRoutes = [
  {
    path: '/login',
    // redirect: '/',
    meta: {
      requiresAuth: false
    },
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/mis/dashboard'
  }
];

import ErrorRoute from '@/router/ErrorRoute';
import AdminRoute from '@/router/AdminRoute';
import ConfigRoute from '@/router/ConfigRoute';
import SchedulingRoute from '@/router/SchedulingRoute';
import ReportsRoute from '@/router/ReportsRoute';
import DashboardRoute from '@/router/DashboardRoute';
import AuditExecutionRoute from '@/router/AuditExecutionRoute';
import ProcessRoute from '@/router/ProcessRoute';

const routes = baseRoutes.concat(
  ErrorRoute,
  AdminRoute,
  ConfigRoute,
  SchedulingRoute,
  ReportsRoute,
  DashboardRoute,
  AuditExecutionRoute,
  ProcessRoute,
);

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  // mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes,
});


let user_info = store.getters['auth/userInfo'];
let route_name = (user_info['module'] == 'MIS') ? '/mis' : '/ais';
router.beforeEach((to, from, next) => {
  store.dispatch('auth/setLoadingShow', true);
  StorageService.destroyLoadBalancing();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      document.title = "Microfin360 Next";
      if (to.name) {
        document.title = to.name;
      }
      next();
    } else {
      next({path: '/login'});
    }
  } else {
    if (store.getters['auth/isLoggedIn']) {
      if (to.name != '403' && to.name != '404') {
        next(route_name + '/dashboard');
      }
    }
    next();
    return;
  }
})

export default router
