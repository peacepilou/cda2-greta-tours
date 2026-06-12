<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import BlocLegend from './components/legend/BlocLegend.vue'
import OverviewPage from './components/overview/OverviewPage.vue'
import CompressedView from './components/planning/CompressedView.vue'
import DetailedView from './components/planning/DetailedView.vue'
import PrepPage from './components/prep/PrepPage.vue'
import DossiersPage from './components/dossiers/DossiersPage.vue'
import WeekModal from './components/modal/WeekModal.vue'
import { useLegend } from './composables/useLegend'
import { useModal } from './composables/useModal'
import { useNavigation } from './composables/useNavigation'
import { useCohort } from './composables/useCohort'

document.documentElement.dataset.theme = 'a'

const { currentView, pageMeta, setView } = useNavigation()
const { cohort, setCohort } = useCohort()
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

      <div class="legend" v-show="currentView !== 'overview' && currentView !== 'prep' && currentView !== 'dossiers'">
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
        <PrepPage v-else-if="currentView === 'prep'" />
        <DossiersPage v-else-if="currentView === 'dossiers'" />
      </div>
    </div>

    <div
      class="overlay"
      :class="{ open: modal.isOpen.value }"
      @click.self="modal.close()"
    >
      <WeekModal :iso="modal.selectedIso.value" @close="modal.close()" />
    </div>

    <nav class="mobile-nav">
      <button class="mnav-btn" :class="{ active: currentView === 'overview' }" @click="setView('overview')">
        <svg class="mnav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5"/>
          <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5"/>
          <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5"/>
          <rect x="11" y="11" width="6.5" height="6.5" rx="1.5"/>
        </svg>
        <span>Aperçu</span>
      </button>
      <button class="mnav-btn" :class="{ active: currentView === 'compressed' }" @click="setView('compressed')">
        <svg class="mnav-icon" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="4" cy="4" r="1.7"/><circle cx="10" cy="4" r="1.7"/><circle cx="16" cy="4" r="1.7"/>
          <circle cx="4" cy="10" r="1.7"/><circle cx="10" cy="10" r="1.7"/><circle cx="16" cy="10" r="1.7"/>
          <circle cx="4" cy="16" r="1.7"/><circle cx="10" cy="16" r="1.7"/><circle cx="16" cy="16" r="1.7"/>
        </svg>
        <span>Agenda</span>
      </button>
      <button class="mnav-btn" :class="{ active: currentView === 'detailed' }" @click="setView('detailed')">
        <svg class="mnav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="2.5" y="3" width="15" height="4.2" rx="1.4"/>
          <rect x="2.5" y="9" width="15" height="4.2" rx="1.4"/>
          <rect x="2.5" y="15" width="15" height="2.5" rx="1.2"/>
        </svg>
        <span>Détail</span>
      </button>
      <button class="mnav-btn" :class="{ active: currentView === 'prep' }" @click="setView('prep')">
        <svg class="mnav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="10" cy="10" r="3.4"/>
          <path d="M10 2.2v2.2M10 15.6v2.2M2.2 10h2.2M15.6 10h2.2M4.6 4.6l1.55 1.55M13.85 13.85l1.55 1.55M15.4 4.6l-1.55 1.55M6.15 13.85L4.6 15.4"/>
        </svg>
        <span>Prépa</span>
      </button>
      <button class="mnav-btn" :class="{ active: currentView === 'dossiers' }" @click="setView('dossiers')">
        <svg class="mnav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M2.5 4.5h7.5M2.5 4.5c-0.83 0-1.5 0.67-1.5 1.5v10c0 0.83 0.67 1.5 1.5 1.5h15c0.83 0 1.5-0.67 1.5-1.5v-10c0-0.83-0.67-1.5-1.5-1.5z"/>
        </svg>
        <span>Dossiers</span>
      </button>
      <button class="mnav-btn mnav-cohort" @click="setCohort(cohort === 'TP' ? 'ALT' : 'TP')">
        <span class="pill" :class="cohort === 'TP' ? 'pill-tp' : 'pill-alt'">{{ cohort }}</span>
        <span>{{ cohort === 'TP' ? 'Temps plein' : 'Alternant' }}</span>
      </button>
    </nav>
  </div>
</template>
