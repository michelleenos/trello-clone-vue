<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import Card from '~/components/Card.vue'
import TextEditable from '~/components/TextEditable.vue'
import InputForm from '~/components/InputForm.vue'
import DeleteWithConfirm from '~/components/DeleteWithConfirm.vue'

const {
  deleteListFromBoard,
  moveCardWithinList,
  moveCardBetweenLists,
  renameList,
  addCardToBoard,
  getListById,
} = useBoardStore()

export interface Props {
  listId: string
  boardId: string
  pos: number
  isDraggingCard: boolean
}

// TODO: drag a card over another list - card doesn't get outline style

const props = defineProps<Props>()

const list = computed(() => getListById(props.boardId, props.listId))

const emit = defineEmits(['dragCardStart', 'dragCardEnd'])
// const isDragging = ref(false)
const draggingId = ref('')

const updateTitle = (newTitle: string) => {
  renameList(props.boardId, props.listId, newTitle)
}

const deleteList = () => {
  deleteListFromBoard(props.boardId, props.listId)
}

function dragOver(e: DragEvent) {
  e.preventDefault()
  if (props.isDraggingCard && e.currentTarget instanceof HTMLElement) {
    e.currentTarget.classList.add('drag-card-over')
  }
}

function dragStart(e: DragEvent) {
  let target = e.target
  if (!(target instanceof HTMLElement) || !target.classList.contains('card-item')) return

  // isDragging.value = true
  emit('dragCardStart')
  draggingId.value = target.id
  e.dataTransfer?.setData('text/plain', target.id)
}

function dragEnd() {
  // isDragging.value = false
  emit('dragCardEnd')
}

function dragLeave(e: DragEvent) {
  if (props.isDraggingCard && e.currentTarget instanceof HTMLElement) {
    e.currentTarget.classList.remove('drag-card-over')
  }
}

function drop(e: DragEvent) {
  // console.log('card drop', e)

  let target = e.currentTarget
  if (!(target instanceof HTMLElement)) return

  const id = e.dataTransfer?.getData('text/plain')
  if (!id) return

  const el = document.getElementById(id)
  if (!el || !el.classList.contains('card-item')) return
  target.classList.remove('drag-card-over')

  const listId = el.dataset['listid']
  const posToMoveFrom = el.dataset['pos']
  const posToMoveTo = target.dataset['pos']

  if (!listId || !posToMoveFrom || !posToMoveTo) return

  if (listId !== props.listId) {
    moveCardBetweenLists(props.boardId, listId, props.listId, +posToMoveFrom, +posToMoveTo)
    // console.log('moved card bw lists')
  } else {
    moveCardWithinList(props.boardId, props.listId, +posToMoveFrom, +posToMoveTo)
    // console.log('moved card within lists')
  }
}
</script>

<template>
  <div class="list" v-if="list">
    <div class="text-md font-500 flex justify-between items-center;">
      <TextEditable
        :text="list.title"
        @updateText="updateTitle"
        @dragover="dragOver"
        @drop="drop"
        class="my-1"
        :data-pos="0" />

      <DeleteWithConfirm
        label="delete list"
        @delete="deleteList"
        confirmTitle="delete this list"
        confirmBtnText="yes, delete"
        cancelBtnText="no, go back"
        :showLabel="false"
        :confirmMessage="`Do you really want to delete the list '${list.title}'? All cards on the list will be deleted as well.`" />
    </div>

    <div class="relative p-2 z-2 bg-(light-1 op-50) backdrop-blur-xl border-(1 slate-2) rounded-sm">
      <div
        v-for="(cardId, i) in list.cardIds"
        class="card-outer"
        :data-pos="i"
        :key="cardId"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="drop">
        <Card
          class="card-item mb-2"
          :cardId="cardId"
          :boardId="list.boardId"
          :id="`card-${cardId}`"
          :data-pos="i"
          :data-listId="list.id"
          draggable="true"
          @dragstart="dragStart"
          @dragend="dragEnd" />
      </div>

      <InputForm
        inputId="newcardform"
        :toggleable="true"
        placeholder="card title"
        labelSubmit="create"
        labelCancel="cancel"
        :data-pos="list.cardIds.length"
        @dragover="dragOver"
        @drop="drop"
        @submit="(newCardName) => addCardToBoard(list.boardId, list.id, newCardName)">
        <template #toggle>
          <span class="mr1 i-carbon:add text-lg"></span>
          <span>add card</span>
        </template>
      </InputForm>
    </div>
  </div>
</template>

<style scoped lang="css">
.card-outer.drag-card-over .card-item {
  @apply outline outline-(dashed brand 2);
}
</style>
