import Vue from 'vue'
import App from './App.vue'
import '@/plugins/sprite-loader'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
