<script setup lang="ts">
import OvSection from './OvSection.vue'
import { useCohort } from '../../composables/useCohort'
const { isALT } = useCohort()
</script>

<template>
  <OvSection title="Projet fil rouge &amp; certification">
    <div class="grid-2">
      <div class="card" :style="isALT ? 'opacity:0.5' : ''">
        <div class="card-head">
          <span class="tag" style="background:oklch(0.7 0.12 230)"></span>
          Temps plein
        </div>
        <ul class="list">
          <li>Projet fil rouge <strong>e-shop en groupe</strong> (constitution = décision formateur)</li>
          <li>Spec écrite ensemble dès S44-S45 (Vision métier · Conception V1)</li>
          <li>BC01 + BC02 + BC03 démontrables sur ce projet</li>
          <li>Feature IA avec Ollama : LLM local dans Docker</li>
        </ul>
      </div>
      <div class="card" :style="!isALT ? 'opacity:0.5' : ''">
        <div class="card-head">
          <span class="tag" style="background:oklch(0.74 0.10 290)"></span>
          Alternants
        </div>
        <ul class="list">
          <li><strong>Projet entreprise</strong> = dossier RNCP idéal (vrai contexte, vrai jury)</li>
          <li>Sinon → <strong>portfolio progressif</strong> : repo GitHub alimenté notion par notion depuis S42</li>
          <li>Clôture : 23-27 août en centre · relecture 6-10 sept · prépa 20-24 sept</li>
        </ul>
      </div>
    </div>
  </OvSection>
</template>
