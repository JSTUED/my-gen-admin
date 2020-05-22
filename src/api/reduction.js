/**
 * 电机部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得电机列表（分页）数据
 * @param data
 */
export function getReductionList(data) {
    return request({
        url: baseUrl +  '/admin/reduction/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有电机 不分页
 * @param data
 */
export function getReductionAll(data) {
    return request({
        url: baseUrl +  '/admin/reduction/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加电机
 * @param data
 */
export function addReduction(data) {
    return request({
        url: baseUrl +  '/admin/reduction/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑电机
 * @param data
 */
export function editReduction(data) {
    return request({
        url: baseUrl +  '/admin/reduction/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取电机
 * @param id
 */
export function getReductionById(id) {
    return request({
        url: baseUrl +  '/admin/reduction/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除电机
 * @param id
 */
export function deleteReduction(id) {
    return request({
        url: baseUrl +  '/admin/reduction/delete',
        method: 'post',
        data: id
    });
}

/**
 * 获取所有减速机规格（去重）
 */
export function getAllSpecName() {
    return request({
        url: baseUrl + "/admin/reduction/getAllSpecName",
        method: 'post',
    })
}
