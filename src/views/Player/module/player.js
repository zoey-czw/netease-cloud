import {SONG_LYRIC_API} from '../../../api/url'
import http from '../../../api/http'

export default {
    namespaced: true,
    state: {
        songSrcList:[],//歌曲url链接
        showPlayer: false,//播放器player的显示
        currentIndex: '', //当前播放歌曲下标
        playing: true,//播放状态
    },
    mutations: {
        // 设置播放器player的显示
        setShowPlayer(state,payload) {
            state.showPlayer = payload;
        },
        // 设置歌曲url链接
        setSongSrc(state,payload) {
            console.log(payload);
            state.songSrcList = payload[0];
            state.currentIndex = payload[1];
        }
    },
    actions: {},
}