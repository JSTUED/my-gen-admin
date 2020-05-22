/**
 * 减速机分类部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得减速机分类列表（分页）数据
 * @param data
 */
export function getReductionCategoryList(data) {
    return request({
        url: baseUrl +  '/admin/reductionCategory/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有减速机分类 不分页
 * @param data
 */
export function getReductionCategoryAll(data) {
    return request({
        url: baseUrl +  '/admin/reductionCategory/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加减速机分类
 * @param data
 */
export function addReductionCategory(data) {
    return request({
        url: baseUrl +  '/admin/reductionCategory/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑减速机分类
 * @param data
 */
export function editReductionCategory(data) {
    return request({
        url: baseUrl +  '/admin/reductionCategory/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取减速机分类
 * @param id
 */
export function getReductionCategoryById(id) {
    return request({
        url: baseUrl +  '/admin/reductionCategory/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除减速机分类
 * @param id
 */
export function deleteReductionCategory(id) {
    return request({
        url: baseUrl +  '/admin/reductionCategory/delete',
        method: 'post',
        data: id
    });
}

/**
 * 获取所有减速机分类名称
 */
export function getAllReductionCategoryName() {
    return request({
        url: baseUrl + "/admin/reductionCategory/getAllName",
        method: 'post',
    })
}
