<template>
  <div class="app-shell">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-shell {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--theme-background);
}
</style>
