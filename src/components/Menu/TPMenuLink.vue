<script lang="ts" setup>
import { useData } from '/@/config'
import { isActive } from '../../support/utils'
import TPLink from './TPLink.vue'

defineProps<{
  item: any
  isLang:any
}>()

const { page } = useData()
</script>

<template>
  <div class="TPMenuLink">
    <TPLink 
    v-if="!isLang"
      :class="{ active: isActive(page.relativePath, item.activeMatch || item.link) }"
      :href="item.link"
    >
      {{ item.text }}
    </TPLink>
     <TPLink 
      v-else 
      :class="{ active: isActive(page.relativePath, item.activeMatch || item.link),link:true }"
    >
      {{ item.text }}
    </TPLink>
  </div>
</template>

<style scoped>
.TPMenuGroup + .TPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--tp-c-divider-light);
  padding: 12px 12px 0;
}

.link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
    text-decoration: none;
  color: var(--tp-c-text-1);
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;
}

.link:hover {
  color: var(--tp-c-brand);
  background-color: var(--tp-c-bg-mute);
}

.dark .link:hover {
  background-color: var(--tp-c-bg-soft);
}

.link.active {
  color: var(--tp-c-brand);
}
</style>
