<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DemoGroupItem',
})
</script>

<script setup lang="ts">
  defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})

</script>

<template>
  <div
    class="demo-group-item"
    :class="{ 'demo-group-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>