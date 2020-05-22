<template>
    <div>
        <keep-alive :exclude="exclude" :max="30">
            <router-view class="avue-view" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
        </keep-alive>
        <router-view class="avue-view" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "layout",
        data(){
          return {
              // exclude: [],
          }
        },
        computed: {
            ...mapGetters(["exclude"]),
        },
        // watch: {
        //     $route: {
        //         handler(val,oldval){
        //             console.log("layout", val.meta.isRefresh);
        //             // 指定刷新且组件初始值是缓存的
        //             if(val.meta.isRefresh == true && val.meta.keepAlive==true){
        //                 val.meta.keepAlive = false;// 切换到不缓存形式
        //                 this.exclude = [val.meta.component];// 动态销毁已缓存的组件
        //                 console.log(this.exclude);
        //                 setTimeout(()=>{
        //                     val.meta.keepAlive = true; // 切换到缓存状态
        //                     this.exclude = []; // 将组件加入缓存
        //                     val.meta.isRefresh = false; // 还原刷新状态
        //                 }, 0);
        //
        //             }else {
        //                 val.meta.isRefresh = false; // 还原刷新状态
        //             }
        //         },
        //         deep: true
        //     }
        // },
    }
</script>

<style scoped>

</style>
