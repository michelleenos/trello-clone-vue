<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import VBtn from '~/components/VBtn.vue'

export interface Props {
  text: string
  multiline?: boolean
  placeholder?: string
  color?: 'light' | 'dark'
  instructions?: string
}

const props = withDefaults(defineProps<Props>(), {
  multiline: false,
  color: 'light',
})

const isEditing = ref(false)
const input = ref<HTMLInputElement | null>(null)
const cancelButton = ref<HTMLButtonElement | null>(null)

const editedText = ref(props.text)
const editedTextHtml = computed(() => {
  if (props.multiline) {
    return editedText.value.replace(/\n/g, '<br>')
  }
  return editedText.value
})

const emit = defineEmits(['updateText'])

const doUpdateText = () => {
  let text = editedText.value
  emit('updateText', text)
  isEditing.value = false
}

const startEditing = () => {
  isEditing.value = true
  nextTick(() => {
    input.value?.focus()
  })
}

const cancelEditing = () => {
  editedText.value = props.text
  isEditing.value = false
}

const onBlur = (e: FocusEvent) => {
  if (e.relatedTarget === cancelButton.value) return
  emit('updateText', editedText.value)
  isEditing.value = false
}
</script>

<template>
  <div :class="`editable-text-wrap ${color} ${multiline ? 'multi-line' : 'single-line'}`">
    <div v-if="!isEditing" class="editable-text" @click="startEditing">
      <span v-if="text.length > 0" v-html="editedTextHtml" />
      <span v-else-if="placeholder" class="placeholder">{{ placeholder }}</span>
    </div>
    <div v-else @keyup.esc.stop="cancelEditing">
      <div v-if="multiline" class="textarea-wrap grid">
        <span
          class="edited-sizer invisible col-start-1 row-start-1 opacity-0"
          v-html="editedTextHtml" />
        <textarea
          ref="input"
          v-model="editedText"
          v-click-outside="doUpdateText"
          class="editable-edit col-start-1 row-start-1 my-0"
          @blur="onBlur"
          @keydown.enter.exact="doUpdateText" />
      </div>
      <input
        v-else
        ref="input"
        v-model="editedText"
        v-click-outside="doUpdateText"
        type="text"
        class="editable-edit"
        @blur="onBlur"
        @keyup.enter="doUpdateText" />
      <VBtn
        v-if="editedText !== text"
        ref="cancelButton"
        color="flat-dark"
        size="xs"
        class="editable-cancel"
        icon="close"
        label="cancel edit title"
        :showText="false"
        @click="cancelEditing" />
      <div v-if="instructions" class="instructions">{{ instructions }}</div>
    </div>
  </div>
</template>

<style scoped>
.editable-text-wrap {
  @apply relative;
}

.editable-text,
.editable-edit,
.edited-sizer {
  @apply lh-snug! w-full text-size-inherit! relative;
  @apply py1 pr6  border-1 border-solid border-transparent;
}

.editable-text {
  @apply cursor-pointer;
  @apply hover:bg-cyan-8 hover:bg-opacity-10;
}

.multi-line .editable-text,
.multi-line .editable-edit {
  @apply min-h-30;
}

.editable-edit {
  @apply border-slate-4;
}

.editable-edit input {
  @apply w-full;
}

.editable-cancel {
  @apply absolute top-0 right-1 op-50 hover:op-100;
}

.placeholder {
  @apply opacity-50;
}

.instructions {
  @apply text-slate-6 text-3.5;
}
</style>
