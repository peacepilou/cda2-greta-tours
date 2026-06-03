import { ref, computed } from 'vue'

const activeBloc = ref<string | null>(null)
const stickyBloc = ref<string | null>(null)

export function useLegend() {
  function onChipEnter(bloc: string) {
    if (!stickyBloc.value) activeBloc.value = bloc
  }
  function onChipLeave() {
    if (!stickyBloc.value) activeBloc.value = null
  }
  function onChipClick(bloc: string) {
    if (stickyBloc.value === bloc) {
      stickyBloc.value = null
      activeBloc.value = null
    } else {
      stickyBloc.value = bloc
      activeBloc.value = bloc
    }
  }
  function reset() {
    stickyBloc.value = null
    activeBloc.value = null
  }
  function isChipActive(bloc: string): boolean {
    return stickyBloc.value === bloc
  }
  function isCardDim(cardBloc: string): boolean {
    return !!activeBloc.value && cardBloc !== activeBloc.value
  }

  return {
    activeBloc: computed(() => activeBloc.value),
    stickyBloc: computed(() => stickyBloc.value),
    onChipEnter,
    onChipLeave,
    onChipClick,
    reset,
    isChipActive,
    isCardDim,
  }
}

export type LegendState = ReturnType<typeof useLegend>
