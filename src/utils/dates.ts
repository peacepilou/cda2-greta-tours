export function fmtDate(str: string): string {
  const d = new Date(str + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export function fmtRange(lundi: string, vendredi: string): string {
  const dl = new Date(lundi + 'T00:00:00')
  const dv = new Date(vendredi + 'T00:00:00')
  const ml = dl.toLocaleDateString('fr-FR', { month: 'short' })
  const mv = dv.toLocaleDateString('fr-FR', { month: 'short' })
  const dayl = dl.getDate()
  const dayv = dv.getDate()
  if (ml === mv) return `${dayl}–${dayv} ${ml}`
  return `${dayl} ${ml} – ${dayv} ${mv}`
}

export function titleEmoji(title: string): string {
  if (!title) return '·'
  const m = title.match(/^(\p{Emoji_Presentation}|\p{Emoji}️)/u)
  return m ? m[0] : '·'
}

export function titleText(title: string): string {
  return (title || '').replace(/^(\p{Emoji_Presentation}|\p{Emoji}️)\s*/u, '').trim()
}

export function monthKey(lundi: string): string {
  const d = new Date(lundi + 'T00:00:00')
  const key = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  return key.charAt(0).toUpperCase() + key.slice(1)
}
