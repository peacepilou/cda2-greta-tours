<script setup lang="ts">
import { useCohort } from '../../composables/useCohort'
import OvSection from './OvSection.vue'

const { cohort } = useCohort()
const referentielUrl = `${import.meta.env.BASE_URL}REFERENTIEL_CDA.pdf`
</script>

<template>
  <OvSection title="Triptyque pédagogique">
    <div class="grid-3">

      <div class="card t-fond">
        <div class="card-head"><span class="tag"></span>🧠 Fondamentaux &amp; raisonnement</div>
        <p class="quote">Un bon développeur distingue l'abstraction de l'implémentation</p>
        <div class="fond-items">
          <div class="fond-item">
            <div class="fond-item-title">Décomposer un problème</div>
            <div class="fond-item-sub">Nommer les cas limites avant d'écrire une ligne</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Comprendre, pas juste utiliser</div>
            <div class="fond-item-sub">Savoir ce qu'un outil fait — et ce qu'il ne protège pas</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Voir les failles</div>
            <div class="fond-item-sub">Chaque technologie a ses angles morts silencieux</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Critiquer ce qu'on lit</div>
            <div class="fond-item-sub">Code généré, doc, solution en ligne : rien n'est vrai par défaut</div>
          </div>
        </div>
      </div>

      <div class="card t-ia">
        <div class="card-head"><span class="tag"></span>🤖 Vision IA</div>
        <p class="quote">L'IA est intégrée dès le premier jour, mais jamais comme une béquille.</p>
        <div class="fond-items">
          <div class="fond-item">
            <div class="fond-item-title">Observer avant de déléguer</div>
            <div class="fond-item-sub">Comprendre ce que l'IA fait avant de lui faire confiance</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Prompt maïeutique</div>
            <div class="fond-item-sub">Poser les bonnes questions — pas donner les réponses</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Vraisemblable ≠ vrai</div>
            <div class="fond-item-sub">Reconnaître les hallucinations et toujours vérifier</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Déléguer avec lucidité</div>
            <div class="fond-item-sub">L'IA accélère — elle ne remplace pas le raisonnement</div>
          </div>
        </div>
      </div>

      <div class="card t-cda">
        <div class="card-head">
          <span class="tag"></span>🎯 Vision CDA &amp; certification
          <a class="dl-ref" :href="referentielUrl" target="_blank" rel="noopener" title="Ouvrir le référentiel RNCP">
            ↓ Référentiel
          </a>
        </div>
        <p class="quote">Chaque notion enseignée est tracée vers les 3 blocs de compétences RNCP.</p>
        <div class="fond-items">
          <div class="fond-item">
            <div class="fond-item-title">3 blocs de compétences</div>
            <div class="fond-item-sub">BC01 UI/front · BC02 architecture/BDD · BC03 tests/déploiement</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Projet fil rouge</div>
            <div v-if="cohort === 'TP'" class="fond-item-sub">L'e-shop comme support concret de toutes les notions</div>
            <div v-else class="fond-item-sub">Projet entreprise ou e-shop au choix — développé en autonomie</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Dossier de projet</div>
            <div v-if="cohort === 'TP'" class="fond-item-sub">Rédigé pendant le stage, présenté devant le jury</div>
            <div v-else class="fond-item-sub">Rédigé durant les semaines entreprise, présenté devant le jury</div>
          </div>
          <div class="fond-item">
            <div class="fond-item-title">Certification RNCP</div>
            <div class="fond-item-sub">40min présentation · 45min entretien technique · questionnaire anglais B1</div>
          </div>
        </div>
      </div>

    </div>
  </OvSection>
</template>
