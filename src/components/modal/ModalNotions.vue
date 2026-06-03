<script setup lang="ts">
import type { WeekContent } from '../../types'

defineProps<{ content: WeekContent }>()
</script>

<template>
  <div class="modal-col">
    <div class="modal-col-label">Notions</div>
    <ul class="notion-list">
      <li v-for="(notion, i) in content.notions" :key="i">{{ notion }}</li>
    </ul>

    <!-- Ressources Notion -->
    <div v-if="content.links.length > 0" class="modal-links">
      <div class="modal-links-label">Ressources Notion</div>
      <div class="modal-links-list">
        <a
          v-for="link in content.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="notion-link"
        >
          <span class="notion-link-icon">📖</span>
          <span>{{ link.label }}</span>
          <span class="notion-link-arrow">↗</span>
        </a>
      </div>
    </div>
    <div v-else class="modal-links">
      <div class="modal-links-label">Ressources Notion</div>
      <div class="modal-links-empty">Cours à créer</div>
    </div>

    <div style="margin-top:8px">
      <div class="modal-col-label" style="margin-bottom:6px">Bloc pédagogique</div>
      <span class="bloc-badge">{{ content.bloc }}</span>
    </div>
  </div>
</template>
