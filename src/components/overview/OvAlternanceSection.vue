<script setup lang="ts">
import OvSection from './OvSection.vue'
import { useCohort } from '../../composables/useCohort'
const { isALT } = useCohort()
</script>

<template>
  <OvSection title="Modèle d'alternance">
    <div class="grid-2">
      <div class="card">
        <div class="card-head">
          <span class="tag" style="background:oklch(0.76 0.085 232)"></span>
          Semaines A — tous présents
        </div>
        <ul class="list">
          <li>Toutes les nouvelles notions sont introduites ces semaines-là</li>
          <li>Moment « retour alternants » (30 min) : qu'avez-vous vu en entreprise ?</li>
          <li>Ratio : 1h30 max de cours formateur · reste = pratique guidée puis autonome</li>
        </ul>
      </div>
      <div class="card" v-if="!isALT">
        <div class="card-head">
          <span class="tag" style="background:var(--text-dim)"></span>
          Semaines B — temps plein seuls
        </div>
        <ul class="list">
          <li>Renforcement, katas, TP — aucune notion nouvelle</li>
          <li>Les alternants rattrapent via Notion (pédagogie inversée)</li>
          <li>Activités fun : Algo tournament, SQL Murder Mystery, Git scenarios</li>
        </ul>
      </div>
      <div class="card" v-else>
        <div class="card-head">
          <span class="tag" style="background:oklch(0.74 0.10 290)"></span>
          Semaines ALT — alternants en centre
        </div>
        <ul class="list">
          <li>Semaines B : alternants en entreprise → pas en centre</li>
          <li>Semaines ALT dédiées (août–sept) : retour en centre avant jury</li>
          <li>Relecture dossier · simulation jury · préparation orale</li>
        </ul>
      </div>
    </div>
  </OvSection>
</template>
