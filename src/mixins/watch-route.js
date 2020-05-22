export default {
    data(){
        return {
            watchFlag: false
        }
    },
    watch: {
        "$route": {
            handler(to,from){
                // 添加 $nextTick 确保请求 在 activated 之后
                this.$nextTick(()=>{
                    // console.log("watch")
                    this.watchFlag && this.init && this.init();
                })
            }
        },
        deep: true
    },
    activated(){
        // console.log("激活");
        this.watchFlag = true;
    },
    deactivated(){
        // console.log("组件失活");
        this.watchFlag = false;
    }
}
