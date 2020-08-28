import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'

const keycloakConfig = {
  "url": "http://localhost:8080/auth",
  "realm": "chitchat",
  "clientId": "chitchat-c",
  "onLoad": "login-required"
};

const keyCloak = Keycloak(keycloakConfig);
keyCloak.init({ onLoad: keycloakConfig.onLoad }).then(auth=>{
  if(!auth){
    console.warn("bye")
  }
  else {
    new Vue({
      render: h => h(App , {props:{keyCloak:keyCloak}}),   
    }).$mount('#app')

  }
})


Vue.config.productionTip = false


