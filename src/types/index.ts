export type WeekType = 'A' | 'B' | 'ALT' | 'VAC' | 'STAGE'

export type IaMode = 'theory' | 'solo' | 'mixed' | 'copilot' | 'delegation' | 'none'

export interface Week {
  iso: string
  lundi: string
  vendredi: string
  type: WeekType
  hrs: number
  special?: string
}

export interface NotionLink {
  label: string
  url: string
}

export interface WeekContent {
  title: string
  bloc: string
  extraBlocs?: string[]   // blocs secondaires filtrables (en plus du bloc primaire)
  notions: string[]
  ia: string
  ia_mode: IaMode
  blocs_cda: string[]
  fondamentaux: string
  links: NotionLink[]
}

export interface BlocColor {
  bg: string
  border: string
}

export interface BlocStats {
  hrs: number
  pct: number
}

export type ViewMode = 'overview' | 'compressed' | 'detailed'
