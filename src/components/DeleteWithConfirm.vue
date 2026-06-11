<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import DialogShade from './DialogShade.vue'
import DialogBox from './DialogBox.vue'
import Button from './VBtn.vue'
import FormBtns from './FormBtns.vue'

export interface Props {
  label?: string
  showLabel?: boolean
  confirmTitle?: string
  confirmMessage?: string
  confirmBtnText?: string
  cancelBtnText?: string
}

withDefaults(defineProps<Props>(), {
  showLabel: true,
  label: 'Delete',
  confirmTitle: 'Are you sure?',
  confirmMessage: 'Are you sure?',
  confirmBtnText: 'confirm',
  cancelBtnText: 'cancel',
})

const show = ref(false)
const button = ref<typeof Button | null>(null)
const formBtns = ref<typeof FormBtns | null>(null)

const doDeletion = () => {
  emit('delete')
  show.value = false
}

const onCancel = () => {
  show.value = false
  button.value?.focus()
}

const emit = defineEmits(['delete'])

watch(show, (newVal) => {
  if (newVal) {
    nextTick(() => {
      console.log(formBtns.value)
      formBtns.value?.cancelBtn?.focus()
    })
  }
})
</script>

<template>
  <Button
    ref="button"
    :label="label"
    :showText="showLabel"
    size="xs"
    color="flat-dark"
    icon="delete"
    v-bind="$attrs"
    @click="show = true">
  </Button>
  <Teleport to="body">
    <DialogShade v-if="show">
      <DialogBox :title="confirmTitle" class="max-w-60" @close="onCancel">
        <div class="p4">
          <div class="mb-3">{{ confirmMessage }}</div>

          <FormBtns
            ref="formBtns"
            :labelCancel="cancelBtnText"
            :labelSubmit="confirmBtnText"
            @cancel="onCancel"
            @submit="doDeletion" />
        </div>
      </DialogBox>
    </DialogShade>
  </Teleport>
</template>
