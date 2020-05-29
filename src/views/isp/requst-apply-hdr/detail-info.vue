<template>
    <div class="detail-info">
        <basic-area>
            <split-panel hide-left>
                <div slot="middle">
                    <div class="detail-info-title">2888号论坛批量增加积分</div>

                </div>
                <div slot="right">right</div>
            </split-panel>
        </basic-area>
    </div>
</template>

<script>
    import splitPanel from "@/components/jst-components/split-panel"
    export default {
        name: "detail-info",
        components: {
            splitPanel
        }
    }
</script>

<style lang="scss" scoped>

</style>