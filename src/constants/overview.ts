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
  { label: 'JavaScript',      emoji: '🌼', hrs: 140, bloc: 'JavaScript' },
  { label: 'Git',             emoji: '🐙', hrs: 35,  bloc: 'Git' },
  { label: 'Vision métier',   emoji: '🎯', hrs: 70,  bloc: 'Vision métier' },
  { label: 'IA fondamentaux', emoji: '🤖', hrs: 28,  bloc: 'IA' },
  { label: 'TypeScript',      emoji: '🟦', hrs: 60,  bloc: 'TypeScript' },
  { label: 'Angular',         emoji: '🛡️', hrs: 137, bloc: 'Angular' },
  { label: 'Java',            emoji: '☕', hrs: 67,  bloc: 'Java' },
  { label: 'SQL',             emoji: '🗄️', hrs: 70,  bloc: 'SQL' },
  { label: 'Spring Boot',     emoji: '🍃', hrs: 105, bloc: 'Spring Boot' },
  { label: 'CI/CD + Docker',  emoji: '⚙️', hrs: 35,  bloc: 'CI/CD' },
  { label: 'Certification',   emoji: '🎓', hrs: 35,  bloc: 'Certification' },
]

export const TOTAL_HRS = 782

export const BC_CARDS: BcCard[] = [
  {
    code: 'BC01', pct: 45, hrs: 392, bloc: 'TypeScript',
    label: 'UI · Front · Composants · Gestion projet',
    modules: ['JS', 'Git', 'TS', 'Angular', 'Vision métier', 'Figma'],
  },
  {
    code: 'BC02', pct: 35, hrs: 305, bloc: 'Java',
    label: 'Architecture · BDD · Accès données',
    modules: ['Java', 'SQL', 'NoSQL (concept)', 'Spring Boot', 'JPA'],
  },
  {
    code: 'BC03', pct: 20, hrs: 175, bloc: 'Alternants',
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
