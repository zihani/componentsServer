<template>
    <div class="articleshome">
        <div class="site-content animate">
            <main class="site-main" >
                <!-- <about></about> -->
                <articleitem> </articleitem>
            </main>
        </div>
    </div>
</template>

<script>
import about from '@/components/about'
import articleitem from '@/components/articleitem'

export default {
    name: 'articleshome',
    data() {
        return {
        }
    },
    components: {
        articleitem
    },
    computed: {},
    methods: {},
    mounted() { }
}
</script>
<style scoped>
    .content{
        /* position: absolute; */
        width: 200px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        overflow: hidden;
        border: 2px solid #070707;
        color: #999;
        background: #fff;
    }
    .site-main {
        padding-top: 80px;
    }
    .more{
        margin: 50px 0;
     
    }
    /******/
    @media (max-width: 800px) {
        .site-main {
            padding-top: 40px;
        }
    }
</style>

