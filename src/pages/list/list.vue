<template>
  <div class="content-warp">
    <div class="head-warp">
      <img :src="imgfu">
    </div>
    <div class="list" v-for="(group,index) in fulist" :key="index">
      <div class="list-group" v-for="(item,indexl) in group" :key="indexl">
        <jumpto :params='item.params' :jumptext='item.name'></jumpto>
      </div>
    </div>
  </div>
</template>

<script>
import jumpto from '@/components/link/jumpto'
import imgfu from '@/imgs/fu.png'
export default {
  data(){
    return{
      imgfu,
      fulist: [
        [
          {
            name: '销售流程',
            params: 'mfoi37'
          }
        ],[
          {
            name: 'Leads规则',
            params: 'prwad2'
          },{
            name: '品类流转',
            params: 'qy0eqs'
          },{
            name: '客户充值归属规则',
            params: 'zawso6'
          }
        ],[
          {
            name: '审批流程',
            params: 'wbghea'
          },{
            name: '缺货审批',
            params: 'ddgxqs'
          },{
            name: '赔款审批',
            params: 'hubkoc'
          },
          {
            name: '关闭订单',
            params: 'pto7d2'
          },
          {
            name: '申请余额调整审批',
            params: 'rl4bxi'
          },{
            name: '补发充值红包审批',
            params: 'prb4w7'
          }
        ],[
          {
            name: '销售用宋小福注册',
            params: 'vbmrk9'
          },{
            name: '库存设置说明',
            params: 'hnhquu'
          }
        ]
      ]
    }
  },
  components: {
    jumpto
  }
}
</script>

<style lang="less" scoped>
.content-warp {
  margin-bottom: 4em;
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

.list {
  margin-bottom: 1em
}

.list-group:first-child {
  border-top: 1px solid #eee;
}
</style>

