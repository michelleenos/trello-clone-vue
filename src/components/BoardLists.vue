<script setup lang="ts">
import { ref } from 'vue'
import { type List } from '~/store/boardstore'

const isDragging = ref(false)

export interface props {
  lists: Record<string, List>
  listOrder: string[]
}
defineProps<props>()

const emit = defineEmits(['moveList', 'dragListStart', 'dragListEnd'])
defineExpose({ isDragging })

function dragOver(e: DragEvent) {
  if (isDragging.value) {
    e.preventDefault()
    let target = e.currentTarget
    if (target instanceof HTMLElement) {
      target.classList.add('drag-over')
    }
  }
}

function dragStart(e: DragEvent) {
  let target = e.target
  if (!(target instanceof HTMLElement) || !target.classList.contains('list-inner')) return

  target.parentElement?.classList.add('dragging-list')
  isDragging.value = true

  e.dataTransfer?.setData('text/plain', target.id)
  emit('dragListStart')
}

function dragEnd(e: DragEvent) {
  isDragging.value = false
  const target = e.target
  if (target instanceof HTMLElement) {
    target.parentElement?.classList.remove('dragging-list')
  }
  emit('dragListEnd')
}

function dragLeave(e: DragEvent) {
  console.log('dragLeave')
  if (isDragging.value) {
    let target = e.currentTarget
    if (target instanceof HTMLElement) {
      target.classList.remove('drag-over')
    }
  }
}

function drop(e: DragEvent) {
  if (!isDragging.value) return

  let target = e.currentTarget
  if (!(target instanceof HTMLElement)) return

  const id = e.dataTransfer?.getData('text/plain')
  if (!id) return

  const el = document.getElementById(id)
  if (!el || !el.classList.contains('list-inner')) return

  el.parentElement?.classList.remove('dragging-list')
  target.classList.remove('drag-over')

  const posToMoveTo = target.dataset['pos']
  const posToMoveFrom = el.dataset['pos']
  if (posToMoveTo && posToMoveFrom) {
    emit('moveList', posToMoveFrom, posToMoveTo)
  }
}
</script>

<template>
  <div class="content-wrap relative h-full max-h-full w-full overflow-x-auto">
    <div class="grid grid-flow-col h-full max-h-full justify-start gap-x-4 py-2">
      <div
        v-for="(id, i) in listOrder"
        :key="id"
        class="relative mx-a w-72 rounded-md bg-(light1 op20) hover:bg-op10"
        :data-pos="i"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="drop">
        <div
          :id="`list-${id}`"
          class="list-inner h-full cursor-grab px2"
          draggable="true"
          :data-pos="i"
          @dragstart="dragStart"
          @dragend="dragEnd">
          <slot name="listItem" :listId="id" :i="i"></slot>
        </div>
      </div>
      <slot name="lastCol"></slot>
    </div>
  </div>
</template>

<style scoped>
.dragging-list {
  @apply shadow-sm bg-(light-8 op-20);
}
.drag-over {
  /* outline: 3px dashed green; */
  @apply outline-brand outline-dashed outline-3 bg-brand-light bg-opacity-50;
}
</style>
