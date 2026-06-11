<script setup lang="ts">
import TextEditable from '~/components/TextEditable.vue'
import DeleteWithConfirm from '~/components/DeleteWithConfirm.vue'
import { useBoardStore } from '~/store/boardstore'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

export interface BoardTitleProps {
  boardId: string
  userName?: string
  boardTitle: string
}

const props = defineProps<BoardTitleProps>()
const boardStore = useBoardStore()
const router = useRouter()

const updateBoardTitle = (newTitle: string) => {
  if (newTitle.length > 0) boardStore.renameBoard(props.boardId, newTitle)
}

const deleteBoard = () => {
  boardStore.deleteBoard(props.boardId)
  nextTick(() => router.push('/'))
}
</script>

<template>
  <div class="board-title-wrap">
    <div class="flex flex-wrap items-baseline justify-between">
      <div class="flex items-baseline">
        <h1 class="mt-5 text-2xl font-500">
          <TextEditable
            :text="boardTitle"
            inputId="board-name"
            class="max-w-500px font-500"
            @update-text="updateBoardTitle" />
        </h1>
        <div v-if="userName" class="text-3.5">created by {{ userName }}</div>
      </div>

      <DeleteWithConfirm
        class="ml-2"
        label="delete board"
        confirmTitle="delete this board"
        confirmBtnText="yes, delete"
        cancelBtnText="no, go back"
        :confirmMessage="`Do you really want to delete the board '${boardTitle}'? All lists & cards on the board will be deleted as well.`"
        @delete="deleteBoard" />
    </div>
  </div>
</template>

<style scoped>
/* .board-title-wrap {
  @apply flex items-end;
} */
</style>
