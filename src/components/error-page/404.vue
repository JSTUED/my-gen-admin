<template>
  <div class="error-page">
    <div class="middle-box text-center animated fadeInDown">
      <img src="../../assets/images/404.png" alt="404" class="error-img" style="margin-top:80px;">
      <img src="../../assets/images/logogray.png" alt="404" class="error-img error-img-logo" style="">
      <h3 class="font-bold error-text">出错啦</h3>

      <div class="error-desc">
        对不起，您访问的页面不存在。
        <form class="form-inline m-t" role="form">
          <div class="actions">
            <router-link :to="{path:'/'}">
              <el-button type="primary">返回首页</el-button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-404"
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
