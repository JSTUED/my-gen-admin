/**
 * 电机分类部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得电机分类列表（分页）数据
 * @param data
 */
export function getMotorCategoryList(data) {
    return request({
        url: baseUrl +  '/admin/motorCategory/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有电机分类 不分页
 * @param data
 */
export function getMotorCategoryAll(data) {
    return request({
        url: baseUrl +  '/admin/motorCategory/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加电机分类
 * @param data
 */
export function addMotorCategory(data) {
    return request({
        url: baseUrl +  '/admin/motorCategory/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑电机分类
 * @param data
 */
export function editMotorCategory(data) {
    return request({
        url: baseUrl +  '/admin/motorCategory/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取电机分类
 * @param id
 */
export function getMotorCategoryById(id) {
    return request({
        url: baseUrl +  '/admin/motorCategory/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除电机分类
 * @param id
 */
export function deleteMotorCategory(id) {
    return request({
        url: baseUrl +  '/admin/motorCategory/delete',
        method: 'post',
        data: id
    });
}
