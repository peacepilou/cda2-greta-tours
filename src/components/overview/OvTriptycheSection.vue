<script setup lang="ts">
import OvSection from './OvSection.vue'
</script>

<template>
  <OvSection title="Triptyque pédagogique">
    <div class="grid-3">
      <div class="card t-fond">
        <div class="card-head"><span class="tag"></span>🧠 Fondamentaux &amp; algorithmie</div>
        <p class="quote">L'étudiant doit savoir écrire de la logique avant d'utiliser un framework.</p>
        <ul class="list">
          <li>Algo / pseudocode / JS pur — 8 sem.</li>
          <li>Git &amp; versioning — 2 sem.</li>
          <li>SQL &amp; modélisation — 2 sem.</li>
          <li>Java &amp; orienté objet — 2 sem.</li>
        </ul>
        <p class="card-note">Le repo d'exercices JS à tests rouges/verts est le fil conducteur pratique du socle.</p>
      </div>
      <div class="card t-ia">
        <div class="card-head"><span class="tag"></span>🤖 Vision IA</div>
        <p class="quote">L'IA est intégrée dès le premier jour, mais jamais comme une béquille.</p>
        <ul class="list">
          <li>S1 : théorie IA (LLMs, tokens, éthique, RGPD) — exigence région</li>
          <li>Copilot / Claude comme copilote : générer, comprendre, critiquer</li>
          <li>Ollama dans le projet fil rouge : LLM local en Docker</li>
          <li>Moments « sans IA » et « avec IA » distincts</li>
        </ul>
      </div>
      <div class="card t-cda">
        <div class="card-head"><span class="tag"></span>🎯 Vision CDA &amp; certification</div>
        <p class="quote">Chaque notion enseignée est tracée vers les 3 blocs de compétences RNCP.</p>
        <ul class="list">
          <li>BC01 (~45%) : UI, composants, gestion projet</li>
          <li>BC02 (~35%) : architecture, BDD, accès données</li>
          <li>BC03 (~20%) : tests, CI/CD, déploiement</li>
          <li>Spec e-shop écrite en S46, document vivant toute l'année</li>
        </ul>
      </div>
    </div>
  </OvSection>
</template>
