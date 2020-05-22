<template>
    <div class="g6-editor-mes">
        <div :id="id" class="flowChart" :style="{ width: containerWidth, height: height + 'px' }">
            <div class="operating">
                <!--<div class="btn-group">-->
                <!--<div class="btn" @click="addNode(node)" v-for="(node, index) in nodes" :key="index" :title="node.title">-->
                <!--<i :class="node.icon"></i>-->
                <!--</div>-->
                <!--</div>-->
                <div class="btn-group">
                    <div class="btn" title="实线箭头" @click="_changeBehaviors('click-add-edge')">
                        <i class="iconfont icon-shixian"></i>
                    </div>
                    <div class="btn" title="虚线箭头" @click="_changeBehaviors('click-add-dash-edge')">
                        <i class="iconfont icon-xuxian"></i>
                    </div>
                    <div class="btn" title="有尾箭头" @click="_changeBehaviors('click-add-poly-edge')">
                        <i class="iconfont icon-shixian2"></i>
                    </div>
                    <div class="btn" title="虚线有尾箭头" @click="_changeBehaviors('click-add-poly-dash-edge')">
                        <i class="iconfont icon-xuxian2"></i>
                    </div>
                </div>
                <div class="btn-group">
                    <div class="btn" title="操作模式">
                        <i class="iconfont icon-icon-chose" @click="changeMode('default')"></i>
                    </div>
                    <div class="btn" title="移动模式" @click="changeMode('dragMode')">
                        <i class="iconfont icon-drag"></i>
                    </div>
                </div>
                <div class="btn-group">
                    <div class="btn" title="删除" @click="deleteItem">
                        <i class="iconfont icon-delete1"></i>
                    </div>
                    <div class="btn" title="保存" @click="saveData">
                        <i class="iconfont icon-save1"></i>
                    </div>
                    <div class="btn" title="下载" @click="downLoadImg">
                        <i class="iconfont icon-cloud-download"></i>
                    </div>
                </div>
            </div>
            <div class="info" >
                <el-collapse v-model="activeNames">
                    <el-collapse-item name="serveList">
                        <template slot="title">工作站列表</template>
                        <div class="collapse-item">
                            <div class="serve-search">
                                <el-input v-model.trim="searchVal" placeholder="请输入内容" >
                                    <template slot="append">
                                        <el-button type="primary" @click="searchClick">搜索</el-button>
                                    </template>
                                </el-input>
                            </div>
                            <div class="serve-content">
                                <el-scrollbar wrap-style="height: 170px;">
                                    <div class="serve-list" v-for="(node, index) in nodeList" :key="index" :title="node.title" @click="addNode(node)">
                                        {{node.title}}
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item name="serveProps" v-if="editType == 'node' && editItem.id">
                        <template slot="title">属性</template>
                        <div class="collapse-item">
                            <el-form label-width="60px">
                                <el-form-item label="节点属性">
                                    <el-select v-model="editItem.nodeProp" @change="changeItemModel('nodeProp')" placeholder="请选择">
                                        <el-option v-for="(item, index) in nodePropsList" :value="item.value" :label="item.label" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="节点说明">
                                    <el-input v-model.trim="editItem.label" @input="changeItemModel('label')" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="文字位置">
                                    <el-select v-model="editItem.labelPosition" @change="changeItemModel('labelPosition')" placeholder="请选择">
                                        <el-option v-for="(item, index) in testPosList" :value="item.value" :label="item.label" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="文字大小">
                                    <el-input v-model.trim="editItem.labelFontSize" @input="changeItemModel('labelFontSize')" ></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item name="edgeProps" v-if="editType == 'edge'">
                        <template slot="title">连接线属性</template>
                        <div class="g6-edge-desc-wrap">
                            <div class="edge-desc-title">
                                <!--{{ editEdge.shape == 'arrow-line' ? '主连接线' : '次连接线'}}-->
                                {{edgeShapeNames[editEdge.shape]}}
                            </div>
                            <div class="edge-desc-content">
                                判定条件&nbsp;&nbsp;&nbsp;&nbsp;
                                <!--{{ editEdge.shape == 'arrow-line' ? 'Y' : 'N' }}-->
                                {{edgeShapeDesc[editEdge.shape]}}
                            </div>
                        </div>
                    </el-collapse-item>

                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    import G6 from "@antv/g6";
    import Grid from "@antv/g6/build/grid";
    import "./src/shap/node";
    import "./src/shap/line";
    import propsMixins from "./src/mixin/props";
    import "./src/behavior/index";
    import { extendObjDeep } from "@/util/util";
    import { edgeShapeNames, edgeShapeDesc} from "./config";

    export default {
        name: "g6-mes-editor",
        mixins: [propsMixins],
        computed: {
            containerWidth(){
                return typeof this.width == "number" ? this.width + "px" : this.width;
            }
        },

        data(){
            let defaultEditItem = {
                label: "",
                nodeProp: "",
                labelPosition: "",
                labelCfg: {
                    position: "",
                    style: {
                        fontSize: 16
                    },
                },
            };
            return {
                label: "",
                searchVal: "",
                nodeList: this.nodes,

                graph: null,
                currentItem: null, // 当前操作的节点或边
                drawer: false,
                defaultBehaviors: ["drag-node"],
                activeBehaviors: [], // 激活的行为
                activeNames: ['serveList', 'serveProps', 'edgeProps'],

                // editItem: defaultEditItem,
                editItem: defaultEditItem,
                defaultEditItem: defaultEditItem,
                editType: "", // node 节点 edge 边 标记当前编辑的是节点还是线
                editEdge: {},
                testPosList: [
                    { label: "图标上方", value: "top" },
                    { label: "图标右方", value: "right" },
                    { label: "图标下方", value: "bottom" },
                    { label: "图标左方", value: "left" },
                    { label: "图标中间", value: "center" }
                ],
                edgeShapeNames: edgeShapeNames,
                edgeShapeDesc: edgeShapeDesc
            }
        },

        watch: {
            "data": function(newVal, oldVal){
                this.changeData(newVal);
            },
            "nodes": function(newVal, oldVal){
                this.nodeList = newVal;
            }
        },

        created(){
            this.$nextTick(()=>{
                // this.editItem = _.cloneDeep(this.defaultEditItem);
                this.initG6();
                this.initEvent();
            })
        },

        methods: {
            test(){
                const nodes = this.graph.findAll('node', node => {
                    return true;
                });
                console.log(nodes);
            },
            // 初始化编辑器事件
            initEvent(){
                window.onresize = ()=>{
                    let width = document.getElementById(this.id).clientWidth;
                    this.graph.changeSize(width, this.height);
                }
                this.graph.on("canvas:mousedown", this._canvasMousedown);
                this.graph.on("node:click", this._nodeClick);
                this.graph.on("edge:click", this._edgeClick);
                this.graph.on("edge:mouseover", this._edgeHover);
                this.graph.on("edge:mouseleave", this._edgeHover);
                // this.graph.on("keydown", this._keydown)
            },
            // 初始化编辑器
            initG6(){
                let grid = null;
                // console.log(this.showGrid);
                if(this.showGrid){
                    grid = new Grid();
                }
                // console.log(grid);
                let width = document.getElementById(this.id).clientWidth;
                this.graph = new G6.Graph({
                    container: this.id,
                    height: this.height,
                    width: width,
                    plugins: [grid],
                    modes: {
                        default: this.defaultBehaviors,
                        dragMode: ['drag-canvas', 'zoom-canvas']
                        // default: [
                        //     {
                        //         type: "drag-node",
                        //         delegate: false
                        //     },
                        //     {
                        //         type: "zoom-canvas",
                        //         sensitivity: 0.5
                        //     }
                        // ]
                    },
                });

                this.graph.data(this.data);
                this.graph.render();
                // this.graph.fitView(0)
            },

            searchClick(){
                // console.log(this.searchVal);
                this.nodeList = this.nodes.filter((item)=>{
                    return item.title.indexOf(this.searchVal) !== -1;
                })
            },
            // 添加节点
            addNode(node){
                this.currentItem = {
                    ...node,
                    // operateType: "add",
                    //label: "",
                    labelCfg: {
                        position: "bottom",
                    }
                }
            },
            // 按下鼠标事件
            _canvasMousedown(evt){
                //console.log(evt);
                // 添加节点
                if (this.currentItem) {
                    this.graph.addItem("node", {
                        ...this.currentItem,
                        id: G6.Util.uniqueId(),
                        x: evt.x,
                        y: evt.y,
                    });
                    this.currentItem = null; // 添加后清空
                }else {
                    this.editItem = _.cloneDeep(this.defaultEditItem); // 恢复默认
                    this.editType = ""; // 编辑节点或边类型 清空
                    this.clearAllStates();
                }
            },
            // 点击节点事件
            _nodeClick(event){

                const node = event.item;
                this.graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
                if(!node.hasState('selected')){
                    // 节点不选中
                    this.editItem = _.cloneDeep(this.defaultEditItem); // 恢复默认
                    this.editType = ""; // 编辑节点或边类型 清空
                    return false; // 不往下执行
                }
                // 设置当前节点正在编辑的模型
                let editItem = node.getModel();
                editItem = _.cloneDeep(editItem);
                editItem.labelCfg = editItem.labelCfg || {};
                // 处理 position
                if(editItem.labelCfg.position){
                    editItem.labelPosition = editItem.labelCfg.position;
                }

                // 处理 label style
                editItem.labelCfg.style = editItem.labelCfg.style || {};
                // 处理fontSize
                if(editItem.labelCfg.style.fontSize){
                    editItem.labelFontSize = editItem.labelCfg.style.fontSize
                }
                // this.editItem = extendObjDeep(true, this.defaultEditItem, editItem);
                this.editItem = editItem;
                this.editType = "node";
            },
            changeItemModel(name){
                let item = this.graph.findById(this.editItem.id);
                // console.log(this.editItem);
                if(this.editItem.labelPosition){
                    this.editItem.labelCfg.position = this.editItem.labelPosition;
                    // this.editItem.labelPosition = null;
                }
                if(this.editItem.labelFontSize){
                    this.editItem.labelCfg.style.fontSize = this.editItem.labelFontSize;
                    // this.editItem.labelFontSize = null;
                }

                this.graph.updateItem(item, this.editItem);

                this.$emit("change-item-model", this.editItem); // 传出整体的数据
            },
            // 点击边事件
            _edgeClick(event){
                // console.log(event, "edge");
                const edge = event.item;
                this.graph.setItemState(edge, 'selected', !edge.hasState('selected')); // 切换选中
                if(!edge.hasState('selected')){
                    // 边不选中
                    this.editType = "";
                }else {
                    // 边选中
                    this.editType = "edge";
                    this.editEdge = edge.getModel();
                    console.log(this.editEdge);
                }

            },
            // 鼠标滑动到节点事件
            _edgeHover(event){
                const edge = event.item;
                this.graph.setItemState(edge, 'hover', !edge.hasState('hover')); // 切换选中
            },

            _keydown(e){
                console.log(e)
            },

            // 切换行为 行为操作
            _changeBehaviors(behaviors){
                // 移除其他行为
                this.graph.setMode("default");
                this.graph.removeBehaviors(this.activeBehaviors, "default");
                // 添加需要的行为
                this.graph.addBehaviors(behaviors, "default");
                this.activeBehaviors = behaviors;
            },

            // 切换模式
            changeMode(mode){
                this.graph.setMode(mode);
            },

            // 清除所有状态
            clearAllStates(){
                // 批量操作时关闭自动重绘，以提升性能
                this.graph.setAutoPaint(false)
                this.graph.getNodes().forEach((node)=>{
                    this.graph.clearItemStates(node)
                });
                this.graph.getEdges().forEach((edge)=>{
                    this.graph.clearItemStates(edge)
                });
                this.graph.paint();
                this.graph.setAutoPaint(true)
            },

            // 删除选中节点
            deleteItem(){
                let nodes = this.graph.findAllByState('node', 'selected');
                let edges = this.graph.findAllByState('edge', 'selected');
                [...nodes, ...edges].forEach((item)=>{
                    this.graph.removeItem(item);
                });
            },

            // 保存数据
            saveData(){
                let data = this.graph.save(); // 获取图数据
                // console.log(data);
                this.$emit("save-data", data);
            },
            // 将流程图保存为图片
            downLoadImg(){
                this.graph.downloadImage(new Date().getTime());
            },
            // 返回生成图片的URL。base64 数据
            getDataUrl(){
                return this.graph.toDataURL();
            },
            // 更新数据
            changeData(val){
                this.graph.changeData(val);
            },
            // 获取流程图数据
            getData(){
                return this.graph.save();
            },
            getGraph(){
                return this.graph;
            }
        }
    }
</script>

<style lang="scss">
    $border-color: #e7e7e7;
    .g6-editor-mes{
        position: relative;
        .flowChart{
            z-index: 1;
            overflow: hidden;
            border: 1px solid $border-color;
            position: relative;
        }
        .operating {
            position: absolute;
            z-index: 2;
            background-color: #ffffff;
            padding: 10px 5px;
            top: 0;
            /*right: 0;*/
            left: 0;
            box-shadow: 1px 1px 4px 0 #0a0a0a2e;
            .btn-group {
                border-right: 1px solid $border-color;
                display: inline-block;
                padding-left: 10px;
                padding-right: 14px;
            }
            .btn-group:last-of-type {
                border-right: 0;
            }
            .btn-group .btn {
                display: inline-block;
                margin: 2px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                border: 1px solid transparent;
                padding: 0px;
                vertical-align: middle;
            }
            .btn-group .btn i {
                font-size: 20px;
                vertical-align: middle;
                position: relative;
                top: -1px;
            }
            .btn-group .btn:hover {
                border: 1px solid $border-color;
                color: #767A85;
                border-radius: 2px;
                background: #FAFAFE;
            }
            .btn-group .el-form-item {
                margin-bottom: 0 !important;
            }
        }

        .g6-grid{
            // 移动时grid位置不变化
            transform: none !important;
        }

        .info {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 250px;
            z-index: 99;
            box-shadow: 1px 1px 4px 0 #0a0a0a2e;
            background: #fff;
            .el-collapse{
                border-top: none;
                border-bottom: none;
                .el-collapse-item__header{
                    padding-left: 10px;
                    background: #f5f5f5;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                }
                .el-collapse-item__content{
                    padding-bottom: 0px;
                }
                .collapse-item{
                    padding: 15px 10px;
                    font-size: 12px;
                    .serve-content{
                        margin-top: 12px;
                    }
                    .serve-list{
                        cursor: pointer;
                    }
                    .serve-list + .serve-list{
                        margin-top: 5px;
                    }

                }
                .el-input-group__append{
                    background: #3aa1ff;
                    border-color: #3aa1ff;
                    color: #fff;
                }
            }
        }


        .g6-edge-desc-wrap{
            font-size: 12px;
            padding-left: 10px;
            line-height: 32px;
            padding-bottom: 10px;
            .edge-desc-title{

            }
            .edge-desc-content{
                font-weight: bold;
            }
        }

    }
</style>
