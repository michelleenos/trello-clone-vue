<script setup lang="ts">
import BoardsGrid from '~/components/BoardsGrid.vue'
</script>

<template>
  <div class="content-wrap max-w-screen-lg mx-a">
    <h1 class="text-2xl font-500 my-10">Your Boards</h1>
    <BoardsGrid />
  </div>
  <!-- <PageWrap title="Your Boards" :rows="true">
    <BoardsGrid />
  </PageWrap> -->
</template>
