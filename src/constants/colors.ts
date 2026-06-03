import type { BlocStats } from '../types'

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
}

export function blocColor(bloc: string): string {
  return BLOC_COLORS[bloc] ?? '#64748b'
}

const BLOC_STATS: Record<string, BlocStats> = {
  'Démarrage':     { hrs: 11,  pct: 1  },
  'JavaScript':    { hrs: 140, pct: 16 },
  'Git':           { hrs: 35,  pct: 4  },
  'Vision métier': { hrs: 70,  pct: 8  },
  'IA':            { hrs: 28,  pct: 3  },
  'TypeScript':    { hrs: 60,  pct: 7  },
  'Angular':       { hrs: 137, pct: 16 },
  'Java':          { hrs: 67,  pct: 8  },
  'SQL':           { hrs: 70,  pct: 8  },
  'Spring Boot':   { hrs: 105, pct: 12 },
  'CI/CD':         { hrs: 35,  pct: 4  },
  'Certification': { hrs: 109, pct: 13 },
  'Alternants':    { hrs: 35,  pct: 4  },
  // Legacy blocs kept for backward compatibility
  'Fondamentaux':  { hrs: 70,  pct: 8  },
  'Java / SQL':    { hrs: 70,  pct: 8  },
  'Projet':        { hrs: 115, pct: 13 },
}

export function getBlocStats(bloc: string): BlocStats | null {
  return BLOC_STATS[bloc] ?? null
}

// Keep legacy export for backward compatibility
export function getColor(bloc: string): { bg: string; border: string } {
  const color = blocColor(bloc)
  return { bg: color, border: color }
}
