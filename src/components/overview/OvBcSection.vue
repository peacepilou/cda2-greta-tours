<script setup lang="ts">
import { computed } from 'vue'
import OvSection from './OvSection.vue'
import { blocColor } from '../../constants/colors'
import { BC_CARDS } from '../../constants/overview'
import { useCohort } from '../../composables/useCohort'
import { bcDistribution, fmtHours } from '../../utils/stats'

const { cohort } = useCohort()

const cards = computed(() => {
  const dist = bcDistribution(cohort.value)
  return BC_CARDS.map(card => {
    const stat = dist.find(d => d.bc === card.code)
    return { ...card, hrs: stat?.hrs ?? 0, pct: stat?.pct ?? 0 }
  })
})
</script>

<template>
  <OvSection title="Référentiel CDA — RNCP37873">
    <div class="grid-3">
      <div v-for="bc in cards" :key="bc.code" class="card bc-stat">
        <div class="bc-stat-top">
          <span class="bc-code" :style="{ color: blocColor(bc.bloc) }">{{ bc.code }}</span>
          <span class="bc-hrs">{{ fmtHours(bc.hrs) }}h</span>
        </div>
        <div class="bc-pct" :style="{ color: blocColor(bc.bloc) }">
          <span class="sym">~</span>{{ Math.round(bc.pct) }}<span class="sym">%</span>
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
