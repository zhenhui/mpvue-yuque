<template>
  <div class='content-warp'>
    <h1>{{title}}</h1>
    <div class="article-warp">
      <wxParse :content="article"/>
    </div>
    <div class="author">
      <p>创建: {{user_name}}</p>
      <p>更新于: {{time.year}}年{{time.month}}月{{time.day}}日</p>
    </div>
  </div>
</template>

<script>
import fly from '@/utils/fly'
import wxParse from 'mpvue-wxparse'
import wxp from 'minapp-api-promise'

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
      }
    }
  },
  mounted: function() {
    this.call()
  },

  components: {
    wxParse
  },

  async onLoad(){
    const {
      pageid
    } = this.$root.$mp.query;
    console.log(pageid)
    wx.showLoading({
      title: '加载中',
    })
    this.page = pageid
  },

  methods: {
    call(){
      fly.get('/repos/pdk/sxf/docs/'+this.page).then((res)=>{
        console.log(`开始查找文章`)
        console.log(res.data)
        console.log(res.data.user_id)
        this.article = res.data.body_html
        this.title = res.data.title
        this.user_id = res.data.user_id
        this.update_time = res.data.updated_at
        this.getuser()
        this.getTime()
      }).catch((error)=>{
        console.log(`获取失败`)
          if (error.response) {
        } else if (error.request) {
        } else {
          this.feedback = `获取错误${error.message}`
        }
      })
      wx.hideLoading()
    },
    getuser(){
      console.log('开始查找作者')
      fly.get(`/users/${this.user_id}`).then((res)=>{
        console.log(res)
        this.user_name = res.data.name
      })
    },
    getTime(){
      const myDate = new Date(this.update_time)

      this.time.year = myDate.getFullYear()
      this.time.month = myDate.getMonth() + 1
      this.time.day = myDate.getDate()
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
  padding-top: 2em;
  background-color: white;
  padding-bottom: 1em;
}

.article-warp{
  margin-top: 4em;
  padding: 0 1em
}

</style>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
