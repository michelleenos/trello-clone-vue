<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Button from './VBtn.vue'

defineEmits(['close'])

export interface Props {
  title?: string
  fixed?: boolean
  focusOnMount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  fixed: false,
  focusOnMount: true,
})

const el = ref<HTMLElement | null>(null)

// hacky focus trap
const focusInEvent = (e: FocusEvent) => {
  if (el.value && !el.value.contains(e.target as Node)) {
    el.value.focus()
  }
}

onMounted(() => {
  if (props.focusOnMount) {
    el.value?.focus()
  }

  document.body.addEventListener('focusin', focusInEvent)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('focusin', focusInEvent)
})
</script>

<template>
  <div
    ref="el"
    v-click-outside="() => $emit('close')"
    class="grid grid-rows-[min-content_1fr] max-h-[90vh] min-w-sm overflow-hidden rounded-md bg-light-2 shadow-lg relative"
    tabIndex="-1"
    @keyup.esc="() => $emit('close')">
    <Button
      icon="close"
      class="absolute right-1 top-1 z-99"
      color="flat-dark"
      label="Close Dialog"
      :showText="false"
      size="sm"
      shape="circle"
      @click="$emit('close')" />
    <div class="border-(b-1 coolgray-2) bg-(coolgray-1) p-4">
      <slot name="title">
        <h2 v-if="title" class="text-lg font-600">{{ title }}</h2>
      </slot>
    </div>
    <div class="h-full overflow-auto">
      <slot></slot>
    </div>
  </div>
</template>
