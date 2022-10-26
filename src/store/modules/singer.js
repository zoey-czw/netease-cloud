import http from "../../api/http";
import {HOT_SINGER,HOT_SINGER_DETAIL} from '../../api/url'

export default {
    namespaced: true,
    state: {
        hotList: [],
        songData: [],
        singerListLoad: false,
    },
    mutations: {
        setHotList(state,{data, reset}) {
            if(reset){
                state.hotList = data;//初始化赋值，或者下拉刷新赋值
            }else{
                state.hotList = [...state.hotList, ...data];//上拉加载更多的赋值
            }
        },
        setSingerLiatLoad(state,payload) {
            state.singerListLoad = payload;
        },
        setSongData(state,payload) {
            // console.log(payload);
            state.songData = payload;
        }
    },
    actions: {
        getHotListDate(context,payload) {
            context.commit('setSingerLiatLoad',false);
            http.get(HOT_SINGER,payload).then((val)=>{
                const {data:{artists}} = val;
                // console.log(artists);
                const newDate = artists.map((item)=>{
                    return {
                        id : item.id,
                        name : item.name,
                        picUrl : item.picUrl+'?param=200x200',
                    }
                });
                // console.log(item);
                context.commit('setHotList',{data: newDate, reset: payload.offset === 0});
                context.commit('setSingerLiatLoad',true);
            });
        },
        //获取歌手歌单列表
        async getSongData(context,payload) {
            const {data} = await http.get(HOT_SINGER_DETAIL,payload);
            const {hotSongs} = data;
            let authorName = data.artist.name;//歌手名称
            let authorrImg = data.artist.img1v1Url+'?param=800x800';//歌手图片

            const newData = hotSongs.map((item)=>{
                let names = '';
                item.ar.forEach(({name})=>{
                    names += name+'/';
                });
                names = names.slice(0,names.length-1)
                return {
                    id: item.id,
                    name: item.name,//歌曲名
                    author: names,
                    picUrl: item.al.picUrl+'?param=200x200',//歌曲背景图
                }
            });
            let length = newData.length;
            // console.log(newData);
            context.commit('setSongData',{newData,length,authorName,authorrImg});
        }
    }
}