export interface BlocBar {
  label: string
  emoji: string
  hrs: number
  bloc: string
}

export interface BcCard {
  code: string
  pct: number
  hrs: number
  bloc: string
  label: string
  modules: string[]
}

export interface BcDef {
  code: string
  title: string
  sub: string
}

export const BLOCS_BARS: BlocBar[] = [
  { label: 'Angular',         emoji: '🛡️', hrs: 129, bloc: 'Angular' },
  { label: 'Spring Boot',     emoji: '🍃', hrs: 105, bloc: 'Spring Boot' },
  { label: 'CI/CD + Docker',  emoji: '🤖', hrs: 105, bloc: 'CI/CD' },
  { label: 'Projet + Certif', emoji: '🚀', hrs: 115, bloc: 'Projet' },
  { label: 'Java',            emoji: '☕', hrs: 70,  bloc: 'Java' },
  { label: 'JavaScript',      emoji: '🌼', hrs: 70,  bloc: 'JavaScript' },
  { label: 'Fondamentaux',    emoji: '📐', hrs: 70,  bloc: 'Fondamentaux' },
  { label: 'Git',             emoji: '🐙', hrs: 70,  bloc: 'Git' },
  { label: 'SQL',             emoji: '🗄️', hrs: 67,  bloc: 'SQL' },
  { label: 'TypeScript',      emoji: '🟦', hrs: 56,  bloc: 'TypeScript' },
  { label: 'Démarrage IA',    emoji: '✨', hrs: 10,  bloc: 'Démarrage' },
  { label: 'Vision métier',   emoji: '🎯', hrs: 14,  bloc: 'Vision métier' },
]

export const TOTAL_HRS = 871

export const BC_CARDS: BcCard[] = [
  {
    code: 'BC01', pct: 45, hrs: 392, bloc: 'TypeScript',
    label: 'UI · Composants · Gestion projet',
    modules: ['Git', 'JS', 'TS', 'Angular', 'Vision métier'],
  },
  {
    code: 'BC02', pct: 35, hrs: 305, bloc: 'Java',
    label: 'Architecture · BDD · Accès données',
    modules: ['Algo', 'Java', 'SQL', 'Spring Boot', 'JPA'],
  },
  {
    code: 'BC03', pct: 20, hrs: 174, bloc: 'Alternants',
    label: 'Tests · CI/CD · Déploiement',
    modules: ['Git', 'Tests unitaires', 'Docker', 'GitHub Actions', 'VPS'],
  },
]

export const BC_DEFS: BcDef[] = [
  { code: 'BC01', title: 'BC01 — Développer une application sécurisée', sub: 'UI · Composants métier · Gestion projet' },
  { code: 'BC02', title: 'BC02 — Concevoir et développer en couches', sub: 'Architecture · BDD SQL/NoSQL · Accès données' },
  { code: 'BC03', title: 'BC03 — Préparer le déploiement', sub: 'Tests · Documentation · CI/CD · DevOps' },
]

export const OPEN_QUESTIONS: string[] = [
  'Contenu de la semaine 23-27 août (alternants en centre)',
  'Confirmation semaine 13-17 sept (alternants en entreprise ou école ?)',
  'Date exacte jury alternants (fin sept 2027 à confirmer)',
  'Constitution des groupes fil rouge (temps plein)',
  "Documents de cadrage à produire : CDC, backlog, critères d'acceptance, sprint planning, architecture template, README",
]
