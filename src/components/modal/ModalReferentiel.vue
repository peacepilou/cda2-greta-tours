<script setup lang="ts">
defineProps<{ blocs_cda: string[] }>()

const BC_DEFS = [
  {
    code: 'BC01',
    title: 'BC01 — Développer une application sécurisée',
    sub: 'UI · Composants métier · Gestion projet',
  },
  {
    code: 'BC02',
    title: 'BC02 — Concevoir et développer en couches',
    sub: 'Architecture · BDD SQL/NoSQL · Accès données',
  },
  {
    code: 'BC03',
    title: 'BC03 — Préparer le déploiement',
    sub: 'Tests · Documentation · CI/CD · DevOps',
  },
]
</script>

<template>
  <div class="modal-col">
    <div class="modal-col-label">Référentiel CDA</div>
    <div class="bc-list">
      <div
        v-for="bc in BC_DEFS"
        :key="bc.code"
        class="bc-row"
        :class="blocs_cda.includes(bc.code) ? 'active' : 'inactive'"
      >
        <div class="bc-title">
          {{ blocs_cda.includes(bc.code) ? '✅' : '⬜' }} {{ bc.title }}
        </div>
        <div class="bc-sub">{{ bc.sub }}</div>
      </div>
    </div>
  </div>
</template>
