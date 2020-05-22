<template>
    <div class="home-progress">
        <el-row :span="24" :gutter="20">
            <el-col  :xs="24" :sm="12" :md="8">
                <div class="item">
                    <a href="#">
                        <div class="item-header">
                            <div class="item-count">32%</div>
                            <div class="item-title">转化率（日同比 28%）</div>
                        </div>
                        <el-progress :percentage="32" :stroke-width="16" color="#3aa1ff" :show-text="false"></el-progress>
                    </a>
                </div>
            </el-col>
            <el-col  :xs="24" :sm="12" :md="8">
                <div class="item">
                    <a href="#">
                        <div class="item-header">
                            <div class="item-count">32%</div>
                            <div class="item-title">转化率（日同比 28%）</div>
                        </div>
                        <el-progress :percentage="32" :stroke-width="16" color="#ed5565" :show-text="false"></el-progress>
                    </a>
                </div>
            </el-col>
            <el-col  :xs="24" :sm="12" :md="8">
                <div class="item">
                    <a href="#">
                        <div class="item-header">
                            <div class="item-count">32%</div>
                            <div class="item-title">转化率（日同比 28%）</div>
                        </div>
                        <el-progress :percentage="32" :stroke-width="16" color="#6bb377" :show-text="false"></el-progress>
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home-progress"
    }
</script>

<style lang="scss">
    .home-progress{
        .item{
            >a{
                outline: none;
                -webkit-tap-highlight-color: transparent;
                color: #000;
                .item-header{
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .item-count{
                        line-height: 26px;
                        font-size: 24px;
                    }
                    .item-title{
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
