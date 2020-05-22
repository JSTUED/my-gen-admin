/**
 * 减速机匹配部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得减速机匹配列表（分页）数据
 * @param data
 */
export function getMatchList(data) {
    return request({
        url: baseUrl +  '/admin/match/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有减速机匹配 不分页
 * @param data
 */
export function getMatchAll(data) {
    return request({
        url: baseUrl +  '/admin/match/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加减速机匹配
 * @param data
 */
export function addMatch(data) {
    return request({
        url: baseUrl +  '/admin/match/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑减速机匹配
 * @param data
 */
export function editMatch(data) {
    return request({
        url: baseUrl +  '/admin/match/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取减速机匹配
 * @param id
 */
export function getMatchById(id) {
    return request({
        url: baseUrl +  '/admin/match/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除减速机匹配
 * @param id
 */
export function deleteMatch(id) {
    return request({
        url: baseUrl +  '/admin/match/delete',
        method: 'post',
        data: id
    });
}
