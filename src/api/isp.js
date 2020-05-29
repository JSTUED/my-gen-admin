/**
 * isp api
 */
import request from '@/router/request';
import axios from "axios";
import { baseUrl } from '@/config/env';

export function getSelect2List(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: "https://jst-isp.justech.com:5004/api/ComboGrid/Select2",
            method: 'get',
            params: data
        }).then((res)=>{
            let data = res.data;
            resolve(data.results)
        }).catch((err)=>{
            console.log(err);
        });
    })
}

export function getCascaderJson(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: "https://jst-isp.justech.com:5004/api/ComboGrid/CascaderJson",
            method: 'get',
            params: data
        }).then((res)=>{
            let data = res.data;
            resolve(data)
        }).catch((err)=>{
            console.log(err);
        });
    })
}

export function getMultiConditionalQuery(data) {
    return request({
        // url: "https://jst-isp.justech.com:5004/api/RequestApplyReport/MultiConditionalQuery",
        url: "/table/getTable",
        method: 'post',
        data: data
    })
}



