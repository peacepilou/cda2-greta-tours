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
          <li>Renforcement, katas, autonomie — aucune notion nouvelle introduite</li>
          <li>Moment clé pour avancer sur le <strong>projet fil rouge e-shop</strong> : architecture, composants, intégration</li>
          <li>Activités : SQL Murder Mystery, Git scenarios, algo tournaments</li>
        </ul>
      </div>
      <div class="card" v-else>
        <div class="card-head">
          <span class="tag" style="background:oklch(0.74 0.10 290)"></span>
          Semaines B — alternants en entreprise
        </div>
        <ul class="list">
          <li>Ces semaines, les temps plein sont en centre — vous êtes en entreprise</li>
          <li>Les cours et ressources Notion restent accessibles : idéal pour explorer à votre rythme ou préparer la semaine A suivante</li>
          <li>Semaines ALT dédiées (août–sept) : retour en centre pour la préparation jury</li>
        </ul>
      </div>
    </div>
  </OvSection>
</template>
