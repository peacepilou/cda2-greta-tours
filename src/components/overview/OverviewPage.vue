<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OvHero from './OvHero.vue'
import OvKpiRow from './OvKpiRow.vue'
import OvContextSection from './OvContextSection.vue'
import OvTriptycheSection from './OvTriptycheSection.vue'
import OvTimeBarsSection from './OvTimeBarsSection.vue'
import OvBcSection from './OvBcSection.vue'
import OvAlternanceSection from './OvAlternanceSection.vue'
import OvProjectSection from './OvProjectSection.vue'
import BlocModal from '../modal/BlocModal.vue'

const selectedBloc = ref<string | null>(null)

function openBloc(bloc: string) {
  selectedBloc.value = bloc
}
function closeBloc() {
  selectedBloc.value = null
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeBloc()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="view view-enter">
    <OvHero />
    <OvKpiRow />
    <OvContextSection />
    <OvTriptycheSection />
    <OvTimeBarsSection @select-bloc="openBloc" />
    <OvBcSection />
    <OvAlternanceSection />
    <OvProjectSection />
  </div>

  <div class="overlay" :class="{ open: selectedBloc !== null }" @click.self="closeBloc">
    <BlocModal :bloc="selectedBloc" @close="closeBloc" />
  </div>
</template>
