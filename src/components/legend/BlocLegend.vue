<script setup lang="ts">
import { blocColor } from '../../constants/colors'
import type { LegendState } from '../../composables/useLegend'
import { useCohort } from '../../composables/useCohort'

const props = defineProps<{
  legend: LegendState
}>()

const { cohort, setCohort } = useCohort()

const MATIERES = [
  'Git', 'JavaScript', 'TypeScript', 'Vision métier', 'IA',
  'Angular', 'CI/CD', 'Java', 'SQL', 'Spring Boot', 'Certification',
  'Fil rouge',
]
</script>

<template>
  <button class="legend-cohort-btn" :class="{ active: cohort === 'TP' }" @click="setCohort('TP')">
    <span class="pill pill-tp">TP</span> Temps plein
  </button>
  <button class="legend-cohort-btn" :class="{ active: cohort === 'ALT' }" @click="setCohort('ALT')">
    <span class="pill pill-alt">ALT</span> Alternants
  </button>
  <span class="legend-sep"></span>

  <button
    v-for="m in MATIERES"
    v-show="m !== 'Fil rouge' || cohort === 'TP'"
    :key="m"
    class="chip"
    :class="{ active: legend.isChipActive(m) }"
    :style="{ '--chip-color': blocColor(m) } as any"
    @mouseenter="legend.onChipEnter(m)"
    @mouseleave="legend.onChipLeave()"
    @click.stop="legend.onChipClick(m)"
  >
    <span class="chip-dot"></span>{{ m }}
  </button>

  <span class="legend-hint">survol pour isoler · clic pour figer</span>
</template>
