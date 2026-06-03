import { ref, readonly, computed } from 'vue'
import { readParam, writeParam } from '../utils/persistence'

const cohort = ref<'TP' | 'ALT'>(
  ((readParam('cohort') ?? localStorage.getItem('cda2-cohort')) as 'TP' | 'ALT' | null) ?? 'TP'
)

export function useCohort() {
  function setCohort(v: 'TP' | 'ALT') {
    cohort.value = v
    localStorage.setItem('cda2-cohort', v)
    writeParam('cohort', v)
  }

  return {
    cohort: readonly(cohort),
    isALT: computed(() => cohort.value === 'ALT'),
    setCohort,
  }
}
