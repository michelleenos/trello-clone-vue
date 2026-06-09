<script setup lang="ts">
import { computed, ref, h } from 'vue'
import { RouterLink } from 'vue-router'

export interface Props {
  color?: 'primary' | 'subdued' | 'error' | 'flat-light' | 'flat-dark' | 'none'
  shape?: 'circle' | 'rect' | 'rounded'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: 'close' | 'delete'
  showText?: boolean
  label?: string
  linkTo?: string
  externalLink?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  showText: true,
  size: 'md',
  shape: 'rect',
})

const el = ref<HTMLButtonElement | null>(null)

const focus = () => {
  el.value?.focus()
}

defineExpose({ focus })

const className = computed(
  () => `btn btn-style-${props.color} btn-size-${props.size} btn-shape-${props.shape}`,
)
const ariaLabel = computed(() => props.label ?? undefined)

const iconName = props.icon === 'delete' ? 'trash-can' : props.icon
const iconNode = props.icon ? h('div', { class: `i-carbon:${iconName}` }) : false
</script>

<template>
  <a v-if="linkTo && externalLink" :href="linkTo" target="_blank" ref="el" :class="className">
    <slot>
      <iconNode v-if="iconNode" />
      <div v-if="label && showText && iconNode" class="btn-spacer"></div>
      <div v-if="label && showText" class="btn-label">{{ label }}</div>
    </slot>
  </a>
  <router-link v-else-if="linkTo" :to="linkTo" :class="className">
    <slot>
      <iconNode v-if="iconNode" />
      <div v-if="label && showText && iconNode" class="btn-spacer"></div>
      <div v-if="label && showText" class="btn-label">{{ label }}</div>
    </slot>
  </router-link>
  <button v-else :class="className" :aria-label="ariaLabel ?? ''" ref="el">
    <slot>
      <iconNode v-if="iconNode" />
      <div v-if="label && showText && iconNode" class="btn-spacer"></div>
      <div v-if="label && showText" class="btn-label">{{ label }}</div>
    </slot>
  </button>
</template>

<style scoped>
.btn {
  @apply cursor-pointer inline-flex items-center;
}

.btn-spacer {
  @apply w-1;
}

.btn-size-sm {
  @apply px2 py1 text-3.5 lh-none;
}

.btn-size-xs {
  @apply px1 py1 text-3 lh-none;
}

.btn-size-md {
  @apply px3 py2 text-4.5 lh-none;
}

.btn-size-lg {
  @apply px4 py3 text-lg lh-none;
}

.btn.btn-style-primary {
  @apply bg-brand text-slate-1 hover:bg-brand-hover focus:bg-brand-hover;
  @apply lh-none font-500 rounded-none transition-all;
}

.btn.btn-style-error {
  @apply text-error bg-transparent;
  @apply hover:bg-red-8 hover:bg-opacity-10 focus:bg-red-8 focus:bg-opacity-10;
}

.btn.btn-style-subdued {
  @apply text-dark-1 bg-transparent hover:bg-slate-2 focus:bg-slate-2;
}

.btn.btn-style-flat-light {
  @apply text-slate-1 bg-slate-1 bg-opacity-0;
  @apply hover:bg-opacity-10 focus:bg-opacity-10;
}

.btn.btn-style-flat-dark {
  @apply text-slate-9 bg-slate-7 bg-opacity-0;
  @apply hover:bg-opacity-10 focus:bg-opacity-10;
}

.btn.btn-shape-rounded {
  @apply rounded-md;
}

.btn.btn-shape-circle.btn-size-sm {
  @apply px-1 py-1;
}

.btn.btn-shape-circle.btn-size-md {
  @apply px-2 py-2;
}

.btn.btn-shape-circle.btn-size-lg {
  @apply px-2.5 py-2.5;
}

.btn.btn-shape-circle {
  @apply rounded-full;
}
</style>
