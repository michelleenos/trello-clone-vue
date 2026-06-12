<script setup lang="ts">
import FormBtns from '~/components/FormBtns.vue'
import { onMounted, ref, nextTick, useTemplateRef } from 'vue'

export interface Props {
  inputId: string
  labelSubmit?: string
  labelCancel?: string
  inputLabel?: string
  focusOnMount?: boolean
  modelValue?: string
  toggleable?: boolean
  errorMessage?: string | false
  onSubmit: (text: string) => unknown
}

const props = withDefaults(defineProps<Props>(), {
  labelSubmit: 'submit',
  labelCancel: 'cancel',
  inputLabel: '',
  focusOnMount: true,
  modelValue: '',
  toggleable: false,
  errorMessage: false,
})

const input = ref<HTMLInputElement | null>(null)
const inputText = ref('')
const shown = ref(props.toggleable ? false : true)
const toggleBtn = useTemplateRef('toggleBtn')
// const toggleBox = ref<typeof ClickyBox | null>(null)
const error = ref<Error | null>(null)

onMounted(() => {
  if (props.focusOnMount && !props.toggleable) {
    input.value?.focus()
  }
})

const show = () => {
  shown.value = true
  nextTick(() => input.value?.focus())
}

const hide = () => {
  inputText.value = ''
  error.value = null
  shown.value = false
  nextTick(() => toggleBtn.value?.focus())
}

const onCancel = () => {
  emit('cancel')
  if (props.toggleable) {
    hide()
  }
}

const onSubmit = () => {
  if (props.onSubmit) {
    let res = props.onSubmit(inputText.value)
    if (res instanceof Error) {
      error.value = res
      input.value?.focus()
      emit('submitError', res)
    } else {
      emit('submitSuccess', res)
      if (props.toggleable) {
        hide()
      }
    }
  }
}

const emit = defineEmits(['submitSuccess', 'submitError', 'cancel'])
defineExpose({ show, hide })
</script>

<template>
  <div class="">
    <button
      v-if="toggleable && !shown"
      ref="toggleBtn"
      :class="[
        'w-full flex justify-center b-(1 slate-4 dashed) rounded-sm py-1 text-sm  outline-none transition-all',
        'hover:(b-brand bg-brand bg-op10 text-brand shadow-md) focus-visible:(ring ring-4 ring-brand ring-op-20 border-solid border-brand)',
      ]"
      @click="show">
      <slot name="toggle">
        <span class="text-sm">show</span>
      </slot>
    </button>

    <form v-if="(toggleable && shown) || !toggleable" class="" @keyup.escape="onCancel">
      <label class="mb-2 block text-sm" v-if="inputLabel" :for="inputId">{{ inputLabel }}</label>
      <input
        :id="inputId"
        ref="input"
        v-model="inputText"
        type="text"
        class="mb-3 w-full py2 text-sm" />
      <div v-if="error" class="text-error">{{ error.message }}</div>
      <FormBtns
        :labelSubmit="labelSubmit"
        :labelCancel="labelCancel"
        @submit="onSubmit"
        @cancel="onCancel" />
    </form>
  </div>
</template>
>
