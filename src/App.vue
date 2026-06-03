<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import BlocLegend from './components/legend/BlocLegend.vue'
import OverviewPage from './components/overview/OverviewPage.vue'
import CompressedView from './components/planning/CompressedView.vue'
import DetailedView from './components/planning/DetailedView.vue'
import WeekModal from './components/modal/WeekModal.vue'
import { useLegend } from './composables/useLegend'
import { useModal } from './composables/useModal'
import { useNavigation } from './composables/useNavigation'

document.documentElement.dataset.theme = 'a'

const { currentView, pageMeta } = useNavigation()
const legend = useLegend()
const modal = useModal()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') modal.close()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <AppSidebar />
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="topbar-titles">
          <div class="page-title">{{ pageMeta.title }}</div>
          <div class="page-sub">{{ pageMeta.sub }}</div>
        </div>
      </header>

      <div class="legend" v-show="currentView !== 'overview'">
        <BlocLegend :legend="legend" />
      </div>

      <div class="scroll">
        <OverviewPage v-if="currentView === 'overview'" />
        <CompressedView
          v-else-if="currentView === 'compressed'"
          :legend="legend"
          @open="modal.open"
        />
        <DetailedView
          v-else-if="currentView === 'detailed'"
          :legend="legend"
          @open="modal.open"
        />
      </div>
    </div>

    <div
      class="overlay"
      :class="{ open: modal.isOpen.value }"
      @click.self="modal.close()"
    >
      <WeekModal :iso="modal.selectedIso.value" @close="modal.close()" />
    </div>
  </div>
</template>
