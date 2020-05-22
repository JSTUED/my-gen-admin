<template>
    <div>
        <basic-block title="错误提示">
            <div class="st-text-red st-timeout-content">您超过了最大的登录重试次数，请联系管理员！</div>
            <div class="actions">
                <router-link :to="{path:'/'}">
                    <el-button type="primary">返回首页</el-button>
                </router-link>
            </div>
        </basic-block>
    </div>
</template>

<script>
    export default {
        name: "error-pages"
    }
</script>

<style lang="scss" scoped>
    .actions{
        margin-top: 20px;
    }
</style>