<template>
    <div>
<!--        v-if="$route.meta.keepAlive"-->
        <keep-alive :include="include" :max="30">
            <router-view class="avue-view" :key="$route.fullPath" />
        </keep-alive>
<!--        <router-view class="avue-view" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />-->
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
            ...mapGetters(["exclude", "include"]),
        },
    }
</script>

<style scoped>

</style>
