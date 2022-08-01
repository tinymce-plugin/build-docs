<script lang="ts" setup>
import TPMenuLink from './TPMenuLink.vue'
import TPMenuGroup from './TPMenuGroup.vue'

defineProps<{
  items?: any[]
}>()
</script>

<template>
  <div class="TPMenu">
    <div v-if="items" class="items">
      <template v-for="item in items" :key="item.text">
        <TPMenuLink v-if="'link' in item" :item="item" />
        <TPMenuGroup v-else :text="item.text" :items="item.items" />
      </template>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.TPMenu {
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--tp-c-divider-light);
  background-color: var(--tp-c-bg);
  box-shadow: var(--tp-shadow-3);
  transition: background-color 0.5s;
}

.dark .TPMenu {
  box-shadow: var(--tp-shadow-2);
}

.TPMenu :deep(.group) {
  margin: 0 -12px;
  padding: 0 12px 12px;
}

.TPMenu :deep(.group + .group) {
  border-top: 1px solid var(--tp-c-divider-light);
  padding: 11px 12px 12px;
}

.TPMenu :deep(.group:last-child) {
  padding-bottom: 0;
}

.TPMenu :deep(.group + .item) {
  border-top: 1px solid var(--tp-c-divider-light);
  padding: 11px 16px 0;
}

.TPMenu :deep(.item) {
  padding: 0 16px;
  white-space: nowrap;
}

.TPMenu :deep(.label) {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--tp-c-text-2);
  transition: color .5s;
}

.TPMenu :deep(.action) {
  padding-left: 24px;
}
</style>
