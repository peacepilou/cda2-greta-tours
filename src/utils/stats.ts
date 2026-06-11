import { WEEKS } from '../constants/weeks'
import { CONTENT } from '../constants/content'
import type { Week, WeekType } from '../types'

export type Cohort = 'TP' | 'ALT'

const COHORT_TYPES: Record<Cohort, WeekType[]> = {
  TP: ['A', 'B'],
  ALT: ['A', 'ALT'],
}

function cohortWeeks(cohort: Cohort): Week[] {
  const types = COHORT_TYPES[cohort]
  return WEEKS.filter(w => types.includes(w.type) && w.hrs > 0 && CONTENT[w.iso] !== undefined)
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

export function hoursByBloc(cohort: Cohort): Record<string, number> {
  const acc: Record<string, number> = {}
  for (const w of cohortWeeks(cohort)) {
    const bloc = CONTENT[w.iso].bloc
    acc[bloc] = (acc[bloc] ?? 0) + w.hrs
  }
  return acc
}

export function totalHours(cohort: Cohort): number {
  return cohortWeeks(cohort).reduce((sum, w) => sum + w.hrs, 0)
}

export interface BlocBarStat {
  bloc: string
  hrs: number
  pct: number
}

/** Blocs primaires dans l'ordre chronologique de première apparition. */
export function primaryBlocs(cohort: Cohort): string[] {
  const order: string[] = []
  for (const w of cohortWeeks(cohort)) {
    const bloc = CONTENT[w.iso].bloc
    if (!order.includes(bloc)) order.push(bloc)
  }
  return order
}

export function blocBars(cohort: Cohort): BlocBarStat[] {
  const hours = hoursByBloc(cohort)
  const total = totalHours(cohort)
  return primaryBlocs(cohort).map(bloc => ({
    bloc,
    hrs: hours[bloc],
    pct: round1((hours[bloc] / total) * 100),
  }))
}

export interface BcStat {
  bc: string
  hrs: number
  pct: number
}

const BC_CODES = ['BC01', 'BC02', 'BC03']

export function bcDistribution(cohort: Cohort): BcStat[] {
  const acc: Record<string, number> = { BC01: 0, BC02: 0, BC03: 0 }
  let bcTotal = 0
  for (const w of cohortWeeks(cohort)) {
    const bcs = CONTENT[w.iso].blocs_cda
    if (!bcs.length) continue
    bcTotal += w.hrs
    const share = w.hrs / bcs.length
    for (const bc of bcs) acc[bc] += share
  }
  // pct relatif aux heures porteuses d'au moins un bloc CDA — somme ≈ 100%
  return BC_CODES.map(bc => ({
    bc,
    hrs: round1(acc[bc]),
    pct: round1((acc[bc] / bcTotal) * 100),
  }))
}

export interface ThreadStat {
  name: string
  weeks: string[]
  count: number
}

export function transversalThreads(cohort: Cohort): ThreadStat[] {
  const map = new Map<string, string[]>()
  for (const w of cohortWeeks(cohort)) {
    for (const name of CONTENT[w.iso].extraBlocs ?? []) {
      if (!map.has(name)) map.set(name, [])
      map.get(name)!.push(w.iso)
    }
  }
  return [...map.entries()].map(([name, weeks]) => ({ name, weeks, count: weeks.length }))
}

// Fils transversaux purs : exclut les blocs à la fois extraBlocs ponctuels ET blocs primaires (Git, Spring Boot, CI/CD).
export function pureThreads(cohort: Cohort): ThreadStat[] {
  const primaries = primaryBlocs(cohort)
  return transversalThreads(cohort).filter(t => !primaries.includes(t.name))
}

export function blocWeeks(bloc: string, cohort: Cohort): string[] {
  return cohortWeeks(cohort)
    .filter(w => {
      const c = CONTENT[w.iso]
      return c.bloc === bloc || c.extraBlocs?.includes(bloc)
    })
    .map(w => w.iso)
}

export interface BlocHours {
  hrs: number
  pct: number
}

/** Heures + % d'un bloc primaire — null si le bloc n'a aucune heure en primaire (bloc transversal). */
export function blocHours(bloc: string, cohort: Cohort): BlocHours | null {
  const hrs = hoursByBloc(cohort)[bloc]
  if (!hrs) return null
  return { hrs, pct: round1((hrs / totalHours(cohort)) * 100) }
}

/** Format français des heures : 864.5 → "864,5" */
export function fmtHours(n: number): string {
  return String(n).replace('.', ',')
}
