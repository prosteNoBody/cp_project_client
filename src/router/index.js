import {createRouter, createWebHistory} from 'vue-router'
import boughtoffers from "@/views/boughtoffers";
import myoffers from "@/views/myoffers";
import user from "@/views/user";

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: 'myoffers'
  },
  {
    path: '/myoffers',
    name: 'My Offers',
    component: myoffers,
  },
  {
    path: '/bought',
    name: 'Bought Offers',
    component: boughtoffers,
  },
  {
    path: '/profile',
    name: 'User Profile',
    component: user,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
