import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Crops from '../views/Crops.vue'
import DiseasesPests from '../views/DiseasesPests.vue'
import FarmingGuides from '../views/FarmingGuides.vue'
import SmartTools from '../views/SmartTools.vue'
import Weather from '../views/Weather.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/crops', name: 'crops', component: Crops },
  { path: '/diseases-pests', name: 'diseases-pests', component: DiseasesPests },
  { path: '/farming-guides', name: 'farming-guides', component: FarmingGuides },
  { path: '/smart-tools', name: 'smart-tools', component: SmartTools },
  { path: '/weather', name: 'weather', component: Weather },
  { path: '/about', name: 'about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
