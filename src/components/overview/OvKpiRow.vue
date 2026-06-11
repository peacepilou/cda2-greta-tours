<script setup lang="ts">
import { useCohort } from '../../composables/useCohort'
import { totalHours, fmtHours } from '../../utils/stats'

const { isALT } = useCohort()

const tpPlanned = fmtHours(totalHours('TP'))
const altPlanned = fmtHours(totalHours('ALT'))
</script>

<template>
  <div class="kpi-row">
    <div class="kpi" v-if="!isALT">
      <div class="kpi-label">Volume centre</div>
      <div class="kpi-value">871,5<span class="u">h</span></div>
      <div class="kpi-note">Conventionnées · {{ tpPlanned }}h planifiées</div>
    </div>
    <div class="kpi" v-else>
      <div class="kpi-label">Volume total</div>
      <div class="kpi-value">868<span class="u">h</span></div>
      <div class="kpi-note">518h centre conventionnées ({{ altPlanned }}h planifiées) + 350h entreprise</div>
    </div>

    <div class="kpi">
      <div class="kpi-label">Durée</div>
      <div class="kpi-value">{{ isALT ? '13' : '9' }}<span class="u">mois</span></div>
      <div class="kpi-note">{{ isALT ? 'Sept. 2026 → oct. 2027' : 'Sept. 2026 → juin 2027' }}</div>
    </div>

    <div class="kpi">
      <div class="kpi-label">Niveau</div>
      <div class="kpi-value">RNCP 6</div>
      <div class="kpi-note">Concepteur Dév. d'Application</div>
    </div>

    <div class="kpi">
      <div class="kpi-label">{{ isALT ? 'Certification ALT' : 'Certification TP' }}</div>
      <div class="kpi-value kpi-accent">{{ isALT ? 'fin sept.' : '14 juin' }}</div>
      <div class="kpi-note">{{ isALT ? '2027 · jury RNCP37873 (à confirmer)' : '2027 · jury RNCP37873' }}</div>
    </div>
  </div>
</template>
