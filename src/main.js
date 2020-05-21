import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import VueSimpleAlert from "vue-simple-alert"
import VueTruncateFilter from 'vue-truncate-filter'

Vue.use(VueSimpleAlert);
Vue.use(VueTruncateFilter);

Vue.config.productionTip = false
let app = ''
const config = {
  // your firebase configuration such apikey, domain host, etc.
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if(!app){
     app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});
