<template>
    <div>
        <!-- jst-box -->

        <el-row :span="24">
            <el-col>
                <basic-container>
                    <jst-box></jst-box>
                </basic-container>
            </el-col>
        </el-row>

        <el-row>
            <el-col :xs="24" :sm="24" :md="18" style="margin-bottom: 0">
               <basic-container style="padding-right: 0">
                   <!-- jst-progress -->
                   <jst-progress></jst-progress>
                   <!-- jst-tabs -->
                   <jst-tabs></jst-tabs>
               </basic-container>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" style="margin-bottom: 0">
                <basic-container>
                    <!-- jst-icons -->
                    <jst-icons></jst-icons>
                </basic-container>
            </el-col>
        </el-row>

        <!--tables and carousel-->
        <el-row>
            <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 0">
                <basic-container style="padding-right: 0">
                    <div class="home-table-title">任务信息</div>
                    <!-- jst-tables -->
                    <jst-tables></jst-tables>
                </basic-container>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" style="margin-bottom: 0">
                <basic-container>
                    <!--jst-carousel-->
                    <jst-carousel></jst-carousel>
                </basic-container>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import jstBox from './x-box';
    import jstProgress from './x-progress';
    import jstTabs from './x-tabs';
    import jstIcons from './x-icons';
    import jstTables from './x-tables';
    import jstCarousel from './x-carousel';

    export default {
        name: "index",
        components: {
            jstBox,
            jstProgress,
            jstTabs,
            jstIcons,
            jstTables,
            jstCarousel
        },
    }
</script>

<style scoped>
    .home-table-title{
        padding: 0 20px 20px 20px;
        border-bottom: 1px solid #e7e7e7;
        margin: 0 -20px;
    }
    .home-table-title+.home-tables{
        margin-top: 20px;
    }
</style>
