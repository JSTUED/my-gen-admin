<template>
  <div class="error-page">
    <div class="middle-box text-center animated fadeInRightBig">
      <img src="../../assets/images/no_auth.png" class="" style="margin-top:80px;">
      <div class="error-desc">
        抱歉，您没有权限，请联系管理员
        <div class="actions">
          <router-link :to="{path:'/'}">
            <el-button type="primary">返回首页</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-403"
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
