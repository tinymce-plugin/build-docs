<script lang="ts" setup>
import TPMenuLink from './TPMenuLink.vue'

defineProps<{
  text?: string
  items: any[]
}>()
</script>

<template>
  <div class="TPMenuGroup">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items">
      <TPMenuLink v-if="'link' in item" :item="item" />
    </template>
  </div>
</template>

<style scoped>
.TPMenuGroup {
  margin: 12px -12px 0;
  border-top: 1px solid var(--tp-c-divider-light);
  padding: 12px 12px 0;
}

.TPMenuGroup:first-child {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.TPMenuGroup + .TPMenuGroup {
  margin-top: 12px;
  border-top: 1px solid var(--tp-c-divider-light);
}

.title {
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--tp-c-text-2);
  transition: color 0.25s;
}
</style>
