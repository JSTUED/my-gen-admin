// 防止G6后导入
import G6 from "@antv/g6";

// G6.registerNode("node-serve", {
//     afterDraw(cfg, group) {
//         let bbox = group.getBBox();
//         // 绘制锚点
//         this.getAnchorPoints().forEach((point, i)=>{
//             let [x, y] = point;
//             // let color = ['red', 'green', 'gray', 'blue']
//             group.addShape("marker", {
//                 attrs: {
//                     name: "anchor",
//                     x: x * bbox.width + bbox.x, // (bbox.x, bbox.y) 中心点
//                     y: y * bbox.height + bbox.y,
//                     fill: "#fff",
//                     stroke: '#3aa1ff',
//                     r: 3,
//                     symbol: 'circle',
//                     cursor: 'crosshair',
//                     fillOpacity: 0,
//                     strokeOpacity: 0,
//                 }
//             })
//         })
//
//     },
//
//     setState (name, value, item){
//         const group = item.getContainer();
//         // console.log(item.getBBox());
//         let children = group.get('children');
//         // console.log(children);
//         if(name=="hover" || name=="selected"){
//             children.forEach((child)=>{
//                 if (child._attrs.name === 'anchor') {
//                     if (value) {
//                         child.attr({
//                             fillOpacity: 1,
//                             strokeOpacity: 1
//                         })
//                     } else {
//                         child.attr({
//                             fillOpacity: 0,
//                             strokeOpacity: 0
//                         })
//                     }
//                 }
//             })
//         }
//
//     },
//
//     getAnchorPoints(cfg) {
//         return [
//             [0.5, 0], [1, 0.5], [0.5, 1],[0, 0.5]
//         ];
//     }
// }, "image");


G6.registerNode("node-serve", {
    afterDraw(cfg, group) {
        let bbox = group.getBBox();
        // console.log(bbox);
        // 绘制锚点
        let points = [[0.5, 0], [1, 0.5], [0.5, 1],[0, 0.5]];
        points.forEach((point, i)=>{
            let [x, y] = point;
            // let color = ['red', 'green', 'gray', 'blue']
            group.addShape("marker", {
                attrs: {
                    name: "anchor",
                    x: x * bbox.width + bbox.x, // (bbox.x, bbox.y) 中心点
                    y: y * bbox.height + bbox.y,
                    fill: "#fff",
                    stroke: '#3aa1ff',
                    r: 3,
                    symbol: 'circle',
                    cursor: 'crosshair',
                    fillOpacity: 0,
                    strokeOpacity: 0,
                }
            })
        })

    },

    setState (name, value, item){
        const group = item.getContainer();
        let children = group.get('children');
        if(name=="hover" || name=="selected"){
            children.forEach((child)=>{
                if (child._attrs.name === 'anchor') {
                    if (value) {
                        child.attr({
                            fillOpacity: 1,
                            strokeOpacity: 1
                        })
                    } else {
                        child.attr({
                            fillOpacity: 0,
                            strokeOpacity: 0
                        })
                    }
                }
            })
        }

    }

}, "image");
