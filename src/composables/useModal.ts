import { ref } from 'vue'

const isOpen = ref(false)
const selectedIso = ref<string | null>(null)

export function useModal() {
  function open(iso: string) {
    selectedIso.value = iso
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
    selectedIso.value = null
  }
  return { isOpen, selectedIso, open, close }
}

export type ModalState = ReturnType<typeof useModal>
