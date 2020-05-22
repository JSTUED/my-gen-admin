<template>
    <div class="home-icons">
        <el-row :span="24">
            <el-col :xs="12" :sm="12" :md="12">
                <div class="item">
                    <a href="#">
                        <div class="item-icon">
                            <i class="iconfont icon-reg"></i>
                        </div>
                        <div class="item-info">
                            <span>今日注册</span>
                            <div class="count">32</div>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12">
                <div class="item">
                    <a href="#">
                        <div class="item-icon">
                            <i class="iconfont icon-denglu2"></i>
                        </div>
                        <div class="item-info">
                            <span>今日登录</span>
                            <div class="count">32</div>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12">
                <div class="item">
                    <a href="#">
                        <div class="item-icon">
                            <i class="iconfont icon-dingyue"></i>
                        </div>
                        <div class="item-info">
                            <span>今日订阅</span>
                            <div class="count">32</div>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12">
                <div class="item">
                    <a href="#">
                        <div class="item-icon">
                            <i class="iconfont icon-wsdzb_zzgzt_zzsh_mzpy_dymzpyjl"></i>
                        </div>
                        <div class="item-info">
                            <span>今日评论</span>
                            <div class="count">32</div>
                        </div>
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home-icons"
    }
</script>

<style lang="scss">
.home-icons{
    margin-top: 10px;
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        >a{
            outline: none;
            -webkit-tap-highlight-color: transparent;
            color: #000;
            .item-icon {
                text-align: center;
                >i{
                    color: #3aa1ff;
                    font-size: 40px;
                }
            }
            .item-info {
                text-align: center;
                padding: 10px 0;
                >span {
                    display: block;
                    padding: 5px 0;
                    font-size: 12px;
                }
                .count {
                    font-size: 18px;
                    line-height: 25px;
                    color: #3aa1ff;
                }
            }
        }
    }
}
</style>
