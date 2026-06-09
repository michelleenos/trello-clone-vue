<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'
import InputForm from '~/components/InputForm.vue'
import Dialog from '~/components/Dialog.vue'
import DialogShade from '~/components/DialogShade.vue'
import { ref, nextTick, useTemplateRef } from 'vue'
import BoardCard from './BoardCard.vue'

const showFormButton = useTemplateRef('showFormButton')
const showNewBoardForm = ref(false)
const focusAfterClose = ref(false)

const userStore = useUserStore()
const boardStore = useBoardStore()

const openForm = () => {
  showNewBoardForm.value = true
}

const closeForm = (focus = true) => {
  showNewBoardForm.value = false
  focusAfterClose.value = focus
}

const onDialogLeave = () => {
  if (focusAfterClose.value) showFormButton.value?.focus()
}

const onCreateBoardSuccess = (newBoardId: string) => {
  closeForm(false)
  nextTick(() => {
    let newBoardEl = document.querySelector(`.clicky-box[href*="board/${newBoardId}"]`)
    if (newBoardEl instanceof HTMLAnchorElement) newBoardEl.focus()
  })
}
</script>

<template>
  <div class="grid gap-x-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
    <BoardCard
      v-for="(board, i) in boardStore.boards"
      :key="`board-link-${i}`"
      :name="board.name"
      :linkTo="`board/${board.id}`">
    </BoardCard>

    <BoardCard @click="openForm" ref="showFormButton" name="Create Board" :ghost="true"></BoardCard>

    <transition name="fade" @after-leave="onDialogLeave">
      <DialogShade v-if="showNewBoardForm">
        <Dialog title="Create Board" :focus-on-mount="false" @close="closeForm">
          <InputForm
            input-label="New Board Title"
            input-id="newname"
            :focus-on-mount="true"
            @submit="(newBoardName) => boardStore.newBoard(userStore.id, newBoardName)"
            @submit-success="onCreateBoardSuccess"
            @cancel="closeForm" />
        </Dialog>
      </DialogShade>
    </transition>
  </div>
</template>
