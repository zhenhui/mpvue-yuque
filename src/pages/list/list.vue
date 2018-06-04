<template>
  <div class="content-warp">
    <share-layer
      v-bind:showShare="showmd"
      v-on:close='closeLayer'
      :qrTitle='"分享宋小福百科小程序"'
      :src="imgqr"/>
    <div class="head-warp">
      <img :src="imgfu">
    </div>
    <div class="list new-list">
      <div class="list-group" v-for="(commonItem,index) in commonArr" :key="index">
        <jumpto :url='`/pages/detail/main?pageid=`+commonItem.slug' :jumptext='commonItem.title'></jumpto>
      </div>
    </div>
    <div class="list">
      <div class="list-group" v-for="(allItem,index) in allList" :key="index">
        <title v-if="allItem.depth === 1" :titleText ='allItem.title'></title>
        <div v-show="allItem.depth !== 1">
          <jumpto :url='`/pages/detail/main?pageid=`+allItem.slug' :jumptext='allItem.title'></jumpto>
        </div>
      </div>
    </div>


    <!-- 原列表
      <div class="list" v-for="(group,index) in fulist" :key="index">
      <div class="list-group" v-for="(item,indexl) in group" :key="indexl">
        <jumpto :url='`/pages/detail/main?pageid=`+item.params' :jumptext='item.name'></jumpto>
      </div>
    </div> -->
    <button class="btn-show" @click="showQR()">分享宋小福百科</button>
    <p class="v">
      宋小福百科 V1.1
    </p>
  </div>
</template>

<script>
import fly from '@/utils/fly'
import jumpto from '@/components/link/jumpto'
import imgfu from '@/imgs/fu.png'
import imgqr from '@/imgs/qr-miniapp.jpg'
import shareLayer from '@/components/share/share'
import title from '@/components/title'
export default {
  data(){
    return{
      imgqr,
      imgfu,
      commonArr: [],
      allList: [],
      showmd: false
      // fulist: [
      //   [
      //     {
      //       name: '销售流程',
      //       params: 'mfoi37'
      //     }
      //   ],[
      //     {
      //       name: 'Leads规则',
      //       params: 'prwad2'
      //     },{
      //       name: '品类流转',
      //       params: 'qy0eqs'
      //     },{
      //       name: '客户充值归属规则',
      //       params: 'zawso6'
      //     }
      //   ],[
      //     {
      //       name: '审批流程',
      //       params: 'wbghea'
      //     },{
      //       name: '缺货审批',
      //       params: 'ddgxqs'
      //     },{
      //       name: '赔款审批',
      //       params: 'hubkoc'
      //     },
      //     {
      //       name: '关闭订单',
      //       params: 'pto7d2'
      //     },
      //     {
      //       name: '申请余额调整审批',
      //       params: 'rl4bxi'
      //     },{
      //       name: '补发充值红包审批',
      //       params: 'prb4w7'
      //     }
      //   ],[
      //     {
      //       name: '销售用宋小福注册',
      //       params: 'vbmrk9'
      //     },{
      //       name: '库存设置说明',
      //       params: 'hnhquu'
      //     }
      //   ]
      // ],
    }
  },
  components: {
    jumpto,
    shareLayer,
    title
  },
  onShareAppMessage () {},
  mounted () {
    this.getList()
  },
  methods: {
    getList() {
      fly.get('/repos/76893/toc').then((res)=> {
        // 创建对象
        const dataArr = res.data
        // dataArr = dataArr.shift()
        console.log(dataArr)
        var arrNum = 0
        var arrIndex = -1
        // console.log(res.data)
        //通过循环获取常用问题
        for (let i = 0; i < dataArr.length; i += 1) {
          if (dataArr[i].depth > 1){
            // 把已获取的对象注入数组
            this.commonArr.push(dataArr[i])
            // console.log(dataArr[i].title)
          }else{
            this.commonArr
          }
          // 当遇到规则模块则停止
          if (dataArr[i+1].depth === 1) {
            // 获取停止时刻的位置
            arrNum = i
            console.log(arrNum)
            break
          }
        }
        console.log(`常用问题获取到${arrNum}个`)


        //获取其他内容
        for(let i = arrNum + 1; i < dataArr.length; i += 1){
          this.allList.push(dataArr[i])
          // console.log(dataArr[i])
        }
        // this.commonArr = this.commonArr.unshift()
        // for(let i = arrNum + 1; i < dataArr.length; i += 1) {
        //   // console.log(dataArr[i].title)
        //   if(dataArr[i].depth === 1){
        //     arrIndex += 1
        //     // this.norArr.push()
        //     this.catlog.push(dataArr[i])
        //     //定义该目录在整体目录中的位置(从0开始),为目录分拆做准备
        //     this.catlog[arrIndex].location = arrIndex
        //     // console.log(`获取的目录内容为<${this.catlog[arrIndex].title}>`)
        //   }
        // }
        // console.log(this.catlog)
      })
    },
    showQR() {
      this.showmd = true
      // fly.post('https://api.weixin.qq.com/wxa/getwxacode?access_token=10_Fe23T0mI5y4TOzkAwPjt55EmyHMMscs8p4p4NM-_c2mlhCT3E9xO0LmwVWBHhjJWqvDy73z_Sn34DQzggI50LRuYaeZfgow-fFFIyqlIth1C-m4yL6b4Kk6W_p0zOlkRIkBj_ZR1ojgQb1HnVSWaAGAZWA', {
      //   path: this.thisPage,
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      // console.log(`${this.switchShow} 和 ${Math.random()}`)
    },
    closeLayer() {
      this.showmd = false
    }
  }
  // created: function() {
  //   fly.get('/api/v2/repos/76893/toc').then((res)=> {
  //     // 创建对象
  //     const dataArr = res.data.data
  //     //通过循环获取常用问题
  //     for (let i = 0; i < dataArr.length; i += 1) {
  //       // 当遇到规则模块则停止
  //       if (dataArr[i].title === '规则') {
  //         break
  //       }
  //       // 把已获取的对象注入数组
  //       this.commonArr.push(dataArr[i])
  //     }
  //   })
  // },
}
</script>

<style lang="less" scoped>
.content-warp {
  padding-bottom: 40rpx;
}

.head-warp {
  background-color: white;
  height: 280rpx;
  text-align: center;
  padding-top: 1em;

  h1 {
    text-align: center;
    line-height: 280rpx;
  }

  img {
    width: 100px;
    height: 100px;
  }
}

.new-list {
  border-top: 1px solid #eee;
}

.btn-show {
  margin: 40rpx;
  margin-top: 40rpx;
  background-color: white;
  color: #1394F6
}
.v {
  text-align: center;
  font-size: 24rpx;
  color: #ccc;
}
</style>

