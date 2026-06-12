<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import DialogBox from '~/components/DialogBox.vue'
import VBtn from '~/components/VBtn.vue'

const props = defineProps({
  boardId: { type: String, required: true },
})
const boardStore = useBoardStore()
const board = computed(() => boardStore.getBoardById(props.boardId))

const isOpen = ref(false)
const listIdToDelete = ref('')

const deleteList = () => {
  boardStore.deleteListFromBoard(props.boardId, listIdToDelete.value)
  listIdToDelete.value = ''
}
</script>

<template>
  <DialogBox
    v-if="isOpen"
    title="debug"
    class="fixed z-99 min-h-80vh w-60% bg-slate-2"
    @close="isOpen = false">
    <div class="relative h-full bg-slate-4 p-2">
      <div class="debug-border">
        <div><strong>ID: </strong>{{ board.id }}</div>
        <div><strong>name: </strong>{{ board.name }}</div>
        <div><strong>creatorId: </strong>{{ board.creatorId }}</div>
        <div><strong>listOrder: </strong>{{ board.listOrder }}</div>
      </div>

      <details>
        <summary>lists</summary>
        <details v-for="(list, i) in board.lists" :key="i">
          <summary>{{ list.title }} | {{ list.id }}</summary>
          <ul v-if="list.cardIds.length > 0" class="debug-list">
            <li v-for="cardId in list.cardIds" :key="cardId">
              <strong>{{ board.cards[cardId].title }}</strong> | {{ cardId }}
            </li>
          </ul>
          <div v-else class="ml-4">no cards</div>
        </details>
      </details>
      <details>
        <summary>cards</summary>
        <ul class="debug-list">
          <li v-for="card in board.cards" :key="card.id">
            <strong>{{ card.title }}</strong> | {{ card.id }}
          </li>
        </ul>
      </details>

      <div class="debug-border">
        <div>
          <label for="list-id-delete">delete list by id: </label>
          <input id="list-id-delete" v-model="listIdToDelete" type="text" class="mr-2" />
          <VBtn @click="deleteList">delete list</VBtn>
        </div>
      </div>
    </div>
  </DialogBox>

  <button
    class="absolute bottom-3 right-5 z-99 rounded-sm bg-cyan-400 px2 py1 text-4"
    @click="isOpen = !isOpen">
    debug
  </button>
</template>

<style scoped>
.debug-border,
details {
  @apply border-slate-7 border-1 rounded-sm m-3 p-2 bg-slate-2;
}

details {
  @apply m-3 p-0;
}

summary {
  @apply cursor-pointer bg-slate-8 p-1  text-white;
}
.debug-list {
  @apply ml-8 list-disc text-4;
}
</style>
