<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="ov-section">
    <div class="section-head">
      <span class="section-title">{{ title }}</span>
      <span class="section-rule"></span>
    </div>
    <slot />
  </div>
</template>
