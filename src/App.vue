<template>
  <div id="app" class="pt-5">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  background: #f8f8f8;
  height: 100vh;
  /* margin-top: 60px; */
}
</style>
