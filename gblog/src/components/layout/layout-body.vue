<template>
    <div id="layout-body">
        <router-view></router-view>
        <back-top></back-top>
        <table-pet></table-pet>
    </div>
</template>

<script>
    import backTop from '@/components/back-top'
    import tablePet from '@/components/table-pet'
    export default {
        name: "layout-body",
        data(){
          return{
              minHeight: 600
          }
        },
        components: { backTop ,tablePet},
        
    }
</script>

<style scoped>
#layout-body{
    /* header = 80px */
    min-height: -moz-calc(100vh - 80px);
    min-height: -webkit-calc(100vh - 80px);
    min-height: calc(100vh - 80px);
}
</style>
