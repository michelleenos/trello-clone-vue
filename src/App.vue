<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import BottomBarInfo from './components/BottomBarInfo.vue'
</script>

<template>
  <div
    class="h-screen max-h-screen max-w-full relative grid grid-rows-[auto_1fr_auto] grid-cols-[100%]">
    <TopBar></TopBar>
    <div class="bg z--1 absolute w-full h-full top-0 left-0"></div>
    <RouterView></RouterView>
    <BottomBarInfo />
  </div>
</template>

<style scoped>
.bg {
  background-image: radial-gradient(
    at 100% 100%,
    hsla(from var(--brand) h s l / 0.5),
    #ededed 100%
  );
}
</style>
