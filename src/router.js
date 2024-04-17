import { createRouter, createWebHistory } from 'vue-router'

import MainSite from "./sites/mainSite.vue"
import AnotherSite from "./sites/anotherSite.vue"

const routes = [
  { path: '/', component: MainSite },
  { path: '/box/:id', component: MainSite },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router