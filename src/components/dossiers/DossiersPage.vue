<script setup lang="ts">
import { ref, computed } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ELEVES_EVALUATIONS, type ElèveEvaluation } from '../../constants/dossiers'

const expandedEleve = ref<string | null>(null)

const noteColors: Record<string, string> = {
  excellent: '#22c55e',
  'excellent (avec réserve)': '#22c55e',
  'bien à excellent': '#86efac',
  bien: '#86efac',
  'bien (proche d\'excellent)': '#86efac',
  moyen: '#f59e0b',
  'à travailler': '#ef4444',
}

function getNoteColor(note: string): string {
  return noteColors[note] ?? '#94a3b8'
}

function toggleEleve(prenom: string) {
  expandedEleve.value = expandedEleve.value === prenom ? null : prenom
}

function getNotePercentage(note: string): number {
  const noteMap: Record<string, number> = {
    excellent: 100,
    'excellent (avec réserve)': 100,
    'bien à excellent': 85,
    bien: 75,
    'bien (proche d\'excellent)': 85,
    moyen: 50,
    'à travailler': 25,
  }
  return noteMap[note] ?? 0
}


function getVerdictColor(notes: { CCP1: string; CCP2: string; CCP3: string }): string {
  const colors = [notes.CCP1, notes.CCP2, notes.CCP3]
  const anyExcellent = colors.some(c => c.includes('excellent'))
  const anyBien = colors.some(c => c.includes('bien'))
  const anyMoyen = colors.some(c => c === 'moyen')
  const anyTravail = colors.some(c => c === 'à travailler')

  if (anyExcellent) return '#22c55e'
  if (anyBien) return '#86efac'
  if (anyMoyen) return '#f59e0b'
  return '#ef4444'
}

function getQuestions(eleve: ElèveEvaluation, ccp: 'CCP1' | 'CCP2' | 'CCP3'): string[] {
  if (ccp === 'CCP1') return eleve.questionsCCP1
  if (ccp === 'CCP2') return eleve.questionsCCP2
  return eleve.questionsCCP3
}

const anglesMortsCommunsData = computed(() => {
  const allAngles = ELEVES_EVALUATIONS.flatMap(e => e.anglesMorts)
  const counts: Record<string, number> = {}

  allAngles.forEach(angle => {
    counts[angle] = (counts[angle] || 0) + 1
  })

  return Object.entries(counts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([angle, count]) => ({ angle, count }))
})
</script>

<template>
  <div class="view view-enter">
    <!-- Hero -->
    <div class="ov-hero">
      <div class="ov-hero-title">Dossiers de projet</div>
      <div class="ov-hero-sub">
        <span>8 élèves · 3 CCPs</span>
        <span>Évaluation jury CDA</span>
      </div>
    </div>
    
    <!-- Liste des prénoms → ancres (grid 3-4 colonnes) -->
    <div class="dossiers-index">
      <button
        v-for="eleve in ELEVES_EVALUATIONS"
        :key="eleve.prenom"
        class="index-btn"
        @click="expandedEleve = eleve.prenom"
      >
        <span class="index-name">{{ eleve.prenom }}</span>
        <div class="index-pills">
          <span
            class="pill"
            :style="{ backgroundColor: getNoteColor(eleve.notes.CCP1) }"
            :title="`CCP1: ${eleve.notes.CCP1}`"
          />
          <span
            class="pill"
            :style="{ backgroundColor: getNoteColor(eleve.notes.CCP2) }"
            :title="`CCP2: ${eleve.notes.CCP2}`"
          />
          <span
            class="pill"
            :style="{ backgroundColor: getNoteColor(eleve.notes.CCP3) }"
            :title="`CCP3: ${eleve.notes.CCP3}`"
          />
        </div>
      </button>
    </div>

    <!-- Matrice de synthèse -->
    <div class="card dossiers-matrix">
      <div class="card-head">Matrice de synthèse</div>
      <table class="matrix-table">
        <thead>
          <tr>
            <th>Élève</th>
            <th>CCP1</th>
            <th>CCP2</th>
            <th>CCP3</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eleve in ELEVES_EVALUATIONS" :key="eleve.prenom">
            <td class="name-cell">{{ eleve.prenom }}</td>
            <td class="note-cell">
              <div class="note-bar-mini">
                <div
                  class="note-bar-fill"
                  :style="{
                    width: `${getNotePercentage(eleve.notes.CCP1)}%`,
                    backgroundColor: getNoteColor(eleve.notes.CCP1)
                  }"
                />
              </div>
              <span class="note-bar-text">{{ eleve.notes.CCP1 }}</span>
            </td>
            <td class="note-cell">
              <div class="note-bar-mini">
                <div
                  class="note-bar-fill"
                  :style="{
                    width: `${getNotePercentage(eleve.notes.CCP2)}%`,
                    backgroundColor: getNoteColor(eleve.notes.CCP2)
                  }"
                />
              </div>
              <span class="note-bar-text">{{ eleve.notes.CCP2 }}</span>
            </td>
            <td class="note-cell">
              <div class="note-bar-mini">
                <div
                  class="note-bar-fill"
                  :style="{
                    width: `${getNotePercentage(eleve.notes.CCP3)}%`,
                    backgroundColor: getNoteColor(eleve.notes.CCP3)
                  }"
                />
              </div>
              <span class="note-bar-text">{{ eleve.notes.CCP3 }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cartes détaillées par élève -->
    <div class="dossiers-cards">
      <div
        v-for="eleve in ELEVES_EVALUATIONS"
        :key="eleve.prenom"
        :id="`dossier-${eleve.prenom.toLowerCase()}`"
        class="eleve-card"
      >
        <div class="card-head dossier-header" @click="toggleEleve(eleve.prenom)">
          <div class="header-title">
            <h3>{{ eleve.prenom }} {{ eleve.nom }}</h3>
            <span class="projet-label">{{ eleve.projet }}</span>
          </div>
          <div class="header-actions">
            <span v-if="eleve.alerte" class="alert-badge">⚠️ {{ eleve.alerte }}</span>
            <svg class="toggle-icon" :class="{ open: expandedEleve === eleve.prenom }" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 10 13 14 9" />
            </svg>
          </div>
        </div>

        <div v-show="expandedEleve === eleve.prenom" class="card-body dossier-body">
          <!-- Stack & Résumé (disposition verticale organisée) -->
          <div class="section-layout">
            <div class="section-item">
              <div class="section-label">Stack</div>
              <div class="section-card">
                <p class="section-text">{{ eleve.stack }}</p>
              </div>
            </div>
            <div class="section-item">
              <div class="section-label">Résumé</div>
              <div class="section-card">
                <p class="section-text">{{ eleve.resume }}</p>
              </div>
            </div>
          </div>

          <!-- Notes graphiques (barres horizontales 60px avec proportion) -->
          <div class="notes-section">
            <div class="section-label">Notes CCP</div>
            <div class="notes-bars">
              <div class="note-bar">
                <div class="bar-label">CCP1</div>
                <div class="bar-visual-container">
                  <div
                    class="bar-visual"
                    :style="{
                      width: `${getNotePercentage(eleve.notes.CCP1)}%`,
                      backgroundColor: getNoteColor(eleve.notes.CCP1)
                    }"
                  />
                </div>
                <div class="bar-text">{{ eleve.notes.CCP1 }}</div>
              </div>
              <div class="note-bar">
                <div class="bar-label">CCP2</div>
                <div class="bar-visual-container">
                  <div
                    class="bar-visual"
                    :style="{
                      width: `${getNotePercentage(eleve.notes.CCP2)}%`,
                      backgroundColor: getNoteColor(eleve.notes.CCP2)
                    }"
                  />
                </div>
                <div class="bar-text">{{ eleve.notes.CCP2 }}</div>
              </div>
              <div class="note-bar">
                <div class="bar-label">CCP3</div>
                <div class="bar-visual-container">
                  <div
                    class="bar-visual"
                    :style="{
                      width: `${getNotePercentage(eleve.notes.CCP3)}%`,
                      backgroundColor: getNoteColor(eleve.notes.CCP3)
                    }"
                  />
                </div>
                <div class="bar-text">{{ eleve.notes.CCP3 }}</div>
              </div>
            </div>
          </div>

          <!-- Verdict avec couleur et icône -->
          <div
            class="section-verdict"
            :style="{
              borderLeftColor: getVerdictColor(eleve.notes),
              backgroundColor: getVerdictColor(eleve.notes) + '20'
            }"
          >
            <div class="verdict-header">
              <span class="verdict-icon">✨</span>
              <div class="section-label">Verdict</div>
            </div>
            <p class="verdict-text">{{ eleve.verdict }}</p>
          </div>

          <!-- Sections repliables avec Headless UI Disclosure -->
          <Disclosure as="div" class="disclosure-section">
            <DisclosureButton class="disclosure-btn">
              <span>✓ Points forts ({{ eleve.pointsForts.length }})</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 10 13 14 9" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              <ul class="list">
                <li v-for="(point, i) in eleve.pointsForts" :key="`pf-${i}`">{{ point }}</li>
              </ul>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" class="disclosure-section">
            <DisclosureButton class="disclosure-btn">
              <span>⚡ Angles morts ({{ eleve.anglesMorts.length }})</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 10 13 14 9" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              <ul class="list">
                <li v-for="(angle, i) in eleve.anglesMorts" :key="`am-${i}`">{{ angle }}</li>
              </ul>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" class="disclosure-section">
            <DisclosureButton class="disclosure-btn">
              <span>🔧 Moyen / à améliorer ({{ eleve.moyen_ameliorer.length }})</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 10 13 14 9" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              <ul class="list">
                <li v-for="(item, i) in eleve.moyen_ameliorer" :key="`ma-${i}`">{{ item }}</li>
              </ul>
            </DisclosurePanel>
          </Disclosure>

          <!-- Questions par CCP -->
          <Disclosure as="div" class="disclosure-section">
            <DisclosureButton class="disclosure-btn">
              <span>❓ Questions CCP1 ({{ eleve.questionsCCP1.length }})</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 10 13 14 9" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              <ol class="list">
                <li v-for="(question, i) in eleve.questionsCCP1" :key="`ccp1-q${i}`">
                  {{ question }}
                </li>
              </ol>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" class="disclosure-section">
            <DisclosureButton class="disclosure-btn">
              <span>❓ Questions CCP2 ({{ eleve.questionsCCP2.length }})</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 10 13 14 9" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              <ol class="list">
                <li v-for="(question, i) in eleve.questionsCCP2" :key="`ccp2-q${i}`">
                  {{ question }}
                </li>
              </ol>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure as="div" class="disclosure-section">
            <DisclosureButton class="disclosure-btn">
              <span>❓ Questions CCP3 ({{ eleve.questionsCCP3.length }})</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 10 13 14 9" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="disclosure-panel">
              <ol class="list">
                <li v-for="(question, i) in eleve.questionsCCP3" :key="`ccp3-q${i}`">
                  {{ question }}
                </li>
              </ol>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>

    <!-- Constantes de la promo -->
    <div class="card dossiers-constants">
      <div class="card-head">Angles morts récurrents de la promo</div>
      <div class="card-body">
        <p class="constants-intro">Ces points apparaissent dans au moins 3 dossiers sur 8 :</p>
        <ul class="list">
          <li v-for="item in anglesMortsCommunsData" :key="item.angle">
            <strong>{{ item.angle }}</strong>
            <span class="occurrence">({{ item.count }} dossier{{ item.count > 1 ? 's' : '' }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view {
  padding: var(--view-pad);
  max-width: var(--view-max);
  margin: 0 auto;
}

.ov-hero {
  margin-bottom: 3rem;
}

.ov-hero-title {
  font-size: 2.5rem;
  font-weight: var(--display-weight);
  letter-spacing: var(--display-tracking);
  margin-bottom: 0.5rem;
  color: var(--text);
}

.ov-hero-sub {
  display: flex;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: var(--text-dim);
}

/* Index des prénoms (grid 3-4 colonnes) */
.dossiers-index {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: var(--surface-2);
  border-radius: var(--radius);
}

.index-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 110px;
  justify-content: center;
}

.index-btn:hover {
  background: var(--surface-3);
  border-color: var(--border);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.index-name {
  font-weight: 600;
  color: var(--text);
  font-size: 1rem;
}

.index-pills {
  display: flex;
  gap: 0.5rem;
}

.pill {
  width: 10px;
  height: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
}

.pill:hover {
  opacity: 1;
  transform: scale(1.2);
}

/* Matrice */
.dossiers-matrix {
  margin-bottom: 2rem;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.matrix-table thead {
  background: var(--surface-2);
}

.matrix-table th,
.matrix-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-soft);
}

.matrix-table th {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.matrix-table tbody tr:hover {
  background: var(--surface);
}

.name-cell {
  font-weight: 500;
  color: var(--text);
  width: 150px;
}

.note-cell {
  width: 120px;
  padding: 0.75rem !important;
  text-align: left;
}

.note-bar-mini {
  height: 20px;
  background: var(--surface-2);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.note-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.note-bar-text {
  font-size: 0.75rem;
  color: var(--text-dim);
}

/* Cartes d'élèves */
.dossiers-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
}

.eleve-card {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
}

.dossier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background: var(--surface-2);
  transition: background 0.2s;
}

.dossier-header:hover {
  background: var(--surface-3);
}

.header-title {
  flex: 1;
}

.header-title h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text);
}

.projet-label {
  font-size: 0.85rem;
  color: var(--text-dim);
  display: block;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.alert-badge {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  background: oklch(0.90 0.15 28);
  color: #7c2d12;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.toggle-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s;
  color: var(--text-muted);
}

.toggle-icon.open {
  transform: rotate(180deg);
}

/* Corps de la carte */
.dossier-body {
  padding: 1.5rem;
  border-top: 1px solid var(--border-soft);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Section layout vertical avec cartes séparées */
.section-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.section-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-card {
  padding: 1rem;
  background: var(--surface-2);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-soft);
}

.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.section-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-dim);
}

/* Notes graphiques (barres horizontales 60px proportionnelles) */
.notes-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--surface-2);
  border-radius: var(--radius-sm);
}

.notes-bars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.note-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bar-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.bar-visual-container {
  height: 60px;
  background: var(--surface);
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.bar-visual {
  height: 100%;
  border-radius: var(--radius-sm);
  opacity: 0.95;
  transition: width 0.3s ease, opacity 0.2s;
  min-width: 2px;
}

.bar-visual:hover {
  opacity: 1;
}

.bar-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-dim);
}

/* Verdict (distinctif avec couleur, fond et icône) */
.section-verdict {
  padding: 2rem;
  border-radius: var(--radius-sm);
  border-left: 6px solid;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.verdict-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.verdict-icon {
  font-size: 1.75rem;
}

.verdict-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.8;
  color: var(--text-dim);
}

/* Sections repliables (Headless UI Disclosure) */
.disclosure-section {
  margin-bottom: 1rem;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface);
}

.disclosure-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.125rem 1rem;
  background: var(--surface-2);
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  transition: background 0.2s ease, color 0.2s ease;
  user-select: none;
}

.disclosure-btn:hover {
  background: var(--surface-3);
}

.disclosure-btn:active {
  opacity: 0.95;
}

.disclosure-btn span {
  flex: 1;
  display: flex;
  align-items: center;
}

.disclosure-btn svg {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
  flex-shrink: 0;
  margin-left: 1rem;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  transform-origin: center;
}

/* Chevron rotates when Disclosure is open */
.disclosure-btn[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

/* Panel with smooth slide animation */
.disclosure-panel {
  overflow: hidden;
  background: var(--bg);
  border-top: 1px solid var(--border-soft);
  animation: slideDown 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
}

/* Exit animation when closing (handled by Headless UI) */
.disclosure-panel[data-closed] {
  animation: slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    max-height: 2000px;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    max-height: 2000px;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
}

/* Panel content padding */
.disclosure-panel > * {
  padding: 1.25rem 1rem;
}

/* Lists inside panels */
.disclosure-panel .list {
  padding: 1.25rem 1rem !important;
  margin: 0;
}

/* Lists (ul with custom bullets, ol with numbering) */
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Unordered lists with custom bullet */
.list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list ul li {
  padding: 0.5rem 0;
  padding-left: 1.75rem;
  position: relative;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-dim);
}

.list ul li::before {
  content: '●';
  position: absolute;
  left: 0.5rem;
  color: var(--accent);
  font-size: 0.6rem;
}

/* Ordered lists with numbering */
.list ol {
  list-style: decimal;
  list-style-position: inside;
  padding: 0;
  margin: 0;
}

.list ol li {
  padding: 0.5rem 0;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-dim);
}

.list li {
  padding: 0.5rem 0;
  padding-left: 1.75rem;
  position: relative;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-dim);
}

.list li::before {
  content: '●';
  position: absolute;
  left: 0.5rem;
  color: var(--accent);
  font-size: 0.6rem;
}

.occurrence {
  font-size: 0.8rem;
  color: var(--text-faint);
  margin-left: 0.5rem;
}

/* Constantes */
.dossiers-constants {
  margin-bottom: 2rem;
}

.constants-intro {
  font-size: 0.95rem;
  color: var(--text-dim);
  margin-bottom: 1rem;
}

/* Utilitaires */
.card {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}

.card-head {
  padding: 1.5rem;
  background: var(--surface-2);
  font-weight: 600;
  font-size: 1rem;
  color: var(--text);
  border-bottom: 1px solid var(--border-soft);
}

.card-body {
  padding: 1.5rem;
}

.view-enter {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .dossiers-index {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1.5rem;
  }

  .index-btn {
    min-height: 100px;
    padding: 1rem;
  }

  .notes-bars {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .bar-visual-container {
    height: 50px;
  }
}

@media (max-width: 640px) {
  .ov-hero-title {
    font-size: 2rem;
  }

  .ov-hero-sub {
    flex-direction: column;
    gap: 0.5rem;
  }

  .dossiers-index {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 1rem;
  }

  .index-btn {
    padding: 0.75rem;
    font-size: 0.8rem;
    min-height: 85px;
  }

  .index-name {
    font-size: 0.85rem;
  }

  .index-pills {
    gap: 0.3rem;
  }

  .pill {
    width: 8px;
    height: 8px;
  }

  .section-layout {
    gap: 1rem;
  }

  .notes-bars {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .bar-visual-container {
    height: 40px;
  }

  .bar-text {
    font-size: 0.75rem;
  }

  .section-verdict {
    padding: 1.5rem;
  }

  .verdict-text {
    font-size: 0.9rem;
  }

  .matrix-table {
    font-size: 0.8rem;
  }

  .matrix-table th,
  .matrix-table td {
    padding: 0.75rem;
  }

  .name-cell {
    width: 80px;
    font-size: 0.85rem;
  }

  .note-cell {
    width: auto;
    padding: 0.5rem !important;
  }
}
</style>
