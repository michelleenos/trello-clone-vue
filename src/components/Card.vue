<script setup lang="ts">
import { useBoardStore } from '~/store/boardstore'

const { getCardById } = useBoardStore()

const props = defineProps({
  boardId: { type: String, required: true },
  cardId: { type: String, required: true },
})

const card = getCardById(props.boardId, props.cardId)
</script>

<template>
  <router-link
    :to="{ name: 'card', params: { id: boardId, cardId: cardId } }"
    class="block px2 py3 bg-(light-5) hover:(bg-light-2) rounded-sm">
    {{ card.title }}
  </router-link>
</template>
