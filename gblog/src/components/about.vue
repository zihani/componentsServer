<template>
    <div class="about">
        <div class="card">
            <!-- 头像/图片 -->
            <div class="imgBx">
                <!-- <img src="./img.jpg" alt=""> -->
            </div>
            <!-- 用户信息 -->
            <div class="content">
                <div class="details">
                    <h2>洗衣龙女 小蓝<br><span>ドラゴンメイド・ラドリー</span></h2>
                    <!-- 用户互动信息 -->
                    <div class="data">
                        <h3>342<br><span>Posts</span></h3>
                        <h3>120k<br><span>Followers</span></h3>
                        <h3>285<br><span>following</span></h3>
                    </div>
                    <!-- 可交互按钮 -->
                    <div class="actionBtn">
                        <button>Follow</button>
                        <button>Message</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'about',
        data(){
          return{
              
          }
        },
        components: {
        },
        methods: {
          getlist(){
          },
        },
        mounted(){
        },
        created() {
        }
    }
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    /* 设置怪异盒子 */
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body{
    display: flex;
    /* （水平）对齐弹性容器内的项目 - 居中对齐 */
    justify-content: center;
    /* 为弹性容器内的项目指定默认对齐方式 - 居中对齐 */
    align-items: center;
    /* 最小高度 - 全屏 */
    min-height: 100vh;
    /* 背景颜色 - 渐变色 */
    background: linear-gradient(45deg,#fbda61,#ff5acd);
}
.card{
    /* 相对定位 */
    position: relative;
    width: 350px;
    height: 190px;
    /* height: 450px; */
    background: #fff;
    /* 设置圆角 */
    border-radius: 20px;
    /* 设置阴影 */
    box-shadow: 0 35px 80px rgba(0,0,0,0.15);
    /* 过渡动画时间 */
    transition: 0.5s;
}
.card:hover{
    /* 鼠标停留后的卡片高度 */
    height: 400px;
}
.imgBx{
    /* 绝对定位 */
    position: absolute;
    /* 设置图片盒子位置 */
    left: 50%;
    top: -30%;
    /* 将图片盒子向左位移原来大小的50% */
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.35);
    overflow: hidden;
    transition: 0.5s;
}
.card:hover .imgBx{
    width: 230px;
    height: 230px;
}
.imgBx img{
    /* position: absolute; */
    /* top: 0;
    left: 0; */
    width: 100%;
    height: 100%;
    /* 设置图片适应容器的方式 - 填充 */
    object-fit: cover;
}
.card .content{
    /* position: absolute; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
}
.card .content .details{
    padding: 40px;
    text-align: center;
    width: 100%;
    transition: 0.5s;
    /* 用户信息向下位移150px */
    transform: translateY(150px);
}
.card:hover .content .details{
    /* 位移回原来的地方 */
    transform: translateY(0px);
}
.card .content .details h2{
    font-size: 1.25em;
    font-weight: 600;
    color: #555;
    line-height: 1.2em;
}
.card .content .details h2 span{
    font-size: 0.75em;
    font-weight: 500;
    opacity: 0.5;
}
.card .content .details .data{
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}
.card .content .details .data h3{
    font-size: 1em;
    color: #555;
    line-height: 1.2em;
    font-weight: 600;
}
.card .content .details .data h3 span{
    font-size: 0.85em;
    font-weight: 400;
    opacity: 0.5;
}
.card .content .details .actionBtn button{
    padding: 10px 30px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1em;
    font-weight: 500;
    background: #ff5f95;
    color: #fff;
    cursor: pointer;
}
.card .content .details .actionBtn button:nth-child(2){
    border: 1px solid #999;
    color: #999;
    background: #fff;
}
</style>
