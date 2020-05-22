/**
 * 属性部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得属性列表（分页）数据
 * @param data
 */
export function getPropertyList(data) {
    return request({
        url: baseUrl +  '/admin/property/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有属性 不分页
 * @param data
 */
export function getPropertyAll(data) {
    return request({
        url: baseUrl +  '/admin/property/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加属性
 * @param data
 */
export function addProperty(data) {
    return request({
        url: baseUrl +  '/admin/property/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑属性
 * @param data
 */
export function editProperty(data) {
    return request({
        url: baseUrl +  '/admin/property/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取属性
 * @param id
 */
export function getPropertyById(id) {
    return request({
        url: baseUrl +  '/admin/property/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除属性
 * @param id
 */
export function deleteProperty(id) {
    return request({
        url: baseUrl +  '/admin/property/delete',
        method: 'post',
        data: id
    });
}
