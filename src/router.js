/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // TEST CENTER 
        // =============================================================================
          {
            path: '/test-center',
            name: 'test-center-01',
            component: () => import('./test_center/test-center-01.vue')
          },
        // =============================================================================
        // MTS PANNEL
        // =============================================================================
        {
          path: '/mts-dashboard',
          name: 'mts-dashboard',
          component: () => import('./mts_temporary/mts-dashboard.vue')
        },
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'dashboard',
                component: () => import('./views/Dashboard.vue')
              },
              {
                path: '/settings',
                name: 'Settings',
                component: () => import('./views/Settings.vue')
              },
              {
                path: '/assessments',
                name: 'Assessments',
                component: () => import('./views/Assessments.vue')
              },
              // Create TEST TAKER
              {
                path: '/editTestTaker/:id',
                name: 'editTestTaker',
                component: () => import('./views/addTestTaker.vue'),
                props: true,
              },              
              // Edit TEST TAKER
              {
                path: '/addTestTaker',
                name: 'addTestTaker',
                component: () => import('./views/addTestTaker.vue')
              },
              {
                path: '/test-taker/:id',
                name: 'detailCandidate',
                component: () => import('./views/candidateProfile.vue'),
                props: true,
              },
              {
                path: '/candidates',
                name: 'Candidates',
                component: () => import('./views/user/user-list/UserList.vue')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
