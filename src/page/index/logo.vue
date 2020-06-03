<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="keyCollapse"
            class="avue-logo_subtitle"
            key="0">
        <img src="img/bg/img-logo.png"
             width="30" />
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <span class="avue-logo_title"
              key="1">
          <div>
            <img src="img/bg/img-logo.png"
                 width="30"
                 alt="">{{website.indexTitle}}</div>
        </span>
      </template>
    </transition-group>
    <div class="role">
      <img v-if="isRole" src="../../assets/images/fuwu.png" alt="">
      <img v-else src="../../assets/images/faqi.png" alt="">
      <i class="iconfont icon-zhuanhuan1" @click="roleChange()"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "logo",
  data() {
    return {
      isRole: true,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["website", "keyCollapse"])
  },
  methods: {
    roleChange(){
      this.isRole = !this.isRole;
    }
  }
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 64px;
  line-height: 64px;
  background-color: #4a5c6a;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  /*box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);*/
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 16px;
    div {
      display: flex;
      align-items: center;
      /*justify-content: center;*/
      width: 100%;
      /*font-family: "Microsoft JhengHei",微软雅黑;*/
      /*font-weight: 700;*/
      font-size: 18px;
      color: #fff;
      img {
        margin-right: 5px;
        margin-left: 20px;
      }
    }
  }
  &_subtitle {
    padding-top: 10px;
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
  .role{
    img{
      position: absolute;
      top: 0;
      right: 0;
    }
    i{
      position: absolute;
      top: 22px;
      right: 35px;
      cursor: pointer;
    }
  }
</style>
