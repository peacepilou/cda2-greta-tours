<script setup lang="ts">
import OvSection from './OvSection.vue'
import { blocColor } from '../../constants/colors'
import { BC_CARDS } from '../../constants/overview'
</script>

<template>
  <OvSection title="Référentiel CDA — RNCP37873">
    <div class="grid-3">
      <div v-for="bc in BC_CARDS" :key="bc.code" class="card bc-stat">
        <div class="bc-stat-top">
          <span class="bc-code" :style="{ color: blocColor(bc.bloc) }">{{ bc.code }}</span>
          <span class="bc-hrs">{{ bc.hrs }}h</span>
        </div>
        <div class="bc-pct" :style="{ color: blocColor(bc.bloc) }">
          <span class="sym">~</span>{{ bc.pct }}<span class="sym">%</span>
        </div>
        <div class="bc-label">{{ bc.label }}</div>
        <div class="bc-mods">
          <span v-for="m in bc.modules" :key="m" class="bc-mod">{{ m }}</span>
        </div>
        <div class="bc-bar-track">
          <div class="bc-bar-fill" :style="{ width: bc.pct + '%', background: blocColor(bc.bloc) }"></div>
        </div>
      </div>
    </div>
  </OvSection>
</template>
