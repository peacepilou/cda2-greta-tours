import { ref, readonly, computed } from 'vue'
import type { ViewMode } from '../types'
import { readParam, writeParam } from '../utils/persistence'

const PAGE_META: Record<ViewMode, { title: string; sub: string }> = {
  overview:   { title: "Vue d'ensemble", sub: 'Démarche pédagogique · GRETA Tours 2026–2027' },
  compressed: { title: 'Agenda',         sub: "Les semaines en un coup d'œil" },
  detailed:   { title: 'Vue détaillée',  sub: 'Programme semaine par semaine' },
}

const currentView = ref<ViewMode>(
  ((readParam('view') ?? localStorage.getItem('cda2-view')) as ViewMode | null) ?? 'overview'
)

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
