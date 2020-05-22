// 封装点击添加边的交互
import G6 from "@antv/g6";

G6.registerBehavior('click-add-poly-dash-edge', {
    getEvents() {
        return {
            'node:click': 'onClick' ,
            "mousemove": 'onMousemove',
            "canvas:mousedown": "onClickRight",
            "keydown": "keydown"
        };
    },
    onClick(ev) {
        const node = ev.item;
        const graph = this.graph;
        const point = {x: ev.x, y: ev.y};
        const model = node.getModel();
        // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
        if (this.addingEdge && this.edge) {
            let sourceId = this.edge.getSource().getModel().id;
            if(sourceId == model.id) {
                console.log("始点和终点不能是同一个元素");
                return false;
            }
            graph.updateItem(this.edge, {
                target: model.id
            });
            this.edge = null;
            this.addingEdge = false;
        } else {
            // 点击节点，触发增加边
            this.edge = graph.addItem('edge', {
                source: model.id,
                target: point,
                shape: 'poly-arrow-dash-line',
                style: {
                    endArrow: true,
                    startArrow: true,
                    lineWidth: 2,
                },
                stroke: '#999',
                lineAppendWidth: 15,
                // lineDash: [4, 1.5],
            });
            this.addingEdge = true;
        }
    },
    onMousemove(ev) {
        const point = {x: ev.x, y: ev.y};
        if (this.addingEdge && this.edge) {
            // 增加边的过程中，移动时边跟着移动
            this.graph.updateItem(this.edge, {
                target: point
            });
        }
    },
    onClickRight(ev){
        //console.log(ev);
    },

    keydown(e){
        // console.log(e);
        // 键盘按下 退出键 esc
        if(e.keyCode==27 && this.edge){
            console.log(this.edge);
            this.graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
            this.graph.removeBehaviors('click-add-poly-dash-edge', "default");
        }
    }
});
