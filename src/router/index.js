import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import(/**webpackChunkname: 'home' */ '../views/Home'),
    redirect: '/recommend',
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        component: ()=>import(/**webpackChunkname: 'home' */ '../views/Recommend'),
        children: [{
          path: ':id',
          name: 'recommend-list',
          component: ()=>import(/* webpackChunkName: "rank-list" */'../views/SongSheet'),
        }]
      },
      {
        path: 'singers',
        name: 'singers',
        component: ()=>import(/* webpackChunkName: "singers" */'../views/Singers'),
        children: [{
          path: ':id',
          name: 'singerSong-list',
          component: ()=>import(/* webpackChunkName: "rank-list" */'../views/Singer-songList'),
        }]
      },
      {
        path: 'rank',
        name: 'rank',
        component: ()=>import(/* webpackChunkName: "rank" */'../views/Rank'),
        children: [{
          path: ':id',
          name: 'rank-list',
          component: ()=>import(/* webpackChunkName: "rank-list" */'../views/SongSheet'),
        }]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
