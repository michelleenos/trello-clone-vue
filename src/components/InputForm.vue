<script setup lang="ts">
import FormBtns from '~/components/FormBtns.vue'
import ClickyBox from '~/components/ClickyBox.vue'
import { onMounted, ref, nextTick, useTemplateRef } from 'vue'

export interface Props {
  labelSubmit?: string
  labelCancel?: string
  inputId: string
  inputLabel?: string
  focusOnMount?: boolean
  modelValue?: string
  toggleable?: boolean
  errorMessage?: string | false
  onSubmit: (text: string) => any
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
      @click="show"
      ref="toggleBtn"
      class="w-full py-1 text-(ink sm) flex justify-center outline outline-(slate-4 dashed) rounded-sm hover:(bg-(brand-light op-10) shadow-md text-brand-hover outline-brand) transition-all">
      <slot name="toggle">
        <span class="text-sm">show</span>
      </slot>
    </button>

    <form class="" v-if="(toggleable && shown) || !toggleable" @keyup.escape="onCancel">
      <input
        type="text"
        :id="inputId"
        v-model="inputText"
        ref="input"
        class="w-full text-sm mb2 py2" />
      <div class="text-error" v-if="error">{{ error.message }}</div>
      <FormBtns
        :labelSubmit="labelSubmit"
        :labelCancel="labelCancel"
        @submit="onSubmit"
        @cancel="onCancel" />
    </form>
  </div>
</template>
>
