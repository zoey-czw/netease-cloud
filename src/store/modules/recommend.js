import http from "../../api/http";
import {BANNER_API,RECOMMED_LIST_API} from '../../api/url'

export default {
    namespaced: true,
    state: {
        bannerList: [],
        musciList: [],
        musicLoad: false,//歌单加载完毕
    },
    mutations: {
        setBannerList(state,payload) {
            state.bannerList = payload;
        },
        setMusicList(state,payload) {
            state.musciList = payload;
        },
        setMusicLoad(state,payload) {
            state.musicLoad = payload;
        }
    },
    actions: {
        requestBannerList(context) {
            http.get(BANNER_API).then((val)=>{
                const {data:{banners}} = val;
                const newDate = banners.map(item=>item.imageUrl)
                context.commit('setBannerList',newDate);
            })
        },
        async requestRecommendList(context) {
            context.commit('setMusicLoad',false);
            http.get(RECOMMED_LIST_API).then((val)=>{
                console.log(val);
                
                const {data:{result}} = val; 
                const newData = result.map(({id, name, picUrl, playCount})=>({id, name, picUrl, playCount}));
                context.commit('setMusicList',newData);
                context.commit('setMusicLoad',true);
            })
        }
    },
    modules: {
    }
}