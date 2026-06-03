<script setup lang="ts">
import { blocColor } from '../../constants/colors'
import type { LegendState } from '../../composables/useLegend'

const props = defineProps<{
  legend: LegendState
}>()

const MATIERES = [
  'Git', 'Fondamentaux', 'JavaScript', 'TypeScript', 'Vision métier',
  'Angular', 'CI/CD', 'Java', 'SQL', 'Spring Boot', 'Projet', 'Certification',
]
</script>

<template>
  <span class="legend-key">
    <span class="pill pill-tp">TP</span> Temps plein
  </span>
  <span class="legend-key">
    <span class="pill pill-alt">ALT</span> Alternants
  </span>
  <span class="legend-sep"></span>

  <button
    v-for="m in MATIERES"
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
