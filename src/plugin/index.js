import AppScroll from '../components/common/app-scroll.vue'
import InfiniteScroll from '../components/common/infinite-scroll.vue'
import Loading from '../components/common/loading.vue'
import VueLazyload from 'vue-lazyload'

export default {
    install(Vue) {
        Vue.use(VueLazyload, {
            preLoad: 1.3,
            error: '/image/music.png',
            loading: '/music.png',
            attempt: 1
        });

        Vue.component("app-scroll", AppScroll);
        Vue.component("infinite-scroll", InfiniteScroll);
        Vue.component("Loading", Loading);
    }
}