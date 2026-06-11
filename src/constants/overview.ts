export interface BlocBarMeta {
  label: string
  emoji: string
}

export interface BcCard {
  code: string
  bloc: string
  label: string
  modules: string[]
}

export interface BcDef {
  code: string
  title: string
  sub: string
}

// Habillage des barres de répartition — les heures viennent de utils/stats.ts
export const BLOC_BAR_META: Record<string, BlocBarMeta> = {
  'Démarrage':     { label: 'Démarrage',       emoji: '🚀' },
  'JavaScript':    { label: 'JavaScript',      emoji: '🌼' },
  'Git':           { label: 'Git',             emoji: '🐙' },
  'Vision métier': { label: 'Vision métier',   emoji: '🎯' },
  'IA':            { label: 'IA fondamentaux', emoji: '🤖' },
  'TypeScript':    { label: 'TypeScript',      emoji: '🟦' },
  'Angular':       { label: 'Angular',         emoji: '🛡️' },
  'Java':          { label: 'Java',            emoji: '☕' },
  'SQL':           { label: 'SQL',             emoji: '🗄️' },
  'Spring Boot':   { label: 'Spring Boot',     emoji: '🍃' },
  'CI/CD':         { label: 'CI/CD + Docker',  emoji: '⚙️' },
  'Certification': { label: 'Certification',   emoji: '🎓' },
  'Alternants':    { label: 'Alternants',      emoji: '🧑‍💼' },
}

export const BC_CARDS: BcCard[] = [
  {
    code: 'BC01', bloc: 'TypeScript',
    label: 'UI · Front · Composants · Gestion projet',
    modules: ['JS', 'Git', 'TS', 'Angular', 'Vision métier', 'Figma'],
  },
  {
    code: 'BC02', bloc: 'Java',
    label: 'Architecture · BDD · Accès données',
    modules: ['Java', 'SQL', 'NoSQL (concept)', 'Spring Boot', 'JPA'],
  },
  {
    code: 'BC03', bloc: 'Alternants',
    label: 'Tests · CI/CD · Déploiement · Anglais B1',
    modules: ['Tests unitaires', 'Plan de tests', 'Docker', 'GitHub Actions', 'VPS', 'Anglais certif'],
  },
]

export const BC_DEFS: BcDef[] = [
  { code: 'BC01', title: 'BC01 — Développer une application sécurisée', sub: 'UI · Composants métier · Gestion projet' },
  { code: 'BC02', title: 'BC02 — Concevoir et développer en couches', sub: 'Architecture · BDD SQL · NoSQL (concept) · Accès données' },
  { code: 'BC03', title: 'BC03 — Préparer le déploiement', sub: 'Tests · Documentation · CI/CD · DevOps' },
]

export const OPEN_QUESTIONS: string[] = [
  'Contenu de la semaine 23-27 août 2027 (alternants en centre — S34)',
  'Confirmation semaine 13-17 sept 2027 (alternants en entreprise ou école — S37)',
  'Date exacte jury alternants (fin sept 2027 à confirmer — S39b)',
  'Constitution des groupes fil rouge temps plein — critères de formation des équipes',
  'Plateforme de certification anglais B1 à choisir (PIX, Cambridge, autre)',
]
