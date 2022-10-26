import http from "../../api/http";
import {RONK} from '../../api/url'

export default {
    namespaced: true,
    state: {
        officialData: [],
        globalData: [],//全球榜
    },
    mutations: {
        setOfficialData(state,{newData,needNum}) {
            state.officialData = newData.splice(0,needNum);
            state.globalData = newData;//全球榜
        }
    },
    actions: {
        //获取官方榜数据  needNum 需求数据个数
        async getOfficialData(context) {
            const {data:{list}} = await http.get(RONK);
            const newData = list.map((item)=>{
                return {
                    id: item.id,
                    name: item.name,
                    coverImgUrl: item.coverImgUrl+'?param=200x200',
                    tracks: item.tracks,
                    updateFrequency: item.updateFrequency,
                }
            });
            // console.log(newData);
            // console.log(await http.get('/artists?id=6452'));//HOT_SINGER_DETAIL
            context.commit('setOfficialData',{newData:newData,needNum:4});
        }
    },
}