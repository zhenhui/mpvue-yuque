<template>
  <div style="padding-top:20px">
    <div class="list-nor">
      <div>
        <h2>
          <div class="title-warp"></div>
          {{titleText}}
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      titleText: {
        type: String,
        default: '标题'
      }
    }
  }
</script>

<style scoped>
  .list-nor {
    position: relative;
    display: block;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding-left: 15px;
    height: 44px;
    font-weight: 800;
    line-height: 44px;
    background-color: white;
  }
  .title-warp {
    display:inline-block;
    width:10rpx;
    height:36rpx;
    border-radius:10rpx;
    background-color:#1394F6;
    vertical-align:sub;
    margin-right:10rpx;
    /* margin-bottom:5rpx;margin-bottom:5rpx; */
  }
  .jp {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
    position: absolute;
    top: 18px;
    right: 15px;
  }
</style>
