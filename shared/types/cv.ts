// CV-datamodel. Spiegelt 1-op-1 de oude window.cvData uit de React-playground.
// `foto` zit niet in dit type — die wordt als bundled asset geïmporteerd in
// CvPortrait.vue, niet als data-veld.

export interface Quote {
  tekst: string;
  bron: string;
}

export interface Project {
  titel: string;
  tekst: string;
  tag?: string;
}

export interface Werkgever {
  naam: string;
  noot?: string;
  periode: string;
  rol: string;
  projecten: Project[];
}

export interface Voormalig {
  periode: string;
  rol: string;
  plek: string;
}

export interface Opleiding {
  periode: string;
  titel: string;
  plek: string;
  detail?: string;
}

export interface Publicatie {
  jaar: string;
  type: string;
  titel: string;
  noot?: string;
}

export interface CvData {
  voornamen: string;
  achternaam: string;
  geboortedatum: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  woonplaats: string;
  telefoon: string;
  email: string;
  quote: Quote;
  werkgevers: Werkgever[];
  voormalig: Voormalig[];
  opleidingen: Opleiding[];
  publicaties: Publicatie[];
}
