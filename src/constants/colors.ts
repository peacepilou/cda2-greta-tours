export const BLOC_COLORS: Record<string, string> = {
  'Démarrage':     '#64748b',
  'Fondamentaux':  '#a855f7',
  'Git':           '#f97316',
  'JavaScript':    '#f59e0b',
  'TypeScript':    '#3b82f6',
  'Vision métier': '#ec4899',
  'IA':            '#8b5cf6',
  'Angular':       '#ef4444',
  'CI/CD':         '#6366f1',
  'Java':          '#ea580c',
  'Java / SQL':    '#ea580c',
  'SQL':           '#14b8a6',
  'Spring Boot':   '#22c55e',
  'Projet':        '#0ea5e9',
  'Certification': '#eab308',
  'Alternants':    '#a78bfa',
  'Fil rouge':     '#dc2626',
  'Conception':   '#0891b2',
}

export function blocColor(bloc: string): string {
  return BLOC_COLORS[bloc] ?? '#64748b'
}
