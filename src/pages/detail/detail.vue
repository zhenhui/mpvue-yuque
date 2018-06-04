<template>
  <div class='content-warp'>
    <share-layer
      v-bind:showShare="showmd"
      v-on:close='closeLayer'
      :qrTitle="shareTitle"
      :src="shareURL"/>
    <h1>{{title}}</h1>
    <div class="article-warp">
      <wxParse
        :content="article"
        noData="加载中"
      />
    </div>
    <div class="author">
      <p>创建: {{user_name}}</p>
      <p>更新于: {{time.year}}年{{time.month}}月{{time.day}}日</p>
    </div>
    <div class="show-warp">
      <div class="share-btn" @click="showQR()">
        <div class="ico-share"></div>
        分享本文
      </div>
      <div @click="open">...</div>
      <!-- <navigator class="share-btn" url='/pages/list/main'>...</navigator> -->
    </div>
  </div>
</template>

<script>
import fly from '@/utils/fly'
import wxParse from 'mpvue-wxparse'
import wxp from 'minapp-api-promise'
import shareLayer from '@/components/share/share'

export default {
  data () {
    return {
      page: '',
      title: '',
      article: '',
      user_id: Number,
      user_name: '',
      update_time: '',
      time: {
        year:'',
        month: '',
        day: ''
      },
      thisPage: '',
      showmd: false,
      shareTitle: '',
      shareURL: ''
    }
  },
  onShareAppMessage () {},
  mounted: function() {
    this.call()
  },

  components: {
    wxParse,
    shareLayer
  },

  async onLoad(){
    console.log(this.$root)
    const {
      pageid
    } = this.$root.$mp.query;
    console.log(pageid)
    wx.showLoading({
      title: '加载中',
    })
    this.page = pageid
    this.thisPage = `/pages/detail/main?pageid=${pageid}`
    console.log(this.thisPage)
    this.shareURL = `http://zhenhui.github.io/qryuque/${pageid}.jpg`
  },

  methods: {
    call(){
      fly.get('/repos/pdk/sxf/docs/'+this.page).then((res)=>{
        // console.log(`开始查找文章`)
        console.log(res)
        // console.log(res.data.user_id)
        this.article = res.data.body_html
        this.title = res.data.title
        this.user_id = res.data.user_id
        this.update_time = res.data.updated_at
        this.getuser()
        this.getTime()
        // 建立分享标题
        this.shareTitle = res.data.title
        console.log(this.shareURL)
      }).catch((error)=>{
        console.log(`获取失败`)
        this.title = '获取文章失败'
        this.article = '由于一些神秘原因,无法获取文章'
          if (error.response) {
        } else if (error.request) {
        } else {
          this.feedback = `获取错误${error.message}`
        }
      })
      wx.hideLoading()
    },
    getuser() {
      console.log('开始查找作者')
      fly.get(`/users/${this.user_id}`).then((res)=>{
        console.log(res)
        this.user_name = res.data.name
      })
    },
    getTime() {
      const myDate = new Date(this.update_time)

      this.time.year = myDate.getFullYear()
      this.time.month = myDate.getMonth() + 1
      this.time.day = myDate.getDate()
    },
    showQR() {
      this.showmd = true
    },
    closeLayer() {
      this.showmd = false
    },
    open() {
      wx.showActionSheet({
        itemList: ['返回首页'],
        success: function (res) {
          if(res.tapIndex==0){
            wx.navigateTo({
              url: '/pages/list/main'
            })
            console.log('点了A')
          }
          console.log(res.tapIndex)
        }
      })
    }
  },

  created () {
  }
}
</script>

<style lang="less" scoped>
.author {
  padding: 1em;
  p {
    text-align: right;
    color: #999;
    font-size: 13px;
  }
}
h1 {
  text-align: center;
  font-size: 30px;
  color: #333;
}

.content-warp {
  // padding-top: 2em;
  background-color: white;
  // padding-bottom: 1em;
  padding: 2em 1em 5em;
}

.article-warp{
  margin-top: 4em;
  padding: 0
}
.show-warp {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100rpx;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10rpx 40rpx;
  box-shadow:0px 0px 20px rgba(0,0,0,0.2);
  align-items:center;
  box-sizing:border-box;

  .share-btn {
    flex-wrap: nowrap;
    display:flex;
    align-items:center;
  }
  .ico-share {
    height: 45rpx;
    width: 42rpx;
    margin-right: 20rpx;
    background-image: url("data:image/svg+xml,%3Csvg width='455' height='482' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M368.6 309.4c-27.7 0-52.4 13.2-68.2 33.6l-132.3-73.9c3.1-8.9 4.8-18.5 4.8-28.4 0-10-1.7-19.5-4.9-28.5l132.2-73.8c15.7 20.5 40.5 33.8 68.3 33.8 47.4 0 86.1-38.6 86.1-86.1C454.6 38.6 416 0 368.5 0c-47.5 0-86.1 38.6-86.1 86.1 0 10 1.7 19.6 4.9 28.5l-132.1 73.8c-15.7-20.6-40.5-33.8-68.3-33.8-47.4 0-86.1 38.6-86.1 86.1 0 47.5 38.7 86.1 86.2 86.1 27.8 0 52.6-13.3 68.4-33.9l132.2 73.9c-3.2 9-5 18.7-5 28.7 0 47.4 38.6 86.1 86.1 86.1 47.5 0 86.1-38.6 86.1-86.1 0-47.5-38.7-86.1-86.2-86.1zm0-282.3c32.6 0 59.1 26.5 59.1 59.1s-26.5 59.1-59.1 59.1-59.1-26.5-59.1-59.1 26.6-59.1 59.1-59.1zM87 299.8c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.6 59.1-59.1 59.1zm281.6 154.7c-32.6 0-59.1-26.5-59.1-59.1s26.5-59.1 59.1-59.1 59.1 26.5 59.1 59.1-26.5 59.1-59.1 59.1z' fill='%23021D33' fill-rule='nonzero' fill-opacity='.7'/%3E%3C/svg%3E");
    background-size: cover;
  }
}
</style>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
