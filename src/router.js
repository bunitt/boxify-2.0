import { createRouter, createWebHistory } from 'vue-router'

import MainSite from "./mainSite.vue"
import AnotherSite from "./anotherSite.vue"

const routes = [
  { path: '/', component: MainSite },
  { path: '/box/:id', component: AnotherSite },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router