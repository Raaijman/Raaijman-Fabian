// Single source of truth voor het CV. Bewerk hier — `pnpm dev` toont
// wijzigingen live. Deploy via push naar `release/fabian`.

import type { CvData } from '~~/shared/types/cv';

export const cvData: CvData = {
  // ── Personalia ─────────────────────────────────────────────────────────
  voornamen: 'Fabian',
  achternaam: 'Raaijman',
  geboortedatum: '4 januari 1994',

  // Contactgegevens
  straatnaam: 'Teut',
  huisnummer: '65',
  postcode: '3811 WN',
  woonplaats: 'Amersfoort',
  telefoon: '+31 6 83 35 80 07',
  email: 'fabian@raaijman.nl',

  // ── Quote (optioneel weer te geven, default aan) ───────────────────────
  quote: {
    tekst: 'Wat niet goed is voor de korf, is niet goed voor de bijen.',
    bron: 'Marcus Aurelius',
  },

  // ── Werkervaring ───────────────────────────────────────────────────────
  // Eén doorlopend werkgeverblok: Haskoning (voorheen Royal HaskoningDHV;
  // naamswijziging mei 2025). Projecten in omgekeerd-chronologische volgorde.
  werkgevers: [
    {
      naam: 'Haskoning',
      noot: 'voorheen Royal HaskoningDHV; naamswijziging mei 2025',
      periode: 'mrt. 2020 – heden',
      rol: 'Algoritmeontwerper en simulatiespecialist',
      projecten: [
        {
          titel: 'AI-ondersteunde AutoLISP voor niet-programmeurs',
          tekst:
            'Cursus ontwikkeld waarmee niet-programmeurs met behulp van AI ' +
            'hun eigen AutoLISP-routines schrijven — laagdrempelige ' +
            'automatisering van het dagelijks AutoCAD-werk. Aanleiding voor ' +
            'een uitnodiging voor Autodesk University 2026 in Las Vegas.',
          tag: '2026 · AI · Autodesk University',
        },
        {
          titel: 'Teamleider Rail Digital Engineering',
          tekst:
            'Sinds 1 januari 2026 teamleider van de groep Rail Digital ' +
            'Engineering — op dit moment negen personen inclusief mijzelf.',
          tag: '2026 · leiderschap',
        },
        {
          titel: 'Marge op ontwerpregel ProRail-voorschrift 60040',
          tekst:
            'Artikel over de noodzaak van marge op de eerste eis in ProRails ' +
            'ontwerpvoorschrift 60040 (regel 55): zónder die marge ontstaan ' +
            'onnodig conservatieve snelheidslimieten. Berkroond met een beurs. ' +
            'voor IRSE Aspect 2023 in Melbourne.',
          tag: '2023 · onderzoek · IRSE Melbourne',
        },
        {
          titel: 'Hellingsegmenteringsalgoritme',
          tekst:
            'Onderzoek naar het robuust omzetten van ruwe hoogtemetingen ' +
            'langs het spoor in hellingen die het hellingsprofiel zo goed ' +
            'mogelijk benaderen. Resulteerde in een algoritme en een ' +
            'vervolgopdracht met Sweco voor het branchbreed berekenen van ' +
            '‘Gradient Markers’ in IMSpoor.',
          tag: 'algoritmiek · Data Science',
        },
        {
          titel: 'Oprichting Rail Digital Engineering',
          tekst:
            'In 2022 samen met Jonathan Hoogvliet en Sytse Bisschop de ' +
            'groep Rail Digital Engineering opgericht — een interne ' +
            'kennisgroep gericht op digitalisering in en rondom het spoor.',
          tag: '2022',
        },
        {
          titel: 'Simulo',
          tekst:
            'Software voor het uitvoeren van rij- en opvolgtijdberekeningen ' +
            'onder zowel het oude treinbeveiligingssysteem NS’54 als het ' +
            'nieuwe systeem ERTMS. De applicatie wordt ook ingezet voor ' +
            'tonnage- en geluidsstudies en ondersteunt OpenTrack.',
          tag: 'simulatie · ERTMS · algoritmiek',
        },
        {
          titel: 'Inspectieproject Rijn & Gouwe',
          tekst:
            'Met Coen van Battum en Jonathan Hoogvliet gedrieën ' +
            'verantwoordelijk voor de projectleiding en facilitering van ' +
            'de inspectie van PGO-gebied Rijn & Gouwe. Persoonlijk het ' +
            'dataplatform opgezet en verantwoordelijk geweest voor de ' +
            'opleveringen.',
          tag: 'projectleiding · Data Engineering',
        },
      ],
    },
  ],

  // ── Voormalige werkgevers (onderwijs) ──────────────────────────────────
  voormalig: [
    { periode: 'sep. 2019 – mrt. 2020', rol: 'Natuurkundedocent', plek: 'Lyceum Ypenburg, Den Haag' },
    { periode: 'jan. 2018 – mei 2018', rol: 'Wiskundedocent', plek: 'Luzac, Den Haag (Noordeinde)' },
    { periode: 'sep. 2017 – aug. 2018', rol: 'Natuurkundedocent', plek: "'t Maartenscollege, Voorburg" },
    { periode: 'jan. 2016 – aug. 2017', rol: 'Wiskundedocent', plek: 'Lyceum Ypenburg, Den Haag' },
  ],

  // ── Opleidingen ────────────────────────────────────────────────────────
  opleidingen: [
    {
      periode: 'sep. 2019 – aug. 2020',
      titel: 'MSc Econometrics',
      plek: 'Erasmus Universiteit Rotterdam',
      detail: 'Specialisatie Operations Research and Quantitative Logistics.',
    },
    {
      periode: 'sep. 2018 – aug. 2019',
      titel: 'Pre-master Econometrie',
      plek: 'Erasmus Universiteit Rotterdam',
      detail: '(Voor)specialisatie Finance & OR / Quantitative Logistics.',
    },
    {
      periode: 'sep. 2012 – aug. 2017',
      titel: 'BSc Technische Natuurkunde',
      plek: 'TU Delft',
    },
    {
      periode: 'aug. 2015 – aug. 2017',
      titel: 'Lesbevoegdheid natuurkunde v.o.',
      plek: 'TU Delft · SEC',
      detail: 'Minor Educatie gecombineerd met afgeronde bachelor.',
    },
    {
      periode: 'sep. 2006 – mei 2012',
      titel: 'vwo-B',
      plek: "Meridiaan College 't Hooghelandt, Amersfoort",
    },
  ],

  // ── Publicaties / scripties ────────────────────────────────────────────
  publicaties: [
    {
      jaar: '2026',
      type: 'Conferentiebijdrage',
      titel: 'AI-Assisted AutoLISP in AutoCAD: A Practical Workflow for Non-Programmers',
      noot: 'Geaccpeteerde inzending voor Autodesk University 2026, Las Vegas.',
    },
    {
      jaar: '2023',
      type: 'Vakartikel',
      titel: 'Noodzaak van marge op de eerste eis in ProRails ontwerpvoorschrift 60040 regel 55',
      noot: 'Berkroonde inzending voor IRSE Aspect 2023 in Melbourne.',
    },
    {
      jaar: '2020',
      type: 'Master thesis',
      titel: 'Revision of berth locations in The Netherlands',
      noot: 'Herziening van ligplaatslocaties van binnenvaartschepen in Nederland. Erasmus Universiteit Rotterdam.',
    },
    {
      jaar: '2017',
      type: 'Bachelor thesis',
      titel: 'A study on the appearance, excitation and applications of surface plasmon polaritons',
      noot: 'Onderzoek naar het verschijnen, exciteren en toepassen van oppervlakteplasmonpolaritonen. TU Delft.',
    },
  ],
};
