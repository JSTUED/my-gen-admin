import Mock from 'mockjs'
let Random = Mock.Random;

export default ({ mock }) => {
    if (!mock) return;
    // 用户登录
    Mock.mock('/user/login', 'post', {
        data: new Date().getTime() + ''
    });
    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });

    //获取表格数据
    Mock.mock('/user/getTable', 'post', () => {
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                id: '@increment',
                name: Mock.mock('@cname'),
                username: Mock.mock('@last'),
                type: [0, 2],
                checkbox: [0, 1],
                'number|0-100': 0,
                datetime: 1532932422071,
                'sex|0-1': 0,
                moreselect: [0, 1],
                "grade": 0,
                address: Mock.mock('@cparagraph(1, 3)'),
                check: [1, 3, 4]
            }))
        }
        return {
            "code": 1,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 153,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    });

    Mock.mock('/api/blade-auth/token', 'post', ()=>{
        console.log("mock /api/blade-auth/token");
        return {
            "account": "admin",
            "user_name": "admin",
            "nick_name": "管理员",
            "role_name": "administrator",
            "avatar": "img/bg/profile-1.png",
            "access_token": "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi566h55CG5ZGYIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImRlcHRfaWQiOiIxMTIzNTk4ODEzNzM4Njc1MjAxIiwiYWNjb3VudCI6ImFkbWluIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1NjI5MDY0MzYsIm5iZiI6MTU2MjkwMjgzNn0.yc862BmmmADTD310DwQCGY9JJYiBGHJG_GNyhMf_CfU",
            "refresh_token": "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1NjM1MDc2MzYsIm5iZiI6MTU2MjkwMjgzNn0.llJ3itSsH-eb2gdpE1IrpohZE0S_7PSBz3Jr6BXFZ1E",
            "token_type": "bearer",
            "expires_in": 55163,
            "license": "powered by bladex"
        }
    });

    //系统管理表格数据
    Mock.mock('/user/getSystemTable', 'post', (req)=>{
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {
            console.log(e)
        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            //序号
            list.push(Mock.mock({
                id:  '@increment',
                name: Mock.mock('@cname'), // 用户名
                'department|1': [ "信息技术中心","人事部","制造部","营建中心" ] , // 部门
                'sex|1': [1,2], // 性别
                'userType|1': ["管理员","普通用户"], // 用户类型
                createTime: Random.datetime() , // 创建日期
                "status": [1], // 状态
            }))
        }

        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 153,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    });

    //角色管理表格数据
    Mock.mock('/role/getRoleTable','post',(req)=>{
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {
            console.log(e)
        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            //序号
            list.push(Mock.mock({
                id:  '@increment',
                name: Random.upper('@last'), // 角色名称
                remark: Random.ctitle(5,10) , // 备注
                createTime: Random.date() , // 创建日期
                updateTime: Random.date() , // 更新日期
                setRole: [1], //设置为默认角色 1 设为默认 2 取消默认
            }))
        }

        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 153,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    });

    //日志管理表格数据
    Mock.mock('/log/getLogTable','post',(req)=>{
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {
            console.log(e)
        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            //序号
            list.push(Mock.mock({
                id:  '@increment',
                serviceID: 'jst-api',
                serviceHost: 'jst',
                serviceIP: Random.ip(),
                SWEnv: 'DEV',
                'logLevel|1': ['POST','GET'],
                'logID|1':  ['POST','GET'],
                'logName|1': ['POST','GET'],
                'methods|1': ['POST','GET'],
                interface: Random.url(),
                createTime: Random.date() , // 创建日期
            }))
        }

        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 153,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    });

    //资源管理表格数据
    Mock.mock('/resource/getResourceTable','post',(req)=>{
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {
            console.log(e)
        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            //序号
            list.push(Mock.mock({
                id:  '@increment',
                'type|1': ['分类1','分类2'],
                resourceAddr: Random.ip(),
                spaceName: 'jst',
                accessKey: Mock.mock('@string(12)'),
                secretKey: Mock.mock('@string(12)'),
                using:[1],
                interface: Random.url(),
            }))
        }

        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 153,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    });

    //mesDemo维修记录表格数据
    Mock.mock('/resource/getMaintainTable','post',(req)=>{
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {
            console.log(e)
        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            //序号
            list.push(Mock.mock({
                id:  '@increment',
                maintainTime: Random.date(),
                anomalyCode: Random.word(5),
                anomalyName: Random.csentence(5),
                reasonGroupCode: Random.string(5),
                reasonCode: Random.string(5),
                responsibility: Random.csentence(5),
                badMaterial: Random.csentence(5),
                reasonGroupName:Random.csentence(5),
                reasonName: Random.csentence(5),
                servicePerson: Random.cname(),
                materialReplace: Random.csentence(3),
                solution: Random.ctitle(),
                preventive: Random.ctitle(),
            }))
        }

        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 20,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    });

}
