<script setup lang="ts">
import type { Week, WeekContent } from '../../types'
import { blocColor } from '../../constants/colors'
import { fmtRange, titleEmoji, titleEmojis, titleText } from '../../utils/dates'

const props = defineProps<{
  week: Week
  content: WeekContent | undefined
  dim: boolean
  altEntreprise?: boolean
  isAltView?: boolean
}>()

const emit = defineEmits<{ open: [iso: string] }>()

function presencePills(type: string): Array<[string, string]> {
  if (type === 'A') return [['pill-tp', 'TP'], ['pill-alt', 'ALT']]
  if (type === 'B') return [['pill-tp', 'TP']]
  if (type === 'ALT') return [['pill-alt', 'ALT']]
  return []
}

const color = props.content?.bloc ? blocColor(props.content.bloc) : 'var(--border)'
const cornerBlocs = (props.content?.extraBlocs ?? []).filter(b => b !== 'Fil rouge')
</script>

<template>
  <!-- VAC -->
  <div v-if="week.type === 'VAC'" class="mini muted" :data-iso="week.iso">
    <div class="mini-top"><span class="mini-iso">{{ week.iso }}</span></div>
    <div class="mini-emoji">{{ week.special ? titleEmoji(week.special) : '—' }}</div>
    <div class="mini-dates" style="text-align:center;font-size:9px">{{ week.special ? titleText(week.special) : 'Vacances' }}</div>
    <div class="tip">{{ week.special || 'Vacances' }}</div>
  </div>

  <!-- STAGE -->
  <div v-else-if="week.type === 'STAGE'" class="mini muted" :data-iso="week.iso">
    <div class="mini-top"><span class="mini-iso">{{ week.iso }}</span></div>
    <div class="mini-emoji">{{ isAltView ? '🏢' : '🏗️' }}</div>
    <div class="mini-dates" style="text-align:center;font-size:9px">{{ isAltView ? 'Entreprise' : 'Stage' }}</div>
    <div class="tip">{{ isAltView ? 'En entreprise (alternance)' : 'Stage — personne en centre' }}</div>
  </div>

  <!-- ALT : semaine B = en entreprise -->
  <div v-else-if="altEntreprise" class="mini mini-entreprise" :data-iso="week.iso">
    <div class="mini-top"><span class="mini-iso">{{ week.iso }}</span></div>
    <div class="mini-emoji">🏢</div>
    <div class="mini-dates" style="text-align:center">Entreprise</div>
    <div class="tip">{{ content ? titleText(content.title) : week.iso }} — alternants en entreprise</div>
  </div>

  <!-- Normal -->
  <div
    v-else
    class="mini"
    :class="{ dim }"
    :data-iso="week.iso"
    :data-bloc-card="content?.bloc ?? ''"
    :style="{ '--mini-color': color, background: `color-mix(in oklab, ${color} 9%, var(--surface))` } as any"
    @click="emit('open', week.iso)"
  >
    <div class="mini-top">
      <span class="mini-iso">{{ week.iso }}</span>
      <span class="mini-pills">
        <span
          v-for="pill in presencePills(week.type)"
          :key="pill[0]"
          class="pill"
          :class="pill[0]"
        >{{ pill[1] }}</span>
      </span>
    </div>
    <div class="mini-emoji">{{ content ? titleEmojis(content.title) : '·' }}</div>
    <div class="mini-dates">{{ fmtRange(week.lundi, week.vendredi) }}</div>
    <svg v-if="!isAltView && content?.extraBlocs?.includes('Fil rouge')" class="mini-fil-rouge" viewBox="0 0 16 16" fill="none" title="Projet fil rouge e-shop">
      <path d="M14 1 C16 5 9 6 8 8 C7 10 0 11 2 15" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
    <span v-if="cornerBlocs.length" class="mini-corner-dots">
      <span
        v-for="b in cornerBlocs"
        :key="b"
        class="mini-corner-dot"
        :style="{ background: blocColor(b) }"
        :title="b"
      ></span>
    </span>
    <div class="tip">{{ content ? titleText(content.title) : week.iso }}</div>
  </div>
</template>
