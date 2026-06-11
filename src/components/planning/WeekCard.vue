<script setup lang="ts">
import type { Week, WeekContent } from '../../types'
import { blocColor } from '../../constants/colors'
import { fmtRange, titleEmoji, titleEmojis, titleText } from '../../utils/dates'

const props = defineProps<{
  week: Week
  content: WeekContent | undefined
  dim: boolean
}>()

const emit = defineEmits<{ open: [iso: string] }>()

function presencePills(type: string): Array<[string, string]> {
  if (type === 'A') return [['pill-tp', 'TP'], ['pill-alt', 'ALT']]
  if (type === 'B') return [['pill-tp', 'TP']]
  if (type === 'ALT') return [['pill-alt', 'ALT']]
  return []
}

const color = props.content?.bloc ? blocColor(props.content.bloc) : 'var(--border)'
const isPartial = props.week.hrs < 35 && props.week.hrs > 0

const IA_LABELS: Record<string, string> = {
  theory:     '📚 Théorie IA',
  solo:       '🔒 Sans IA',
  mixed:      '🔒→🤝',
  copilot:    '🤝 Copilote',
  delegation: '🚀 Délégation',
}
</script>

<template>
  <!-- VAC -->
  <div v-if="week.type === 'VAC'" class="wk is-off" :data-iso="week.iso">
    <div class="wk-meta">
      <span class="wk-iso">{{ week.iso }}</span>
      <span class="wk-dates">{{ fmtRange(week.lundi, week.vendredi) }}</span>
    </div>
    <div class="wk-title">— {{ (week.special || 'Vacances').replace(/^[^\p{L}]*\s*/u, '') }}</div>
  </div>

  <!-- STAGE -->
  <div v-else-if="week.type === 'STAGE'" class="wk is-off" :data-iso="week.iso">
    <div class="wk-meta">
      <span class="wk-iso">{{ week.iso }}</span>
      <span class="wk-dates">{{ fmtRange(week.lundi, week.vendredi) }}</span>
    </div>
    <div class="wk-title">Stage</div>
    <div class="wk-off-note">Temps plein en stage · alternants en entreprise</div>
  </div>

  <!-- Normal -->
  <div
    v-else
    class="wk"
    :class="{ dim }"
    :data-iso="week.iso"
    :data-bloc-card="content?.bloc ?? ''"
    :style="{ '--wk-color': color, background: `color-mix(in oklab, ${color} 7%, var(--surface))` } as any"
    @click="emit('open', week.iso)"
  >
    <div class="wk-meta">
      <span class="wk-iso">{{ week.iso }}</span>
      <span class="wk-dates">{{ fmtRange(week.lundi, week.vendredi) }}</span>
      <span v-if="week.special" class="wk-special">{{ week.special }}</span>
      <span v-else-if="isPartial" class="wk-hrs">{{ week.hrs }}h</span>
    </div>
    <div class="wk-title">
      <span class="em">{{ content ? titleEmojis(content.title) : '' }}</span>
      {{ content ? titleText(content.title) : 'Semaine ' + week.iso }}
    </div>
    <ul class="wk-notions">
      <li v-for="(n, i) in (content?.notions ?? []).slice(0, 3)" :key="i">{{ n }}</li>
    </ul>
    <div class="wk-foot">
      <span
        v-if="content?.ia_mode && content.ia_mode !== 'none'"
        class="badge-ia"
        :class="`ia-${content.ia_mode}`"
      >{{ IA_LABELS[content.ia_mode] }}</span>
      <span
        v-for="bc in (content?.blocs_cda ?? [])"
        :key="bc"
        class="badge-bc"
        :class="bc.toLowerCase()"
      >{{ bc }}</span>
      <span
        v-for="eb in content?.extraBlocs ?? []"
        :key="eb"
        class="wk-extra-dot"
        :style="{ background: blocColor(eb) }"
        :title="eb"
      ></span>
      <span class="presence">
        <span
          v-for="pill in presencePills(week.type)"
          :key="pill[0]"
          class="pill"
          :class="pill[0]"
        >{{ pill[1] }}</span>
      </span>
    </div>
  </div>
</template>
