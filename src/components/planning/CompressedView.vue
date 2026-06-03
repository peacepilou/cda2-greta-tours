<script setup lang="ts">
import { computed } from 'vue'
import { WEEKS } from '../../constants/weeks'
import { CONTENT } from '../../constants/content'
import MiniCard from './MiniCard.vue'
import type { LegendState } from '../../composables/useLegend'
import { useCohort } from '../../composables/useCohort'

const props = defineProps<{ legend: LegendState }>()
const emit = defineEmits<{ open: [iso: string] }>()

const { cohort } = useCohort()

const filteredWeeks = computed(() => {
  if (cohort.value === 'TP') {
    const endIdx = WEEKS.findIndex(w => w.iso === 'S25')
    const tpWeeks = endIdx >= 0 ? WEEKS.slice(0, endIdx + 1) : WEEKS
    return tpWeeks.filter(w => ['A', 'B', 'VAC', 'STAGE'].includes(w.type))
  }
  // ALT : toutes les semaines (B affichées comme "en entreprise")
  return WEEKS
})
</script>

<template>
  <div class="view view-enter">
    <div class="mini-grid">
      <MiniCard
        v-for="w in filteredWeeks"
        :key="w.iso"
        :week="w"
        :content="CONTENT[w.iso]"
        :dim="legend.isCardDim(CONTENT[w.iso]?.bloc ?? '')"
        :alt-entreprise="cohort === 'ALT' && w.type === 'B'"
        :is-alt-view="cohort === 'ALT'"
        @open="emit('open', $event)"
      />
      <!-- Case finale FIN -->
      <div class="mini mini-fin">
        <div class="mini-emoji">🎉</div>
        <div class="mini-fin-label">FIN</div>
      </div>
    </div>
  </div>
</template>
