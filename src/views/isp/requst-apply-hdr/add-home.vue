<template>
    <div>
        <basic-area>
            <el-row>
                <el-col :span="12" v-for="x in 7" :key="x">
                    <router-link to="/reduction/reduction-list">
                        <basic-block class="add-home-block">
                            <div slot="title">
                                <i class="iconfont icon-shebeikaifa"></i>
                                信息技术中心
                            </div>

                            <div class="add-home-card">
                                <div class="card-title">
                                    ITC服务
                                </div>
                                <div class="card-body">
                                    <div class="card-icon">
                                        <i class="iconfont icon-shebeikaifa"></i>
                                    </div>
                                    <div class="card-content">
                                        电脑办公设备问题处理、网络及软硬件故障报修、应用系统服务需求、ITC服务改善反馈。
                                        电脑办公设备问题处理、网络及软硬件故障报修、应用系统服务需求、ITC服务改善反馈。
                                    </div>
                                </div>
                            </div>
                        </basic-block>
                    </router-link>
                </el-col>
            </el-row>
        </basic-area>
    </div>
</template>

<script>
    export default {
        name: "add-home"
    }
</script>

<style lang="scss">
    .add-home-block.basic-block .title{
        padding: 0px 0px 5px 0px;
        i{
            font-weight: bold;
            font-size: 16px;
        }
    }
    .add-home-block .el-card__body{
        padding: 0px;
    }

    .add-home-card{
        margin-top: 20px;
        width: 280px;
        height: 106px;
        border: 1px solid #e7e7e7;
        border-radius: 2px;
        margin-bottom: 10px;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: 0 0 6px #eee;
        padding: 7px 0;
        transition: all .4s;
        &:hover{
            box-shadow: 0 0 6px #e7e7e7;
            transform: scale(1.1);
        }
        .card-body{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0 10px;
        }
        .card-title{
            padding: 0 10px 7px 10px;
            /*font-weight: bold;*/
            font-size: 14px;
            color: #333;
        }
        .card-icon{
            width: 40px;
            height: 40px;
            background-color: #d2dbe0;
            border-radius: 4px;
            color: #fff;
            text-align: center;
            line-height: 40px;
        }
        .card-icon i{
            font-size: 20px;
        }
        .card-content{
            flex: 1;
            white-space: initial;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            color: #666;
            line-height: 20px;
            margin-left: 10px;
        }
    }
</style>