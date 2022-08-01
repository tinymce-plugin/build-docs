<script lang="ts" setup>
import { computed } from 'vue'
import { normalizeLink } from '../../support/utils'
import TPIconExternalLink from '../icons/TPIconExternalLink.vue'

const props = defineProps<{
  href?: string
  noIcon?: boolean
}>()

const isExternal = computed(() => props.href && /^[a-z]+:/i.test(props.href))
</script>

<template>
  <component
    :is="href ? 'a' : 'a'"
    class="TPLink"
    :class="{ link: href }"
    :href="href ? normalizeLink(href) : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <TPIconExternalLink v-if="isExternal && !noIcon" class="icon" />
  </component>
</template>

<style scoped>
.icon {
  display: inline-block;
  margin-top: -1px;
  margin-left: 4px;
  width: 11px;
  height: 11px;
  fill: var(--tp-c-text-3);
  transition: fill 0.25s;
}
a{
  cursor: pointer;
}
</style>
