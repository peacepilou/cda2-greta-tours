<script setup lang="ts">
defineProps<{
  fondamentaux: string
  ia: string
  blocs_cda: string[]
}>()
</script>

<template>
  <div class="modal-col">
    <div class="modal-col-label">Vision pédagogique</div>

    <div class="triptic-section fond">
      <div class="triptic-label">🧠 Fondamentaux</div>
      <div class="triptic-text">
        <span v-if="fondamentaux">{{ fondamentaux }}</span>
        <span v-else class="triptic-empty">—</span>
      </div>
    </div>

    <div class="triptic-section ia">
      <div class="triptic-label">🤖 Vision IA</div>
      <div class="triptic-text">
        <span v-if="ia">{{ ia }}</span>
        <span v-else class="triptic-empty">Pas d'activité IA spécifique</span>
      </div>
    </div>

    <div class="triptic-section cda">
      <div class="triptic-label">🎯 Vision CDA</div>
      <div class="triptic-text">
        <span v-if="blocs_cda.length">
          Contribution aux blocs : {{ blocs_cda.join(', ') }}
        </span>
        <span v-else class="triptic-empty">Semaine de fondation — socle commun</span>
      </div>
    </div>
  </div>
</template>
