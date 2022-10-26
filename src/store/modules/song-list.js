import http from "../../api/http";
import {SONG_LIST} from '../../api/url' //该接口可获取 song-header & song-list 两个数据

export default {
    namespaced: true,
    state: {
        songListData: [],//歌曲列表数据
        topDetailData: [],//榜单详情数据
    },
    mutations: {
        //设置歌曲列表数据
        setSongListData(state,payload) {
            state.songListData = payload;
        },
        //设置榜单详情数据
        setTopDetailData(state,payload) {
            state.topDetailData = payload;
        }
    },
    actions: {
        //获取歌曲列表数据 & 榜单详情数据
        async getSongListData(context,payload) {
            const {data:{playlist}} = await http.get(SONG_LIST,payload);
            const {tracks} = playlist;
            // 歌曲列表数据
            const newData = tracks.map((item)=>{
                let names = '';
                item.ar.forEach(({name})=>{
                    names += name+'/';
                });
                names = names.slice(0,names.length-1)
                return {
                    id: item.id,
                    name: item.name,
                    author: names,
                    picUrl: item.al.picUrl+'?param=200x200',//歌曲背景
                }
            });
            // 榜单详情数据
            const newDataTop =  {
                    id: playlist.id,
                    name: playlist.name,//歌单名
                    coverImgUrl: playlist.coverImgUrl,
                    playCount: playlist.playCount,
                    avatarUrl: playlist.creator.avatarUrl,//作者头像
                    nickname: playlist.creator.nickname,//作者名
                    backgroundUrl: playlist.creator.backgroundUrl,//歌曲背景图

                    trackCount: playlist.trackCount,//总歌曲数
                    subscribedCount: playlist.subscribedCount,//收藏数
                };
            // console.log(playlist);
            // console.log(newDataTop);
            context.commit('setSongListData',newData);
            context.commit('setTopDetailData',newDataTop);
        }
    },
}