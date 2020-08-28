<template>
  <div id="app">
    <chat />
    <br>
    <br>
    <b-button pill  variant="outline-primary"  @click="keyCloak.logout()">logout</b-button>
  </div>
</template>

<script>
import chat from './components/chat'


export default {
  name: 'App',
  props:['keyCloak'],
  components: {
    chat,
    
    
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
