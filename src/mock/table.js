import Mock from 'mockjs';
import {systemRoutes} from "./routesData";
let Random = Mock.Random;

export default ({ mock })=>{
    if (!mock) return;

    // 复杂表格
    Mock.mock('/table/getTable', 'post', (req)=>{
        console.log("mock/table/getTable");
        console.log(req.body);
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {

        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            list.push(Mock.mock({
                id: Mock.mock('@increment'),
                name: Mock.mock('@cname'),
                username: Mock.mock('@last'),
                avatar: Random.image('100x100', '#894FC4', '#FFF', 'png', '!'),
                categoryTitle:Random.ctitle(3, 5),
                categoryId: Random.integer(1, 100),
                "type|1": [10, 20],
                "status|1": [10, 20, 30, 40, 50, 60],
                createTime: Random.datetime()
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
    })

    // 搜索表格
    Mock.mock('/table/getSearchTable', 'post', (req)=>{
        console.log("mock  /table/getSearchTable");
        console.log(req.body);
        let list = [];
        let body = null;
        try {
            body = JSON.parse(req.body);
        }catch (e) {

        }
        let len = body.tablePage.pageSize || 10;
        for (let i=0;i<len; i++){
            let child = [];
            let count = Random.integer(0, 5);
            for (let j=0; j<count; j++){
                child.push({
                    id: Mock.mock('@increment'),
                    number: Random.guid(), // 设备编码
                    name: Random.sentence(3, 5), // 设备名称
                    module: Random.id(),// 模块号
                    department:Random.ctitle(3, 5), // 制定部门
                    createTime: Random.datetime(),
                })
            }
            list.push(Mock.mock({
                id: Mock.mock('@increment'),
                number: Random.guid(), // 设备编码
                name: Random.sentence(3, 5), // 设备名称
                module: Random.id(),// 模块号
                department:Random.ctitle(3, 5), // 制定部门
                createTime: Random.datetime(),
                children: child
            }))
        }

        return {
            "code": 200,
            "success": true,
            "msg": "操作成功",
            "data": {
                tablePage: {
                    total: 186,
                    currentPage: 1,
                    pageSize: 10
                },
                list: list
            }
        };
    })

}
