/**
 * 电机部分 api
 */
import request from '@/router/axios';
import {baseUrl} from '@/config/env';


/**
 * 获得电机列表（分页）数据
 * @param data
 */
export function getMotorList(data) {
    return request({
        url: baseUrl +  '/admin/motor/list',
        method: 'post',
        data: data
    });
}

/**
 * 获得所有电机 不分页
 * @param data
 */
export function getMotorAll(data) {
    return request({
        url: baseUrl +  '/admin/motor/all',
        method: 'post',
        data: data
    });
}

/**
 * 添加电机
 * @param data
 */
export function addMotor(data) {
    return request({
        url: baseUrl +  '/admin/motor/add',
        method: 'post',
        data: data
    });
}

/**
 * 编辑电机
 * @param data
 */
export function editMotor(data) {
    return request({
        url: baseUrl +  '/admin/motor/edit',
        method: 'post',
        data: data
    });
}

/**
 * 通过 Id 获取电机
 * @param id
 */
export function getMotorById(id) {
    return request({
        url: baseUrl +  '/admin/motor/get?id=' + id,
        method: 'get'
    });
}

/**
 * 删除电机
 * @param id
 */
export function deleteMotor(id) {
    return request({
        url: baseUrl +  '/admin/motor/delete',
        method: 'post',
        data: id
    });
}
