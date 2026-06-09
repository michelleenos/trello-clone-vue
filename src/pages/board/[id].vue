<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'
import { useRoute } from 'vue-router'
import Lists from '~/components/Lists.vue'
import List from '~/components/List.vue'
import PageWrap from '~/components/PageWrap.vue'
import InputForm from '~/components/InputForm.vue'
// import Debug from '~/components/Debug.vue'
import BoardTitle from '~/components/BoardTitle.vue'

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
  <div class="max-w-full relative w-full grid grid-rows-[auto_1fr] grid-cols-[100%]">
    <div class="content-wrap max-w-full relative w-full">
      <BoardTitle class="mb-8 mt-8" :boardId="id" :userName="userName" :boardTitle="board.name" />
    </div>
    <div class="content-wrap max-w-full relative w-full h-full">
      <div class="w-full relative overflow-x-auto h-full">
        <div class="grid grid-flow-col h-full pt-2 gap-x-4">
          <Lists
            v-if="board?.lists"
            :lists="board.lists"
            :listOrder="board.listOrder"
            @dragListStart="isDraggingList = true"
            @dragListEnd="isDraggingList = false"
            @moveList="
              (posToMoveFrom: string, posToMoveTo: string) =>
                boardStore.moveList(id, +posToMoveFrom, +posToMoveTo)
            ">
            <template #listItem="{ listId, i }">
              <List
                :boardId="id"
                :listId="listId"
                :pos="i"
                :isDraggingCard="isDraggingCard"
                @dragCardStart="isDraggingCard = true"
                @dragCardEnd="isDraggingCard = false" />
            </template>
            <template #lastCol>
              <InputForm
                class="self-start w-69"
                ref="newListForm"
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
          </Lists>
        </div>
      </div>
    </div>
  </div>
</template>
