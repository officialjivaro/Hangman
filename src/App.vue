<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
/* Remove all default margins, make body fill the screen, and hide scrollbars */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* #app is our fluid container, using flex for vertical arrangement */
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f8f8f8;
  color: #333;
}
</style>
