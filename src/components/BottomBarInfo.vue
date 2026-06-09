<script setup lang="ts">
// import Button from '~/components/Button.vue'
import { ref } from 'vue'
import Dialog from '~/components/Dialog.vue'
import DialogShade from '~/components/DialogShade.vue'
import Button from './Button.vue'

const infoOpen = ref(false)
</script>

<template>
  <div class="bg-light-5 bg-op-30 h-14 flex items-center justify-center" v-bind="$attrs">
    <Button color="flat-dark" @click="infoOpen = true">
      <div class="i-carbon:information mr1"></div>
      about
    </Button>
    <Button
      color="flat-dark"
      linkTo="https://github.com/crankysparrow/trello-clone-vue"
      :externalLink="true">
      <div class="i-carbon:logo-github mr1"></div>
      code
    </Button>
    <Button color="flat-dark" linkTo="https://michelleenos.com" :externalLink="true">
      <div class="i-carbon:development mr1"></div>
      by michelle enos
    </Button>
  </div>

  <DialogShade v-if="infoOpen">
    <Dialog title="hello!" @close="infoOpen = false" class="info-dialog">
      <div class="p4 dialog-content text-3.8">
        <p>This is a clone of the popular project management app Trello built in Vue3.</p>
        <p>
          I built it to familiarize myself with the native HTML drag & drop API, practice
          implementing state management in Vue3/Pinia, and to challenge myself to think about how an
          app like this is conceptualized and designed.
        </p>
        <p>Any data you create will be stored in your browser's localStorage.</p>
        <p>
          Click around the app to add boards, cards, and lists. Cards and lists can be dragged to
          reorder. Many text items are editable on click. You can add your username by clicking the
          user button on the top right of the page. Many of the features of the app are
          keyboard-accessible as well, though this is not yet complete.
        </p>
        <p>
          Learn more or browse the code on
          <a href="https://github.com/crankysparrow/trello-clone-vue">Github</a>. Visit my portfolio
          and check out other projects at
          <a href="https://michelleenos.com" target="_blank">michelleenos.com</a>.
        </p>
      </div>
    </Dialog>
  </DialogShade>
</template>

<style scoped>
.dialog-content p {
  margin-bottom: 1rem;
}

.info-dialog {
  max-width: Min(90%, 600px);
}
</style>
