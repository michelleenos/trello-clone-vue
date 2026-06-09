<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
// import { cva } from 'class-variance-authority'

const props = withDefaults(
  defineProps<{
    name: string
    linkTo?: string
    ghost?: boolean
  }>(),
  { ghost: false },
)

const el = useTemplateRef('el')
const focus = () => {
  console.log(el.value)
  el.value.focus()
}

defineExpose({ el, focus })
</script>

<template>
  <Component
    :is="linkTo ? RouterLink : 'button'"
    ref="el"
    :to="linkTo"
    class="grid grid-rows-[1fr_auto] min-h-34 overflow-clip border-(1 slate-3) rounded-xl transition-all hover:(-translate-y-0.5 shadow-md) focus-visible:(outline-brand outline-2)"
    :class="[
      ghost &&
        'border-(style-dashed 2 slate-1) text-ink-2 hover:(text-ink bg-(light op-50) border-slate-4)',
    ]">
    <div v-if="!ghost" class="w-full bg-gradient-(from-slate-4 to-brand-light to-bl)"></div>
    <div
      class="px-5 py-1.5 font-500 self-end text-left"
      :class="[!ghost && 'b-(t-1 slate-3) bg-white']">
      {{ name }}
    </div>
  </Component>
</template>

<style scoped lang="scss"></style>
