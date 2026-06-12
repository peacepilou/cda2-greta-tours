<script setup lang="ts">
import OvSection from '../overview/OvSection.vue'
import {
  PREP_FRAMING,
  PREP_MODULES,
  PREP_PARENT_LINK,
  PREP_CHECKLIST,
  PREP_CHECKLIST_TITLE,
} from '../../constants/prep'
</script>

<template>
  <div class="view view-enter">
    <div class="ov-hero">
      <div class="ov-hero-title">{{ PREP_FRAMING.promesse }}</div>
      <div class="ov-hero-sub">
        <span>{{ PREP_FRAMING.period }}</span>
        <span>{{ PREP_FRAMING.volume }}</span>
      </div>
    </div>

    <div class="grid-2 prep-callouts">
      <div class="card">
        <div class="card-head"><span class="tag" style="background:var(--accent)"></span>Fil rouge de l'été</div>
        <p class="prep-text">{{ PREP_FRAMING.filRouge }}</p>
      </div>
      <div class="card">
        <div class="card-head"><span class="tag" style="background:oklch(0.74 0.10 290)"></span>Règle IA</div>
        <p class="prep-text">{{ PREP_FRAMING.regleIA }}</p>
      </div>
    </div>

    <OvSection title="Les trois modules">
      <div class="prep-modules">
        <div v-for="m in PREP_MODULES" :key="m.key" class="card prep-module">
          <div class="card-head">
            <span class="prep-emoji">{{ m.emoji }}</span>
            <span>{{ m.title }}</span>
            <span class="prep-hours">{{ m.hours }}</span>
          </div>
          <p class="prep-text prep-pourquoi">{{ m.pourquoi }}</p>
          <ul class="list">
            <li v-for="s in m.sequences" :key="s">{{ s }}</li>
          </ul>
          <div class="modal-livrable prep-livrable">
            <div class="modal-livrable-main">📦 <strong>Livrable</strong> — {{ m.livrable }}</div>
          </div>
          <a class="link prep-link" :href="m.link.url" target="_blank" rel="noopener">
            <span class="link-label">{{ m.link.label }}</span>
            <span class="arr">↗</span>
          </a>
        </div>
      </div>
    </OvSection>

    <OvSection :title="PREP_CHECKLIST_TITLE">
      <div class="card">
        <ul class="prep-check">
          <li v-for="item in PREP_CHECKLIST" :key="item">
            <span class="prep-box">◻</span>{{ item }}
          </li>
        </ul>
      </div>
    </OvSection>

    <div class="prep-foot">
      <a class="link" :href="PREP_PARENT_LINK.url" target="_blank" rel="noopener">
        <span class="link-label">{{ PREP_PARENT_LINK.label }}</span>
        <span class="arr">↗</span>
      </a>
    </div>
  </div>
</template>
