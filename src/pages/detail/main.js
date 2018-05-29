import Vue from 'vue'
import App from './detail'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '百科详情',
    backgroundColor: '#F7F7FA'
  }
}
