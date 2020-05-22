<template>
    <div class="home-box">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="6">
               <div class="item">
                   <a href="#">
                       <div class="item-icon icon-primary">
                           <i class="iconfont icon-job"></i>
                       </div>
                       <div class="item-info">
                           <div class="title">51</div>
                           <div class="info">数据展示</div>
                       </div>
                   </a>
               </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
                <div class="item">
                    <a href="#">
                        <div class="item-icon icon-success">
                            <i class="iconfont icon-job1"></i>
                        </div>
                        <div class="item-info">
                            <div class="title">4</div>
                            <div class="info">权限管理</div>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
                <div class="item">
                    <a href="#">
                        <div class="item-icon icon-warn">
                            <i class="iconfont icon-daiqueren"></i>
                        </div>
                        <div class="item-info">
                            <div class="title">14</div>
                            <div class="info">用户管理</div>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
                <div class="item">
                    <a href="#">
                        <div class="item-icon icon-danger">
                            <i class="iconfont icon-renwu1"></i>
                        </div>
                        <div class="item-info">
                            <div class="title">12332</div>
                            <div class="info">错误日志</div>
                        </div>
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home-box"
    }
</script>

<style lang="scss">
    .home-box {
        margin-top: 8px;
        .item {
            height: 100px;
            box-sizing: border-box;
            >a {
                display: flex;
                outline: none;
                -webkit-tap-highlight-color: transparent;
                color: #000;
                .item-icon{
                    width: 100px;
                    height: 100px;
                    color: #fff;
                    text-align: center;
                    line-height: 100px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    border-radius: 4px 0 0 4px;
                    i{
                        font-size: 40px;
                    }
                }
                .item-icon.icon-primary{
                    background-color: #3aa1ff;
                }
                .item-icon.icon-success{
                    background-color: #6bb377;
                }
                .item-icon.icon-warn{
                    background-color: #f08f00;
                }
                .item-icon.icon-danger{
                    background-color: #ed5565;
                }
                .item-info{
                    border-radius: 0 4px 4px 0;
                    border: 1px solid #e7e7e7;
                    border-left: none;
                    background-color: #fff;
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    .title {
                        font-size: 28px;
                        line-height: 40px;
                        text-align: center;
                    }
                    .info {
                        font-size: 14px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
