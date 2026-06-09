<script setup lang="ts">
import { computed, ref } from 'vue'

export interface ClickyBoxProps {
  linkTo?: string
  color?: 'dark' | 'light'
  size?: 'lg' | 'sm'
}

const props = withDefaults(defineProps<ClickyBoxProps>(), {
  color: 'dark',
  size: 'lg',
})

const className = computed(() => `clicky-box ${props.color} ${props.size}`)

const el = ref<HTMLButtonElement | HTMLAnchorElement | null>(null)

const focus = () => {
  el.value?.focus()
}

defineExpose({
  el,
  focus,
})
</script>

<template>
  <router-link v-if="linkTo" ref="el" :to="linkTo" :class="className">
    <slot></slot>
  </router-link>
  <button v-else ref="el" :class="className">
    <slot></slot>
  </button>
</template>

<style>
.clicky-box {
  @apply block rounded-xl items-center w-full border-1 border-light-9;
}

.clicky-box.lg {
  @apply min-h-30 items-end;
}

.clicky-box.dark {
  /* @apply bg-slate-9 bg-opacity-90 text-gray-1; */
}

/* .clicky-box.light {
  @apply bg-slate-3 bg-opacity-90;
} */

.clicky-box:hover,
.clicky-box:focus {
  @apply shadow-lg bg-opacity-100;
}
</style>
