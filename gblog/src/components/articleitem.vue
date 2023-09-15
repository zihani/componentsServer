<template>
    <div class="articleitem">
        <div class="content">
            <div class="title">
                <h1>标题</h1>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <h1>标题</h1>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <h1>标题</h1>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <h1>标题</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'articleitem',
    data() {
        return {
        }
    },
    components: {},
    computed: {},
    methods: {},
    mounted() { }
}
</script>
<style scoped>
.articleitem{
    
}
.content{
    /* position: absolute; */
    width: 200px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    align-content:flex-start;
    overflow: hidden;
    border: 2px solid #070707;
    color: #999;
    background: #fff;
    border-radius: 20px;
}
</style>

