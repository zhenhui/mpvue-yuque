<template>
  <div>
    <navigator :url="'/pages/detail/main?pageid='+params" class="list-nor">{{jumptext}}
      <div class="jp"></div>
    </navigator>
  </div>
</template>
<script>
  export default {
    props: {
      params: {
        type: String,
        default: 'params'
      },
      jumptext: {
        type: String,
        default: '标题'
      }
    }
  }
</script>
<style>
  .list-nor {
    position: relative;
    display: block;
    border-bottom: 1px solid #eee;
    padding-left: 15px;
    height: 44px;
    line-height: 44px;
    background-color: white;
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
