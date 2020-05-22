export default {
    props: {
        // 流程图容器id
        id: {
            type: String,
            default: "flowChart"
        },
        // 流程图高度
        height: {
            type: Number,
            default: 800
        },
        // 流程图宽度
        width: {
            type: [Number, String], // 默认100% 数字时单位为 px
            default: "100%"
        },
        // 是否显示网格
        showGrid: {
            type: Boolean,
            default: true
        },
        // 初始化data数据
        data: {
            type: Object,
            default(){
                return {}
                // return {
                //     nodes: [
                //         { id: "1", x:100, y: 100, shape: "react", label: "circle" },
                //         { id: "2", x:200, y: 100, shape: "rect", label: "rect" },
                //         {
                //             id: "3",
                //             x:300,
                //             y: 100,
                //             size: [60, 30],
                //             shape: "ellipse",
                //             label: "ellipse",
                //             color: "#fa8c16",
                //             labelCfg: {
                //                 position: "bottom",
                //                 offset: 10,
                //                 style: {
                //                     fill: "#f00"
                //                 }
                //             },
                //             style: {
                //                 lineWidth: 2
                //             }
                //         },
                //         { id: "4", x:400, y: 100, shape: "image", label: "image", img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg' },
                //     ],
                //     edges: [ { id: 5,  source: '1', target: '2', stroke: '#00F', shape: 'poly-arrow-line', style: {  endArrow: true, } }],
                // };
            }
        },
        // 定义的图片节点
        nodes: {
            type: Array,
            default() {
                return [];
            }
        },

        //节点属性
        nodePropsList: {
            type: Array,
            default(){
                return []
            }
        },
    }
}
