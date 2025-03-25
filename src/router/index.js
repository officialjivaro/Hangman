import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
