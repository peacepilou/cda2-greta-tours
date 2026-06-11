<script setup lang="ts">
import { computed } from 'vue'
import { WEEKS } from '../../constants/weeks'
import { CONTENT } from '../../constants/content'
import { blocColor } from '../../constants/colors'
import { BC_DEFS } from '../../constants/overview'
import { fmtRange } from '../../utils/dates'
import { blocHours, blocWeeks, fmtHours, isThreadVisible } from '../../utils/stats'
import { useCohort } from '../../composables/useCohort'

const props = defineProps<{
  iso: string | null
}>()

const emit = defineEmits<{ close: [] }>()

const week = computed(() => WEEKS.find(w => w.iso === props.iso) ?? null)
const content = computed(() => (props.iso ? CONTENT[props.iso] : undefined))

const color = computed(() => {
  if (content.value?.bloc) return blocColor(content.value.bloc)
  return 'var(--accent)'
})

const title = computed(() => {
  if (content.value) return content.value.title
  return week.value?.special ?? 'Vacances'
})

const dateStr = computed(() => {
  if (!week.value) return ''
  const range = fmtRange(week.value.lundi, week.value.vendredi)
  return week.value.hrs ? `${range} · ${week.value.hrs}h` : range
})

const { cohort } = useCohort()

const stats = computed(() => {
  if (!content.value?.bloc) return null
  return blocHours(content.value.bloc, cohort.value)
})

const visibleExtraBlocs = computed(() =>
  (content.value?.extraBlocs ?? []).filter(eb => isThreadVisible(eb, cohort.value))
)

const carrierWeeksCount = computed(() => {
  if (!content.value?.bloc) return 0
  return blocWeeks(content.value.bloc, cohort.value).length
})

const IA_LABELS: Record<string, string> = {
  theory:     '📚 Théorie IA',
  solo:       '🔒 Sans IA',
  mixed:      '🔒→🤝',
  copilot:    '🤝 Copilote',
  delegation: '🚀 Délégation',
}
</script>

<template>
  <div class="dialog">
    <!-- Head -->
    <div class="dialog-head" :style="{ '--dlg-color': color } as any">
      <div class="dialog-head-info">
        <div class="dialog-iso">{{ iso }}</div>
        <div class="dialog-title">{{ title }}</div>
        <div class="dialog-dates">{{ dateStr }}</div>
        <div v-if="stats" class="dialog-statbar">
          <span class="track">
            <span class="fill" :style="{ width: stats.pct + '%', background: color }"></span>
          </span>
          <span class="lbl">{{ fmtHours(stats.hrs) }}h · {{ stats.pct }}% de la formation</span>
        </div>
        <div v-else-if="carrierWeeksCount" class="dialog-statbar">
          <span class="lbl">{{ carrierWeeksCount }} {{ carrierWeeksCount > 1 ? 'semaines porteuses' : 'semaine porteuse' }}</span>
        </div>
      </div>
      <button class="dialog-close" aria-label="Fermer" @click="emit('close')">✕</button>
    </div>

    <!-- Body -->
    <div class="dialog-body">
      <!-- VAC -->
      <div v-if="week?.type === 'VAC'" class="dialog-special">
        <div class="big">🌙</div>
        <div class="h">{{ week.special || 'Vacances' }}</div>
      </div>

      <!-- STAGE -->
      <div v-else-if="week?.type === 'STAGE'" class="dialog-special">
        <div class="big">🏢</div>
        <div class="h">Stage — 15 mars → 26 mai 2027</div>
        <div style="font-size:13px;line-height:1.6;color:var(--text-dim)">
          Temps plein en stage entreprise<br>
          Alternants en entreprise (alternance)<br>
          Personne en centre de formation
        </div>
      </div>

      <!-- Normal -->
      <template v-else-if="content">
        <!-- Col 1 : Notions + liens -->
        <div class="col">
          <div class="col-label">Notions</div>
          <ul class="notion-list">
            <li v-for="(n, i) in content.notions" :key="i">{{ n }}</li>
          </ul>
          <div v-if="content.livrable" class="modal-livrable">
            <div class="modal-livrable-main">📦 <strong>Livrable :</strong> {{ content.livrable }}</div>
            <div class="modal-livrable-debrief">🗣️ Débrief collectif le lendemain (10-15 min)</div>
          </div>
          <div class="col-label" style="margin-top:4px">Ressources Notion</div>
          <div class="links">
            <a
              v-for="(l, i) in content.links"
              :key="i"
              class="link"
              :href="l.url"
              target="_blank"
              rel="noopener"
            >
              <span class="link-label">{{ l.label }}</span>
              <span class="arr">↗</span>
            </a>
            <div v-if="!content.links.length" class="links-empty">Cours à créer</div>
          </div>
          <div class="bloc-badge-row">
            <div class="bloc-badge">
              <span class="dot" :style="{ background: color }"></span>
              {{ content.bloc }}
            </div>
            <div
              v-for="eb in visibleExtraBlocs"
              :key="eb"
              class="bloc-badge bloc-badge--extra"
            >
              <span class="dot" :style="{ background: blocColor(eb) }"></span>
              {{ eb }}
            </div>
          </div>
        </div>

        <!-- Col 2 : Référentiel CDA -->
        <div class="col">
          <div class="col-label">Référentiel CDA</div>
          <div class="bc-rows">
            <div
              v-for="bc in BC_DEFS"
              :key="bc.code"
              class="bc-row"
              :class="content.blocs_cda.includes(bc.code) ? 'on' : 'off'"
            >
              <div class="t">
                {{ content.blocs_cda.includes(bc.code) ? '✓' : '○' }} {{ bc.title }}
              </div>
              <div class="s">{{ bc.sub }}</div>
            </div>
          </div>
        </div>

        <!-- Col 3 : Vision pédagogique -->
        <div class="col">
          <div class="col-label">Vision pédagogique</div>
          <div class="trip fond">
            <div class="trip-label">🧠 Fondamentaux</div>
            <div class="trip-text">
              <span v-if="content.fondamentaux">{{ content.fondamentaux }}</span>
              <span v-else class="trip-empty">—</span>
            </div>
          </div>
          <div class="trip ia">
            <div class="trip-label">🤖 Mode IA</div>
            <div class="trip-text" v-if="content.ia_mode && content.ia_mode !== 'none'">
              <span class="badge-ia" :class="`ia-${content.ia_mode}`" style="margin-bottom:6px;display:inline-block">
                {{ IA_LABELS[content.ia_mode] }}
              </span>
              <div style="margin-top:6px">{{ content.ia || '' }}</div>
            </div>
            <div class="trip-text" v-else>
              <span class="trip-empty">Pas d'activité IA spécifique</span>
            </div>
          </div>
          <div class="trip cda">
            <div class="trip-label">🎯 Vision CDA</div>
            <div class="trip-text">
              <span v-if="content.blocs_cda.length">
                Contribution aux blocs : {{ content.blocs_cda.join(', ') }}
              </span>
              <span v-else class="trip-empty">Semaine de fondation — socle commun</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Fallback -->
      <div v-else class="dialog-special">
        <div class="h">{{ title }}</div>
      </div>
    </div>
  </div>
</template>
