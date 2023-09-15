<template>
  <div class="FlipClock">
    <Flipper ref="flipperHour1" />
    <Flipper ref="flipperHour2" />
    <!-- <div class="time">:</div> -->
    <Flipper ref="flipperMinute1" />
    <Flipper ref="flipperMinute2" />
    <!-- <span class="time">:</span> -->
    <!-- <div class="time">:</div> -->
    <Flipper ref="flipperSecond1" />
    <Flipper ref="flipperSecond2" />
    <audio ref="audio" :src="audioPath"></audio>
  </div>
</template>

<script>
import Flipper from './Flipper'
export default {
  name: 'FlipClock',
  data() {
    return {
      timer: null,
      flipObjs: [],
      audioPath: require("../../assets/audio/ding_Audio.mp3")
    }
  },
  components: {
    Flipper
  },
  methods: {
    ding(){
      this.$refs["audio"].play();
    },
    initdate(fromDatas){
      let time = fromDatas[0]+fromDatas[1]+":"+fromDatas[2]+fromDatas[3]+":"+fromDatas[4]+fromDatas[5]
      // 从cooik中获取设置时间
      switch(time){
        case '6:00:00':
          this.ding();
          break;
        case '9:00:00':
          this.ding();
          break; 
        case '12:00:00':
          this.ding();
          break; 
        case '15:00:00':
          this.ding();
          break;
        case '18:00:00':
          this.ding();
          break;
        case '21:28:00':
          this.ding();
          break;
        case '00:00:00':
          this.ding();
          break;
      }
       // 如果时间到整点调取音频文件 
      // let date = new Date()
      // let datetime =  date.toLocaleString('zh-CN',{hour12: false}).split(" ")
      // let time = datetime[1]
      // let mdy = datetime[0]
      // mdy = mdy.split('/')
      // let m = parseInt(mdy[0])
      // let d = parseInt(mdy[1])
      // let y = parseInt(mdy[2])
      // let alldate = m + '-'+ d + '-' + y + ' ' + time
      // return {alldate:alldate,time:time}
    },
    // 初始化数字
    init() {
      let now = new Date()
      let nowTimeStr = this.formatDate(new Date(now.getTime()), 'hhiiss')
       for (let i = 0; i < this.flipObjs.length; i++) {
         this.flipObjs[i].setFront(nowTimeStr[i])
       }
    },
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        let now = new Date()
        let nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), 'hhiiss')
        let nextTimeStr = this.formatDate(now, 'hhiiss')
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          this.flipObjs[i].flipDown(
            nowTimeStr[i],
            nextTimeStr[i]
          )
        }
        const fromDatas= this.flipObjs.map(item =>{
          return item.frontTextFromData
        }) 
        this.initdate(fromDatas)
      }, 1000)
    },
    // 正则格式化日期
    formatDate(date, dateFormat) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      // 格式化月、日、时、分、秒
      let o = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          let str = o[k] + ''
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }
      return dateFormat
    },
    // 日期时间补零
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }
  },
  mounted() {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ]
    this.init()
    this.run()
  }
}
</script>

<style>
.time {
  width: 20px;
}
.FlipClock {
    text-align: center;
}
.FlipClock .M-Flipper {
    margin: 0 3px;
}
.FlipClock em {
    display: inline-block;
    line-height: 102px;
    font-style: normal;
    vertical-align: top;
}
</style>
