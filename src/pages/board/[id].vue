<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'
import { useRoute } from 'vue-router'
import BoardLists from '~/components/BoardLists.vue'
import InputForm from '~/components/InputForm.vue'
import BoardTitle from '~/components/BoardTitle.vue'
import BoardList from '~/components/BoardList.vue'
import DebugCards from '~/components/DebugCards.vue'

const route = useRoute()
const id = route.params.id as string
const boardStore = useBoardStore()
const userStore = useUserStore()

const isDraggingList = ref(false)
const isDraggingCard = ref(false)

const board = computed(() => boardStore.getBoardById(id))
const userName = computed(() => userStore.name)
</script>

<template>
  <router-view :boardId="id"></router-view>

  <div class="relative grid grid-cols-[100%] grid-rows-[auto_1fr] max-w-full w-full">
    <div class="content-wrap relative max-w-full w-full">
      <BoardTitle class="mb-8 mt-8" :boardId="id" :userName="userName" :boardTitle="board.name" />
    </div>
    <BoardLists
      v-if="board?.lists"
      :lists="board.lists"
      :listOrder="board.listOrder"
      @drag-list-start="isDraggingList = true"
      @drag-list-end="isDraggingList = false"
      @move-list="
        (posToMoveFrom: string, posToMoveTo: string) =>
          boardStore.moveList(id, +posToMoveFrom, +posToMoveTo)
      ">
      <template #listItem="{ listId, i }">
        <BoardList
          :boardId="id"
          :listId="listId"
          :pos="i"
          :isDraggingCard="isDraggingCard"
          @drag-card-start="isDraggingCard = true"
          @drag-card-end="isDraggingCard = false" />
      </template>
      <template #lastCol>
        <InputForm
          ref="newListForm"
          class="w-69 self-start"
          placeholder="list title"
          :toggleable="true"
          inputId="new-list"
          labelSubmit="create"
          labelCancel="cancel"
          @submit="(newListTitle) => boardStore.addListToBoard(id, newListTitle)">
          <template #toggle>
            <div i-carbon:add class="mr1"></div>
            add list
          </template>
        </InputForm>
      </template>
    </BoardLists>
  </div>
</template>
