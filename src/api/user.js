import request from '@/router/axios';
import {baseUrl} from '@/config/env';
import { menuBottons, menuSource, navMenuList, systemRoutes }  from "../mock/routesData";

// 登录
export const loginByUsername = (username, password) => {

    // return new Promise((resolve, reject)=>{
    //     console.log("/api/blade-auth/token api");
    //     let data = {
    //         "account": "admin",
    //         "user_name": "admin",
    //         "nick_name": "管理员",
    //         "role_name": "administrator",
    //         "avatar": "img/bg/profile-1.png",
    //         "access_token": "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi566h55CG5ZGYIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImRlcHRfaWQiOiIxMTIzNTk4ODEzNzM4Njc1MjAxIiwiYWNjb3VudCI6ImFkbWluIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1NjI5MDY0MzYsIm5iZiI6MTU2MjkwMjgzNn0.yc862BmmmADTD310DwQCGY9JJYiBGHJG_GNyhMf_CfU",
    //         "refresh_token": "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1NjM1MDc2MzYsIm5iZiI6MTU2MjkwMjgzNn0.llJ3itSsH-eb2gdpE1IrpohZE0S_7PSBz3Jr6BXFZ1E",
    //         "token_type": "bearer",
    //         "expires_in": 55163,
    //         "license": "powered by bladex"
    //     };
    //     resolve({data})
    // })

    return request({
        url: baseUrl + '/admin/login',
        method: 'get',
        params: {
            username: username,
            password: password,
        }
    }).then(res=>{
        return new Promise(resolve => {
            // let respones_data = _.cloneDeep(res.data);
            // let data = respones_data.data;
            // //console.log(data);
            // let user = {
            //     "account": data.user.email,
            //     "user_name": data.user.username,
            //     "nick_name": data.user.nick,
            //     "role_name": "",
            //     "avatar": data.user.avatar,
            //     "access_token": data.token,
            //     "refresh_token": data.token,
            //     "token_type": "bearer",
            //     "expires_in": 55163,
            //     "license": "powered by bladex"
            // };
            // resolve({data: user})
            if (res.data.code == 1){
                let data = res.data.data;
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
            }
            resolve(res)
        })
    });

};

export const getPermissions = () => {
    // request({
    //     url: '/user/permissions',
    //     method: 'get'
    // });
    return new Promise((resolve, reject)=>{
        console.log("/user/permissions api");
        let data = {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": [
                "user-list", "user-edit", "user-add"
            ]
        };
        resolve({data})
    })
}

export const getUserInfo = () => request({
    url: baseUrl + '/user/getUserInfo',
    method: 'get'
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refesh',
    method: 'post'
})


export const getTopMenu = () => {
    console.log('/user/getTopMenu api');
    return new Promise((resolve, reject)=>{
        let data = {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": navMenuList
        }

        resolve({data});
    })
};

export const sendLogs = (list) => request({
    url: baseUrl + '/user/logout',
    method: 'post',
    data: list
})

export const logout = () => {
    console.log("/user/logout api");
    return new Promise((resolve, reject)=>{
        let data = true;
        resolve({ data })
    })

}

export const getRoutes = ()=>{
    console.log("/user/routes api");
    return new Promise((resolve, reject)=>{
        let data = {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": systemRoutes
        }
        resolve({ data })
    })
};

/**
 * 获取用户列表 分页
 * @param data
 */
export function getUserPage(data) {
    return request({
        url: baseUrl + '/admin/user/list',
        method: 'post',
        data: data,
    });
}

/**
 * 根据 id 取用户
 * @param id
 */
export function getUserById(id) {
    return request({
        url: baseUrl +  '/admin/user/get?id=' + id,
        method: 'get',
    });
}

/**
 * 新建用户
 * @param data
 */
export function insertUser(data) {
    return request({
        url: baseUrl +  '/admin/user/add',
        method: 'post',
        data: data
    });
}

/**
 * 更新用户
 * @param data
 */
export function updateUser(data) {
    return request({
        url: baseUrl +  '/admin/user/edit',
        method: 'post',
        data: data
    });
}

/**
 * 删除用户
 * @param id
 */
export function deleteUser(id) {
    return request({
        url: baseUrl +  '/admin/user/delete',
        method: 'post',
        data: id
    });
}

/**
 * 管理员重置密码
 * @param data
 */
export function resetPassword(data) {
    return request({
        url: baseUrl +  '/admin/user/resetPassword',
        method: 'post',
        data: data
    });
}


