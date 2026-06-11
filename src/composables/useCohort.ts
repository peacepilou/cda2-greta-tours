import { ref, readonly, computed } from 'vue'
import { readParam, writeParam } from '../utils/persistence'
import { isThreadVisible } from '../utils/stats'
import { useLegend } from './useLegend'

const cohort = ref<'TP' | 'ALT'>(
  ((readParam('cohort') ?? localStorage.getItem('cda2-cohort')) as 'TP' | 'ALT' | null) ?? 'TP'
)

export function useCohort() {
  function setCohort(v: 'TP' | 'ALT') {
    cohort.value = v
    localStorage.setItem('cda2-cohort', v)
    writeParam('cohort', v)
    releaseStickyIfHidden(v)
  }

  // un chip épinglé qui disparaît de la légende (ex : Fil rouge en ALT) laisserait un filtre non déverrouillable
  function releaseStickyIfHidden(v: 'TP' | 'ALT') {
    const legend = useLegend()
    if (legend.stickyBloc.value && !isThreadVisible(legend.stickyBloc.value, v)) legend.reset()
  }

  return {
    cohort: readonly(cohort),
    isALT: computed(() => cohort.value === 'ALT'),
    setCohort,
  }
}
