<script setup lang="ts">
import { computed } from 'vue'
import { WEEKS } from '../../constants/weeks'
import { CONTENT } from '../../constants/content'
import { monthKey } from '../../utils/dates'
import WeekCard from './WeekCard.vue'
import type { LegendState } from '../../composables/useLegend'
import { useCohort } from '../../composables/useCohort'

const props = defineProps<{
  legend: LegendState
}>()

const emit = defineEmits<{ open: [iso: string] }>()

const { cohort } = useCohort()

const monthGroups = computed(() => {
  const allowed = cohort.value === 'TP'
    ? ['A', 'B', 'VAC', 'STAGE']
    : ['A', 'ALT', 'VAC']
  const filtered = WEEKS.filter(w => allowed.includes(w.type))
  const map = new Map<string, typeof WEEKS>()
  for (const w of filtered) {
    const k = monthKey(w.lundi)
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push(w)
  }
  return [...map.entries()]
})
</script>

<template>
  <div class="view view-enter">
    <div
      v-for="([label, weeks]) in monthGroups"
      :key="label"
      class="month-block"
    >
      <div class="month-head">
        <span class="month-name">{{ label }}</span>
        <span class="month-count">{{ weeks.length }} sem.</span>
        <span class="month-rule"></span>
      </div>
      <div class="week-grid">
        <WeekCard
          v-for="w in weeks"
          :key="w.iso"
          :week="w"
          :content="CONTENT[w.iso]"
          :dim="legend.isCardDim([CONTENT[w.iso]?.bloc ?? '', ...(CONTENT[w.iso]?.extraBlocs ?? [])])"
          @open="emit('open', $event)"
        />
      </div>
    </div>
  </div>
</template>
