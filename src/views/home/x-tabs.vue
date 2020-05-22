<template>
    <div class="home-tabs">
        <el-row :span="24" :gutter="20">
            <el-col :xs="24" :sm="12" :md="8">
                <div class="item bg-primary">
                    <a href="#">
                        <div class="item-header">
                            <p>分类统计</p>
                            <span>实时</span>
                        </div>
                        <div class="item-body">
                            <h2>12332</h2>
                        </div>
                        <div class="item-footer">
                            <span>1022</span>
                            <p>当前分类总记录数</p>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
                <div class="item bg-danger">
                    <a href="#">
                        <div class="item-header">
                            <p>附加统计</p>
                            <span>实时</span>
                        </div>
                        <div class="item-body">
                            <h2>12332</h2>
                        </div>
                        <div class="item-footer">
                            <span>1022</span>
                            <p>当前分类总记录数</p>
                        </div>
                    </a>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
                <div class="item bg-success">
                    <a href="#">
                        <div class="item-header">
                            <p>文章统计</p>
                            <span>实时</span>
                        </div>
                        <div class="item-body">
                            <h2>12332</h2>
                        </div>
                        <div class="item-footer">
                            <span>1022</span>
                            <p>当前分类总记录数</p>
                        </div>
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "jst-tabs"
    }
</script>

<style lang="scss">
   .home-tabs{
       .item{
           position: relative;
           margin-top: 20px;
           padding: 12px;
           height: 160px;
           border-radius: 4px;
           box-sizing: border-box;
           overflow: hidden;
           color: #fff;
           >a{
               color: #fff;
               outline: none;
               -webkit-tap-highlight-color: transparent;
               .item-header {
                   position: relative;
                   >p {
                       color: #fff;
                       margin: 0;
                       font-size: 14px;
                   }
                   >span {
                       position: absolute;
                       right: 0;
                       top: 0;
                       padding: 2px 8px;
                       border-radius: 4px;
                       font-size: 12px;
                       background: rgba(255,255,255,.3);
                   }
               }
               .item-body{
                   >h2 {
                       color: #fff;
                       margin: 0;
                       font-size: 28px;
                       line-height: 56px;
                   }
               }
               .item-footer {
                   padding-top: 8px;
                   line-height: 20px;
                   font-size: 12px;
                   >p {
                       color: #fff;
                       margin: 0;
                   }
               }
           }
       }
       .item.bg-primary{
           background-color: #3aa1ff;
       }
       .item.bg-danger{
           background-color: #ed5565;
       }
       .item.bg-success{
           background-color: #6bb377;
       }
   }
</style>
