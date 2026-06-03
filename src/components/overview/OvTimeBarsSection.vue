<script setup lang="ts">
import OvSection from './OvSection.vue'
import { blocColor } from '../../constants/colors'
import { BLOCS_BARS, TOTAL_HRS } from '../../constants/overview'
import { useLegend } from '../../composables/useLegend'

const emit = defineEmits<{ selectBloc: [bloc: string] }>()
const legend = useLegend()

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
          v-for="b in BLOCS_BARS"
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
              :style="{ width: Math.round(b.hrs / TOTAL_HRS * 100) + '%', background: blocColor(b.bloc) }"
            ></span>
          </span>
          <span class="bar-val">
            {{ b.hrs }}h <span class="pct">· {{ Math.round(b.hrs / TOTAL_HRS * 100) }}%</span>
          </span>
        </div>
      </div>
    </div>
  </OvSection>
</template>
