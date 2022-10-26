import Vue from 'vue'
import Vuex from 'vuex'
import recommend from './modules/recommend'
import singer from './modules/singer'
import rank from './modules/rank'
import songList from './modules/song-list'
import player from '../views/Player/module/player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recommend,
    singer,
    rank,
    songList,
    player
  }
})
