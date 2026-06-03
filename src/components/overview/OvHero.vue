<script setup lang="ts">
import { useCohort } from '../../composables/useCohort'
const { cohort, setCohort } = useCohort()
</script>

<template>
  <div class="ov-hero">
    <div class="ov-hero-title">Formation Concepteur Développeur d'Application</div>
    <div class="ov-hero-sub">
      <div class="ov-cohort-switch">
        <button class="cs-btn" :class="{ active: cohort === 'TP' }" @click="setCohort('TP')">
          <span class="pill pill-tp">TP</span>
          <span class="cs-label">Temps plein</span>
        </button>
        <button class="cs-btn" :class="{ active: cohort === 'ALT' }" @click="setCohort('ALT')">
          <span class="pill pill-alt">ALT</span>
          <span class="cs-label">Alternants</span>
        </button>
      </div>
      <span>GRETA Tours · Septembre 2026 → Octobre 2027</span>
    </div>
  </div>
</template>
