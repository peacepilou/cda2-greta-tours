<script setup lang="ts">
import { computed } from 'vue'
import OvSection from './OvSection.vue'
import { blocColor } from '../../constants/colors'
import { BLOC_BAR_META } from '../../constants/overview'
import { useLegend } from '../../composables/useLegend'
import { useCohort } from '../../composables/useCohort'
import { blocBars, fmtHours, pureThreads } from '../../utils/stats'

const emit = defineEmits<{ selectBloc: [bloc: string] }>()
const legend = useLegend()
const { cohort } = useCohort()

const bars = computed(() =>
  blocBars(cohort.value).map(b => ({
    ...b,
    label: BLOC_BAR_META[b.bloc]?.label ?? b.bloc,
    emoji: BLOC_BAR_META[b.bloc]?.emoji ?? '',
  }))
)

const threads = computed(() => pureThreads(cohort.value))

function handleClick(bloc: string) {
  legend.onChipClick(bloc)
  emit('selectBloc', bloc)
}
</script>

<template>
  <OvSection title="Répartition du temps">
    <div class="card">
      <div class="bars">
        <div
          v-for="b in bars"
          :key="b.bloc"
          class="bar-row bar-row--clickable"
          :class="{ 'bar-row--active': legend.isChipActive(b.bloc) }"
          @mouseenter="legend.onChipEnter(b.bloc)"
          @mouseleave="legend.onChipLeave()"
          @click="handleClick(b.bloc)"
        >
          <span class="bar-name">
            <span class="em">{{ b.emoji }}</span>{{ b.label }}
          </span>
          <span class="bar-track">
            <span
              class="bar-fill"
              :style="{ width: Math.round(b.pct) + '%', background: blocColor(b.bloc) }"
            ></span>
          </span>
          <span class="bar-val">
            {{ fmtHours(b.hrs) }}h <span class="pct">· {{ Math.round(b.pct) }}%</span>
          </span>
        </div>
      </div>
      <div v-if="threads.length" class="ov-threads">
        <span class="ov-threads-label">Fils transversaux</span>
        <button
          v-for="t in threads"
          :key="t.name"
          class="ov-thread-chip"
          :class="{ 'bar-row--active': legend.isChipActive(t.name) }"
          @mouseenter="legend.onChipEnter(t.name)"
          @mouseleave="legend.onChipLeave()"
          @click="handleClick(t.name)"
        >
          <span class="dot" :style="{ background: blocColor(t.name) }"></span>
          {{ t.name }} · {{ t.count }} sem.
        </button>
      </div>
    </div>
  </OvSection>
</template>
