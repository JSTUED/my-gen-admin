<template>
    <div class="basic-area">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "basic-area"
    }
</script>

<style scoped>
    .basic-area{
        padding: 15px 15px 0px 15px;
        background: #fff;
        border-radius: 5px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>
