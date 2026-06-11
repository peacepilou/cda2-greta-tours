<script setup lang="ts">
import { computed } from 'vue'
import { WEEKS } from '../../constants/weeks'
import { CONTENT } from '../../constants/content'
import { blocColor } from '../../constants/colors'
import { titleEmojis, titleText, fmtRange } from '../../utils/dates'
import { blocHours, fmtHours } from '../../utils/stats'
import { useCohort } from '../../composables/useCohort'

const props = defineProps<{ bloc: string | null }>()
const emit = defineEmits<{ close: [] }>()

const IA_LABELS: Record<string, string> = {
  theory:     '📚 Théorie',
  solo:       '🔒 Sans IA',
  mixed:      '🔒→🤝',
  copilot:    '🤝 Copilote',
  delegation: '🚀 Délégation',
}

const BLOC_DESCRIPTIONS: Record<string, string> = {
  'JavaScript':    'Support de la partie algorithmique de la formation — décomposer un problème, structurer sa pensée, identifier les cas limites. Interprété et faiblement typé, ses failles (coercition, async, effets de bord) sont aussi importantes que sa syntaxe. Socle commun avant TypeScript et Angular.',
  'Git':           'Outil de versioning distribué, fil conducteur de toute la formation. Commits, branches, PRs et CI/CD s\'appuient dessus — un historique propre est une compétence professionnelle à part entière.',
  'Vision métier': 'À l\'ère de l\'IA, comprendre le besoin métier est un avantage décisif. Ces semaines développent la capacité à interviewer un client, formaliser un besoin, arbitrer une architecture — des compétences que l\'IA ne peut pas remplacer. Un développeur qui sait pourquoi il construit quelque chose devient un vrai interlocuteur produit, pas juste un exécutant.',
  'IA':            'Fondamentaux des LLMs, éthique, RGPD et prompt engineering. L\'objectif n\'est pas d\'utiliser l\'IA mais de comprendre ce qu\'elle fait — pour s\'en servir sans en dépendre.',
  'TypeScript':    'Surcouche typée de JavaScript, compilée vers JS au runtime. Renforce la robustesse du code front — mais ses limites runtime (JSON externe, any implicite) sont aussi importantes que son usage.',
  'Angular':       'Framework front-end de Google, compilé et fortement structuré. Introduit la réactivité (Signals), l\'injection de dépendances et le routing client-side — pilier du BC01 et support du projet e-shop.',
  'Java':          'Langage compilé, fortement typé, orienté objet. Base du backend Spring Boot — POO, exceptions typées, Streams et JUnit avant d\'aborder le framework.',
  'SQL':           'Langage de requêtage relationnel. Fondation de la couche données — modélisation entités-relations, JOINs, agrégats, injections SQL (faille #1 OWASP). Schéma conçu sur le projet e-shop.',
  'Spring Boot':   'Framework Java pour le backend REST. Abstraction sur l\'IoC, JPA et la sécurité applicative — enseigne l\'architecture N-tiers et la séparation des responsabilités (BC02).',
  'CI/CD':         'Automatisation du build, des tests et du déploiement — GitHub Actions, Docker Compose, nginx, HTTPS. Clôt la formation en mettant le projet e-shop en production réelle.',
  'Certification': 'Semaines de préparation et passage du titre RNCP37873 niveau 6 — dossier de projet, simulation jury (40min présentation + 45min entretien technique), questionnaire anglais B1.',
  'Conception':    'Fil transversal en 3 passes — use case et invariants (S44-S45), diagramme de classes et MLD (S4-S5), séquence formelle et déploiement (S8, S10). La modélisation revient ancrée sur le contenu technique du moment.',
  'Fil rouge':     'Semaines où le projet e-shop est le support principal. Commence par la modélisation (S49) et s\'étend jusqu\'au déploiement — ancre chaque notion dans un contexte réel et cumulatif.',
}

const { cohort } = useCohort()

const color = computed(() => props.bloc ? blocColor(props.bloc) : 'var(--accent)')
const stats = computed(() => props.bloc ? blocHours(props.bloc, cohort.value) : null)
const description = computed(() => props.bloc ? (BLOC_DESCRIPTIONS[props.bloc] ?? '') : '')

const weeks = computed(() => {
  if (!props.bloc) return []
  return WEEKS
    .filter(w => {
      const c = CONTENT[w.iso]
      if (!c) return false
      return c.bloc === props.bloc || c.extraBlocs?.includes(props.bloc!)
    })
    .map(w => ({ week: w, content: CONTENT[w.iso] }))
})
</script>

<template>
  <div v-if="bloc" class="dialog dialog-bloc">
    <!-- Head -->
    <div class="dialog-head" :style="{ '--dlg-color': color } as any">
      <div class="dialog-head-info">
        <div class="dialog-title">{{ bloc }}</div>
        <div class="dialog-dates" v-if="stats">
          {{ weeks.length }} sem. · {{ fmtHours(stats.hrs) }}h · {{ stats.pct }}% de la formation
        </div>
        <div class="dialog-dates" v-else>
          {{ weeks.length }} semaines porteuses
        </div>
      </div>
      <button class="dialog-close" @click="emit('close')">✕</button>
    </div>

    <!-- Description -->
    <div v-if="description" class="bloc-desc">{{ description }}</div>

    <!-- Body : liste des semaines -->
    <div class="dialog-body bloc-body">
      <div v-for="{ week, content } in weeks" :key="week.iso" class="bloc-week">
        <div class="bloc-week-meta">
          <span class="bloc-week-iso">{{ week.iso }}</span>
          <span class="bloc-week-dates">{{ fmtRange(week.lundi, week.vendredi) }}</span>
          <span
            v-if="content.ia_mode && content.ia_mode !== 'none'"
            class="badge-ia"
            :class="`ia-${content.ia_mode}`"
          >{{ IA_LABELS[content.ia_mode] }}</span>
        </div>
        <div class="bloc-week-title">{{ titleEmojis(content.title) }} {{ titleText(content.title) }}</div>
        <div class="bloc-week-notions">
          <div v-for="(n, i) in content.notions" :key="i" class="bloc-notion">{{ n }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
