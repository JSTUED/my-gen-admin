<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar style="height:100%;">
      <div v-if="validatenull(menu)"
           class="avue-sidebar--tip">{{$t('menuTip')}}</div>
      <el-menu
               :unique-opened="true"
               :collapse-transition="false"
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               @open="handleOpen" @close="handleClose"
               :collapse="keyCollapse">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      first
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../logo";
import sidebarItem from "./sidebarItem";
import { validatenull } from "@/util/validate";

export default {
  name: "sidebar",
  components: { sidebarItem, logo },
  data() {
    return {};
  },
  created() {
    // this.$store.dispatch("GetMenu").then(data => {
    //   if (data.length === 0) return;
    //   this.$router.$avueRouter.formatRoutes(data, true);
    // });
  },
  computed: {
    ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen"]),
    nowTagValue: function() {
        // console.log(this.$route);
        // console.log(this.$router.$avueRouter.getValue(this.$route));
        return this.$router.$avueRouter.getValue(this.$route);
    }
  },
  mounted() {},
  methods: {
      handleOpen(key, keyPath) {
          //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
          //console.log(key, keyPath);
      },
      validatenull(val) {
          return validatenull(val);
      },
  }
};
</script>
<style lang="scss">
    .avue-sidebar{
        .el-scrollbar__wrap{
            overflow-x: hidden;
        }
    }
</style>

