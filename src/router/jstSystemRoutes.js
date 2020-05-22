
/*
* 系统路由 菜单中不可见 如各编辑页面路由
* */

import adminRoutesSys from "./views/admin-sys";
import modelRoutesSys from "./views/model/model-sys"


export default [
    modelRoutesSys,
    adminRoutesSys
];
