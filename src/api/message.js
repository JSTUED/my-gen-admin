/**
 * 咨询部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得咨询列表（分页）数据
 * @param data
 */
export function getMessageList(data) {
    return request({
        url: baseUrl +  '/admin/message/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有咨询 不分页
 * @param data
 */
export function getMessageAll(data) {
    return request({
        url: baseUrl +  '/admin/message/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加咨询
 * @param data
 */
export function addMessage(data) {
    return request({
        url: baseUrl +  '/admin/message/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑咨询
 * @param data
 */
export function editMessage(data) {
    return request({
        url: baseUrl +  '/admin/message/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取咨询
 * @param id
 */
export function getMessageById(id) {
    return request({
        url: baseUrl +  '/admin/message/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除咨询
 * @param id
 */
export function deleteMessage(id) {
    return request({
        url: baseUrl +  '/admin/message/delete',
        method: 'post',
        data: id
    });
}
