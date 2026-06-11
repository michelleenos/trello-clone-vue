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
    class="grid grid-rows-[min-content_1fr] max-h-[90vh] min-w-sm bg-white"
    tabIndex="-1"
    @keyup.esc="() => $emit('close')">
    <Button
      icon="close"
      class="absolute right-1 top-1 text-white"
      color="flat-light"
      label="Close Dialog"
      :showText="false"
      size="sm"
      shape="circle"
      @click="$emit('close')" />
    <div class="mb0 border-b-1 bg-(slate-9 op90) p4 text-gray-1">
      <slot name="title">
        <h2 v-if="title">{{ title }}</h2>
      </slot>
    </div>
    <div class="h-full overflow-auto">
      <slot></slot>
    </div>
  </div>
</template>
