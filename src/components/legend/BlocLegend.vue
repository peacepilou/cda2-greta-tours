<script setup lang="ts">
import { computed } from 'vue'
import { blocColor } from '../../constants/colors'
import type { LegendState } from '../../composables/useLegend'
import { useCohort } from '../../composables/useCohort'
import { primaryBlocs, transversalThreads } from '../../utils/stats'

const props = defineProps<{
  legend: LegendState
}>()

const { cohort, setCohort } = useCohort()

const primaries = computed(() => primaryBlocs(cohort.value))
const threads = computed(() =>
  transversalThreads(cohort.value)
    .map(t => t.name)
    .filter(name => !primaries.value.includes(name))
)
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
    v-for="m in primaries"
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

  <button
    v-for="t in threads"
    :key="t"
    class="chip chip--thread"
    :class="{ active: legend.isChipActive(t) }"
    :style="{ '--chip-color': blocColor(t) } as any"
    @mouseenter="legend.onChipEnter(t)"
    @mouseleave="legend.onChipLeave()"
    @click.stop="legend.onChipClick(t)"
  >
    <span class="chip-dot"></span>{{ t }}
  </button>

  <span class="legend-hint">survol pour isoler · clic pour figer</span>
</template>
