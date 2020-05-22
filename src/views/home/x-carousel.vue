<template>
    <div class="home-carousel">
        <el-carousel indicator-position="outside" arrow="never">
            <el-carousel-item class="el-carousel__item" v-for="(item,index) in imgList" :key="index">
                <img class="carousel-image" :src="item.url" alt="示例图片">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "home-carousel",
        data(){
            return{
                imgList:[
                    {url: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg'},
                    {url: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg'},
                    {url: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg'},
                    {url: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'},
                ]
            }
        }
    }
</script>

<style lang="scss">
    .home-carousel{
        padding: 59px 0 58px;
        .el-carousel__item{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 30px 0;
            .carousel-image{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .el-carousel__indicator.is-active{
            .el-carousel__button{
                background-color: #3aa1ff;
            }
        }
        .el-carousel__button{
            width: 10px;
            height: 10px;
            border-radius: 15px;
            margin-top: 60px;
            -webkit-tap-highlight-color: transparent;
        }
    }
</style>
