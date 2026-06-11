<script setup lang="ts">
import VBtn from '~/components/VBtn.vue'
import { ref } from 'vue'

defineProps({
  labelSubmit: { type: String, default: 'submit' },
  labelCancel: { type: String, default: 'cancel' },
})

const cancelBtn = ref<typeof VBtn | null>(null)
const submitBtn = ref<typeof VBtn | null>(null)
const emit = defineEmits(['submit', 'cancel'])
defineExpose({ cancelBtn, submitBtn })

const cancelSubmit = () => {
  emit('cancel')
}
</script>

<template>
  <div class="form-btns">
    <VBtn
      ref="cancelBtn"
      type="button"
      color="flat-dark"
      class="mr2"
      size="sm"
      :label="labelCancel"
      @click="cancelSubmit" />
    <VBtn
      ref="submitBtn"
      color="primary"
      :label="labelSubmit"
      size="sm"
      type="submit"
      @click.prevent="$emit('submit')" />
  </div>
</template>

<style scoped>
.form-btns {
  @apply py-0 text-right;
}
</style>
