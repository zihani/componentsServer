<template>
    <div  class="table-pet"  v-show="show" @click.stop="tag">
        <div>
            <i class="nes-mario" style="margin-top: 90px;"></i>
            <div v-if="dialogueshow" style="position: fixed;float: right;" class="nes-balloon from-left">
                <p>{{dialogue}} </p>
            </div>
        </div>
        <!-- <span>{{newdate}}</span>  -->
        <FlipClock></FlipClock>
    </div>
</template>
<script>
    import FlipClock from './FlipClock/FlipClock.vue'
    import anime from 'animejs'
    export default {
        name: "table-pet",
        components: {
            FlipClock
        },
        data() {
            return{
                show: false,
                dialogue:"hell",
                dialogueshow:false,
                newdate:""
            }
        },
        methods: {
            newdatetime(){
             
                // let date = new Date()
                // let datetime =  date.toLocaleString('zh-CN',{hour12: false}).split(" ")
                // let time = datetime[1]
                // let mdy = datetime[0]
                // mdy = mdy.split('/')
                // let m = parseInt(mdy[0])
                // let d = parseInt(mdy[1])
                // let y = parseInt(mdy[2])
                // this.newdate = m + '-'+ d + '-' + y + ' ' + time
            },
            listAnimate(bool){
                if(bool === true){
                    anime(
                        {
                            targets:'.table-pet',
                            translateY:150,
                            delay: anime.stagger(100)
                        }
                    )
                }
                if(bool === false){
                    anime(
                        {
                            targets:'.table-pet',
                            translateY:0,
                            // rotate: anime.stagger([-260, 360]),
                        }
                    )
                }
                // anime.reverse();
            },
            scroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop > 150) {
                    this.show = true
                    this.listAnimate(this.show)
                } else {
                    this.show = false
                    this.listAnimate(this.show)
                }
            },
            tag() {
                this.dialogueshow = !this.dialogueshow 
                // let timer = setInterval(() => {
                //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                //     let speed = Math.ceil(scrollTop / 5)
                //     document.documentElement.scrollTop = scrollTop - speed
                //     if (scrollTop === 0) {
                //         clearInterval(timer)
                //     }
                // }, 20)
            }
        },
        mounted () {
        
            this.newdatetime()
            window.addEventListener('scroll', this.scroll)
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.scroll)
        }
    }
</script>
<style scoped lang="less">
.table-pet {
    position: fixed;
    width: 220px;
    height: 300px;
    left: 1rem;
    bottom: 8rem;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
    text-align: center;
    z-index: 99;
    img{
        width: 60px;
        height: 60px;
    }
    .img2{
        display: none;
    }
    &:hover img.img1{
        display: none;
    }
    &:hover img.img2{
        display: unset;
    }
}
@media (max-width: 600px){
    .back-top{
        display: none;
    }
}
</style>