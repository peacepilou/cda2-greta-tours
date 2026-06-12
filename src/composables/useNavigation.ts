import { ref, readonly, computed } from 'vue'
import type { ViewMode } from '../types'
import { readParam, writeParam } from '../utils/persistence'

const PAGE_META: Record<ViewMode, { title: string; sub: string }> = {
  overview:   { title: "Vue d'ensemble", sub: 'Démarche pédagogique · GRETA Tours 2026–2027' },
  compressed: { title: 'Agenda',         sub: "Les semaines en un coup d'œil" },
  detailed:   { title: 'Vue détaillée',  sub: 'Programme semaine par semaine' },
  prep:       { title: 'Préparation',    sub: "Cours de l'été · Remise à niveau avant le 24 septembre" },
  dossiers:   { title: 'Dossiers',       sub: 'Évaluation jury CDA · 8 dossiers de projet' },
}

const VIEWS = Object.keys(PAGE_META) as ViewMode[]

function isViewMode(v: string | null): v is ViewMode {
  return v !== null && (VIEWS as string[]).includes(v)
}

const storedView = readParam('view') ?? localStorage.getItem('cda2-view')
const currentView = ref<ViewMode>(isViewMode(storedView) ? storedView : 'overview')

export function useNavigation() {
  function setView(v: ViewMode) {
    currentView.value = v
    localStorage.setItem('cda2-view', v)
    writeParam('view', v)
  }

  return {
    currentView: readonly(currentView),
    pageMeta: computed(() => PAGE_META[currentView.value]),
    setView,
  }
}
