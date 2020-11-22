import Vue from 'vue'

import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import {getuser} from '@/utils/auth'
import '@/permission' // permission control
import '@/styles/main.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// });

router.beforeEach((to, from, next) => {
  console.log('[main.js]UserDATA',getuser())
  if (to.matched.some(record => record.meta.requireAuth)) {
    let user = getuser()
    if (user.Token) {
      next()
    } else {
      router.push({ name: "login", params: { msg: "登录失效" } })
    }
  } else {
    next()
  }
})

Object.defineProperty(Vue.prototype, '$http', {
  value: function(requestPromise, successCallback) {
    requestPromise.then(res => {
      console.log("Load:",res)
      if (!res) return
      successCallback && successCallback(res)
    })
  }
})
  
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')