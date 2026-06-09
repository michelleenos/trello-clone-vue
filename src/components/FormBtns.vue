<script setup lang="ts">
import Button from '~/components/Button.vue'
import { ref } from 'vue'

defineProps({
  labelSubmit: { type: String, default: 'submit' },
  labelCancel: { type: String, default: 'cancel' },
})

const cancelBtn = ref<typeof Button | null>(null)
const submitBtn = ref<typeof Button | null>(null)
const emit = defineEmits(['submit', 'cancel'])
defineExpose({ cancelBtn, submitBtn })

const cancelSubmit = () => {
  emit('cancel')
}
</script>

<template>
  <div class="form-btns">
    <Button
      type="button"
      @click="cancelSubmit"
      color="flat-dark"
      class="mr2"
      size="sm"
      ref="cancelBtn"
      :label="labelCancel" />
    <Button
      @click.prevent="$emit('submit')"
      color="primary"
      :label="labelSubmit"
      size="sm"
      ref="submitBtn"
      type="submit" />
  </div>
</template>

<style scoped>
.form-btns {
  @apply py-0 text-right;
}
</style>
