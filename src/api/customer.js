/**
 * 客户部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得客户列表（分页）数据
 * @param data
 */
export function getCustomerList(data) {
    return request({
        url: baseUrl +  '/admin/customer/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有客户 不分页
 * @param data
 */
export function getCustomerAll(data) {
    return request({
        url: baseUrl +  '/admin/customer/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加客户
 * @param data
 */
export function addCustomer(data) {
    return request({
        url: baseUrl +  '/admin/customer/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑客户
 * @param data
 */
export function editCustomer(data) {
    return request({
        url: baseUrl +  '/admin/customer/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取客户
 * @param id
 */
export function getCustomerById(id) {
    return request({
        url: baseUrl +  '/admin/customer/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除客户
 * @param id
 */
export function deleteCustomer(id) {
    return request({
        url: baseUrl +  '/admin/customer/delete',
        method: 'post',
        data: id
    });
}
