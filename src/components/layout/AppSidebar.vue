<script setup lang="ts">
import type { ViewMode } from '../../types'
import { useNavigation } from '../../composables/useNavigation'
import { useCohort } from '../../composables/useCohort'
import logoSrc from '../../assets/brand-assets/logo/logo-graphite-ondark.svg'

const { currentView, setView } = useNavigation()
const { cohort, setCohort } = useCohort()

const navItems: Array<{ key: ViewMode; label: string }> = [
  { key: 'overview',   label: "Vue d'ensemble" },
  { key: 'compressed', label: 'Agenda' },
  { key: 'detailed',   label: 'Vue détaillée' },
]
</script>

<template>
  <div class="brand">
    <img :src="logoSrc" alt="CDA²" class="brand-logo" />
  </div>

  <div class="nav-section-label">Planning</div>
  <nav class="nav">
    <button
      v-for="item in navItems"
      :key="item.key"
      class="nav-item"
      :class="{ active: currentView === item.key }"
      @click="setView(item.key)"
    >
      <svg v-if="item.key === 'overview'" class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
        <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5"/>
        <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.5"/>
        <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5"/>
        <rect x="11" y="11" width="6.5" height="6.5" rx="1.5"/>
      </svg>
      <svg v-else-if="item.key === 'compressed'" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="4" cy="4" r="1.7"/>
        <circle cx="10" cy="4" r="1.7"/>
        <circle cx="16" cy="4" r="1.7"/>
        <circle cx="4" cy="10" r="1.7"/>
        <circle cx="10" cy="10" r="1.7"/>
        <circle cx="16" cy="10" r="1.7"/>
        <circle cx="4" cy="16" r="1.7"/>
        <circle cx="10" cy="16" r="1.7"/>
        <circle cx="16" cy="16" r="1.7"/>
      </svg>
      <svg v-else-if="item.key === 'detailed'" class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
        <rect x="2.5" y="3" width="15" height="4.2" rx="1.4"/>
        <rect x="2.5" y="9" width="15" height="4.2" rx="1.4"/>
        <rect x="2.5" y="15" width="15" height="2.5" rx="1.2"/>
      </svg>
      <span>{{ item.label }}</span>
    </button>
  </nav>

  <div class="sidebar-spacer"></div>

  <div class="cohort-switch">
    <button class="cs-btn" :class="{ active: cohort === 'TP' }" @click="setCohort('TP')">
      <span class="pill pill-tp">TP</span>
      <span class="cs-label">Temps plein</span>
    </button>
    <button class="cs-btn" :class="{ active: cohort === 'ALT' }" @click="setCohort('ALT')">
      <span class="pill pill-alt">ALT</span>
      <span class="cs-label">Alternants</span>
    </button>
  </div>

  <div class="sidebar-foot">Concepteur Développeur<br>d'Application · Niveau 6</div>
</template>
