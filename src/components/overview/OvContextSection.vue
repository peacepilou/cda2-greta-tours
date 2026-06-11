<script setup lang="ts">
import OvSection from './OvSection.vue'
import { totalHours, fmtHours } from '../../utils/stats'

const tpPlanned = fmtHours(totalHours('TP'))
const altPlanned = fmtHours(totalHours('ALT'))
</script>

<template>
  <OvSection title="Contexte &amp; contraintes">
    <div class="grid-2">
      <div class="card">
        <div class="card-head"><span class="tag" style="background:var(--accent)"></span>La formation</div>
        <ul class="list">
          <li>RNCP37873 — Niveau 6 — Concepteur Développeur d'Application</li>
          <li><strong>TP</strong> : 871,5h conventionnées · {{ tpPlanned }}h planifiées, dont ~50h soft skills (formateur dédié) — <strong>ALT</strong> : 518h centre conventionnées ({{ altPlanned }}h planifiées) + 350h entreprise</li>
          <li>Cohorte mixte <strong>temps plein + alternants</strong> — rythme asymétrique</li>
          <li>Alternants présents <strong>1 semaine sur 2</strong> → nouvelles notions uniquement lors de leur présence</li>
          <li>Démarrage 24 sept 2026 · Certif TP 14 juin 2027 · Certif ALT fin sept 2027 (à confirmer)</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-head"><span class="tag" style="background:var(--accent)"></span>Les contraintes</div>
        <ul class="list">
          <li>Pas d'IA payante pour les étudiants → Copilot gratuit + Ollama (LLM local Docker)</li>
          <li>PC étudiants limités → pas de LLM local lourd</li>
          <li>Soft skills (50h, autre formateur) — saupoudrés</li>
          <li>Auto-formation (150h) — au fil de l'eau</li>
        </ul>
      </div>
    </div>
  </OvSection>
</template>
