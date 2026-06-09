<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '~/components/Dialog.vue'
import DialogShade from '~/components/DialogShade.vue'
import { useUserStore } from '~/store/userstore'
import TextEditable from '~/components/TextEditable.vue'
import Button from '~/components/Button.vue'

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
  <div class="w-full bg-light-5 bg-op-50 backdrop-blur-2xl z-99 h-14" v-bind="$attrs">
    <div class="content-wrap flex items-center justify-between h-full">
      <RouterLink class="font-medium inline-flex gap-2" to="/">
        <span
          class="inline-block bg-gradient-from-brandPink bg-gradient-to-brand w-5 h-5 bg-gradient-radial bg-gradient-to-bl rounded self-center"></span>
        <span class="inline-block lh-tight">Trello Clone</span>
      </RouterLink>
      <!-- <Button linkTo="/" label="TRELLO CLONE" size="md" shape="rounded" /> -->
      <!-- <router-link to="/" class="topbar-btn"> TRELLO CLONE </router-link> -->

      <button
        class="border-slate-3 w-10 h-10 border-1 rounded-full text-center inline-flex items-center justify-center"
        aria-label="Your Profile"
        @click="profileBtn">
        <div class="i-carbon:person"></div>
      </button>
    </div>
  </div>
  <DialogShade v-if="profileOpen">
    <Dialog @close="profileOpen = false">
      <template #title>
        <h2>Your Profile</h2>
      </template>
      <div class="p4">
        <div class="text-3.5">Click your name to edit it</div>
        <strong>Name: </strong>
        <TextEditable
          class="inline-block"
          :text="user.name"
          @updateText="changeUserName"
          placeholder="Your Name" />
      </div>
    </Dialog>
  </DialogShade>
</template>

<style>
.profile-btn {
  @apply rounded-full text-xl p-2;
}

.topbar-inner {
}
</style>
