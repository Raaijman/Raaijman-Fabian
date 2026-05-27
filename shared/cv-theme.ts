// Vaste design-config voor de V_KLASSIEK-variant uit de oude React-playground.
// Geen runtime-tweaks meer (accent/font/density/columns/quote zijn vast).
// Wil je deze waardes ooit weer dynamisch maken: extraheer naar runtime-state
// en lees per-component via een composable.

export const cvTheme = {
  // ── Kleuren ──────────────────────────────────────────────────────────
  accent: '#27496d', // donker navy
  ink: '#1a1815',
  bodyInk: '#1f1c18',
  mutedInk: '#5a544e',
  hintInk: '#7a7268',
  pageBg: '#fcfbf8',

  // ── Typografie ───────────────────────────────────────────────────────
  serif: '"EB Garamond", "Latin Modern Roman", "Garamond", "Times New Roman", serif',
  sans: '"Public Sans", ui-sans-serif, system-ui, sans-serif',

  // ── Sidebar ──────────────────────────────────────────────────────────
  sidebarW: 264,
  sidebarBg: '#f4efe5',
  sidebarText: '#3a342d',
  sidebarRule: '0.5px solid #d8cfbe',
  sidebarTopPad: 32,

  // ── Main ─────────────────────────────────────────────────────────────
  mainTopPad: 32,

  // ── Paginadekking ────────────────────────────────────────────────────
  padding: 32,
  pageW: 794, // A4 96 dpi
  pageH: 1123,

  // ── Spacing (density 'regular') ──────────────────────────────────────
  gap: 11,
  block: 14,
  section: 22,
  line: 1.48,

  // ── Headers ──────────────────────────────────────────────────────────
  nameSize: 34,
  nameWeight: 500,
  nameTrack: '-0.01em',
  nameColor: '#1a1815',

  headSize: 11.5,
  headWeight: 600,
  headTrack: '0.16em',

  subHeadSize: 9.5,

  // ── Portret-silhouet (alleen gebruikt als data.foto ontbreekt) ───────
  photoLight: '#d8cfbe',
  photoDark: '#a89980',
  photoShape: '#5d564a',
  photoText: '#fff',

  // ── Toggles ──────────────────────────────────────────────────────────
  // Matched baseline `CV Fabian Raaijman 2026.html` / `.pdf` (mei 2026):
  // quote stond daar uit. Aanzetten = sidebar overflow naar pagina 2.
  showQuote: false,
} as const;

export type CvTheme = typeof cvTheme;
