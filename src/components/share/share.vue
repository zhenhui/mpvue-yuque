<template>
  <div class='share-layer' v-bind:class="{'md-show':showShare}">
    <div class="content-warp">
      <div>
        <img :src="src" alt="" class="qr">
        <h1>{{qrTitle}}</h1>
        <p class="tip">截屏后分享二维码</p>
      </div>
    </div>
    <button @click="closeModel">{{closeText}}</button>
  </div>
</template>

<script>
export default{
  props: {
    showShare: {
      type: Boolean,
      default: false
    },
    src:{
      type: String,
      default: 'http://zhenhui.github.io/cr2/img/detail-show-img.png'
    },
    qrTitle: {
      type: String,
      default: '文章标题未配置'
    },
    closeText: {
      type: String,
      default: '完成'
    }
  },
  methods: {
    closeModel() {
      this.$emit("close")
    }
  }
}
</script>

<style lang="less" scoped>
.share-layer {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 300rpx;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 999;
  transition: all .15s ease-out;

  .content-warp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
  }

  h1 {
    text-align: center;
    font-size: 20px;
    margin-top: 40rpx;
  }

  .qr {
    width: 550rpx;
    height: 550rpx;
    background-color: #eee;
  }
}
.md-show {
  opacity: 1;
  top: 0;
  visibility: visible;
}

button {
  margin: 40rpx
}
.md-show {
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}
.tip {
  text-align:center;
  font-size:30rpx;
  color:#999;
  font-weight:200
}
</style>
