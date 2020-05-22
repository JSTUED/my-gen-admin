import G6 from "@antv/g6";

let lineMixin = {
    setState (name, value, item){
        let group = item.getContainer();
        let children = group.get('children');
        let shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if(name=="selected"){
            if(value) {
                shape.attr({
                    'stroke': '#3aa1ff',
                });
            } else {
                shape.attr({
                    'stroke': '#999',
                });
            }
        }
        if(name=="hover"){
            if(value) {
                shape.attr({
                    'cursor': 'pointer'
                });
            } else {
                shape.attr({
                    'cursor': 'auto'
                });
            }
        }

    },

    getAnchorPoints(cfg) {
        return [
            [0, 0.5],  [1, 0.5]
        ];
    }
};

// G6.registerEdge('arrow-line',{
//     ...lineMixin,
//     afterDraw(cfg, group) {},
// }, "line");


// G6.registerEdge('dash-arrow-line',{
//     ...lineMixin,
//     afterDraw(cfg, group) {
//
//     },
// }, "line");

G6.registerEdge('arrow-line',{
    itemType: 'edge',
    draw: function draw(cfg, group) {
        var startPoint = cfg.startPoint,
            endPoint = cfg.endPoint;
        var keyShape = group.addShape('path', {
            attrs: {
                path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
                stroke: '#999',
                lineWidth: 2,
                lineAppendWidth: 15,
                endArrow: {
                    path: [
                        ['M', 0, 0],
                        ['L', -12, -6],
                        ['L', -12, -3],
                        ['L', -3, 0],
                        ['L', -12, 3],
                        ['L', -12, 6],
                        ['Z']
                    ],
                    d: 1
                },
                ...cfg
            },
        });
        return keyShape;
    },

    ...lineMixin,
});

G6.registerEdge('dash-arrow-line',{
    itemType: 'edge',
    draw: function draw(cfg, group) {
        var startPoint = cfg.startPoint,
            endPoint = cfg.endPoint;
        var keyShape = group.addShape('path', {
            attrs: {
                path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
                stroke: '#999',
                lineWidth: 2,
                lineAppendWidth: 15,
                lineDash: [4, 1.5],
                endArrow: {
                    path: [
                        ['M', 0, 0],
                        ['L', -12, -6],
                        ['L', -12, -3],
                        ['L', -3, 0],
                        ['L', -12, 3],
                        ['L', -12, 6],
                        ['Z']
                    ],
                    d: 1
                },
                ...cfg
            },
        });
        return keyShape;
    },

    ...lineMixin,
});


// 有尾箭头
G6.registerEdge('poly-arrow-line', {
    itemType: 'edge',
    draw: function draw(cfg, group) {
        var startPoint = cfg.startPoint,
            endPoint = cfg.endPoint;
        // console.log(cfg);
        var keyShape = group.addShape('path', {
            attrs: {
                path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
                stroke: '#999',
                lineWidth: 2,
                lineAppendWidth: 15,
                // lineDash: [4, 1.5],
                startArrow: {
                    // path: 'M10,0 L-10,-10 L-10,10',
                    path: [
                        ['M', 0, 0],
                        ['L', 10, 10],
                        ['L', 10, 7],
                        ['L', 3, 0],
                        ['L', 10, -7],
                        ['L', 10, -10],
                        ['Z']
                    ],
                    d: 7
                },
                endArrow: {
                    // path: 'M 10,0 L -10,-10 M 10,0 L -10,10',
                    path: [
                        ['M', 0, 0],
                        ['L', -12, -6],
                        ['L', -12, -3],
                        ['L', -3, 0],
                        ['L', -12, 3],
                        ['L', -12, 6],
                        ['Z']
                    ],
                    d: 1
                },
                ...cfg
            },
        });
        return keyShape;
    },

    ...lineMixin,
});

// 虚线有尾箭头line
G6.registerEdge('poly-arrow-dash-line', {
    itemType: 'edge',
    draw: function draw(cfg, group) {
        var startPoint = cfg.startPoint,
            endPoint = cfg.endPoint;
        // console.log(cfg);
        var keyShape = group.addShape('path', {
            attrs: {
                path: [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]],
                stroke: '#999',
                lineWidth: 2,
                lineAppendWidth: 15,
                lineDash: [4, 1.5],
                startArrow: {
                    // path: 'M10,0 L-10,-10 L-10,10',
                    path: [
                        ['M', 0, 0],
                        ['L', 10, 10],
                        ['L', 10, 7],
                        ['L', 3, 0],
                        ['L', 10, -7],
                        ['L', 10, -10],
                        ['Z']
                    ],
                    d: 7,
                },
                endArrow: {
                    // path: 'M 10,0 L -10,-10 M 10,0 L -10,10',
                    path: [
                        ['M', 0, 0],
                        ['L', -12, -6],
                        ['L', -12, -3],
                        ['L', -3, 0],
                        ['L', -12, 3],
                        ['L', -12, 6],
                        ['Z']
                    ],
                    d: 1
                },
                ...cfg
            },
        });
        return keyShape;
    },

    ...lineMixin,
});



