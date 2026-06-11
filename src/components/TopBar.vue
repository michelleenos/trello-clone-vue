<script setup lang="ts">
import { ref } from 'vue'
import DialogBox from '~/components/DialogBox.vue'
import DialogShade from '~/components/DialogShade.vue'
import { useUserStore } from '~/store/userstore'
import TextEditable from '~/components/TextEditable.vue'

const profileOpen = ref(false)

const user = useUserStore()

const changeUserName = (newName: string) => {
  user.setName(newName)
}

const profileBtn = () => {
  profileOpen.value = !profileOpen.value
}
</script>

<template>
  <div class="z-99 h-14 w-full bg-light-5 bg-op-50 backdrop-blur-2xl" v-bind="$attrs">
    <div class="content-wrap h-full flex items-center justify-between">
      <RouterLink class="inline-flex gap-2 font-medium" to="/">
        <span
          class="inline-block h-5 w-5 self-center rounded bg-gradient-from-brandPink bg-gradient-to-brand bg-gradient-radial bg-gradient-to-bl"></span>
        <span class="inline-block lh-tight">Trello Clone</span>
      </RouterLink>
      <!-- <Button linkTo="/" label="TRELLO CLONE" size="md" shape="rounded" /> -->
      <!-- <router-link to="/" class="topbar-btn"> TRELLO CLONE </router-link> -->

      <button
        class="h-10 w-10 inline-flex items-center justify-center border-1 border-slate-3 rounded-full text-center"
        aria-label="Your Profile"
        @click="profileBtn">
        <div class="i-carbon:person"></div>
      </button>
    </div>
  </div>
  <DialogShade v-if="profileOpen">
    <DialogBox @close="profileOpen = false">
      <template #title>
        <h2>Your Profile</h2>
      </template>
      <div class="p4">
        <div class="text-3.5">Click your name to edit it</div>
        <strong>Name: </strong>
        <TextEditable
          class="inline-block"
          :text="user.name"
          placeholder="Your Name"
          @update-text="changeUserName" />
      </div>
    </DialogBox>
  </DialogShade>
</template>

<style>
.profile-btn {
  @apply rounded-full text-xl p-2;
}

.topbar-inner {
}
</style>
