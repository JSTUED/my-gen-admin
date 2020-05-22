import { setToken, removeToken, getToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import webiste from '@/config/website'
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken, getPermissions, getRoutes } from '@/api/user'



const user = {
    state: {
        userInfo: getStore({ name: 'userInfo' }) || [],
        permission: getStore({ name: 'permission' }) || [],
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        navMenuList: getStore({ name: 'navMenuList' }) || [], // 所有菜单
        token: getStore({ name: 'token' }) || '',
        routes: getStore({ name: 'routes' }) || [],
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo.username, userInfo.password).then(res => {

                    if(res.data.code==1){
                        const data = res.data.data;
                        commit('SET_TOKEN', data.token);
                        commit('SET_USERIFNO', data.user);
                        commit('DEL_ALL_TAG');
                        commit('CLEAR_LOCK');
                        resolve();
                    }

                }).catch((err)=>{
                    reject(err)
                })
            })
        },
        GetPermissions({ commit }) {
            return new Promise((resolve) => {
                getPermissions().then(res => {
                    const data = res.data.data;
                    commit('SET_PERMISSION', data);
                    resolve();
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data;
                    commit('SET_ROLES', data.roles);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token
        RefeshToken({ state, commit }) {
            return new Promise((resolve, reject) => {
                refeshToken(state.refeshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('NAV_MENU_LIST', [])
                    commit('SET_ROUTES', [])
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSION', []);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('NAV_MENU_LIST', [])
                commit('SET_ROUTES', [])
                commit('SET_ROLES', [])
                commit('SET_PERMISSION', []);
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        GetTopMenu({ commit, dispatch }) {
            return new Promise(resolve => {
                getTopMenu().then((res) => {
                    const data = res.data.data || [];
                    resolve(data)
                })
            })
        },
        //获取系统菜单
        GetMenu({ state, commit, dispatch }, parentId) {
            if(!parentId) return false;
            return new Promise(resolve => {
                //切换左侧菜单
                let navMenuList = deepClone(state.navMenuList);
                let menu = navMenuList.filter((item, index)=>{
                    return item.id == parentId;
                });
                let result = menu && menu.length >0 && menu[0].children ? menu[0].children : [];
                commit('SET_MENU', result);
                resolve(result);
            })
        },
        // 获得系统的路由
        GetRoutes({ state, commit, dispatch }){
            return new Promise(resolve => {
                getRoutes().then((res)=>{
                    const data = res.data.data;
                    commit('SET_ROUTES', data);
                    resolve(data)
                })
            })
        }


    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
            setStore({ name: 'userInfo', content: state.userInfo })
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        NAV_MENU_LIST: (state, navMenuList) =>{
            state.navMenuList = navMenuList;
            setStore({ name: 'navMenuList', content: state.navMenuList, type: 'session' })
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = permission;
            setStore({ name: 'permission', content: state.permission, type: 'session' })
        },

        SET_ROUTES(state, routes){
            state.routes = routes;
            setStore({ name: 'routes', content: state.routes, type: 'session' })
        }
    }

}
export default user
