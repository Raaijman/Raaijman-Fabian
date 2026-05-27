// Schaalt het vaste A4-blad (794 px breed) verhoudingsgewijs zodra de viewport
// smaller is. Puur CSS kan de factor niet uit de viewportbreedte afleiden
// (calc() mag geen lengte / lengte → getal doen), dus berekenen we 'm hier en
// zetten 'm als --sheet-scale op :root. main.css gebruikt die var voor de
// transform-scale + de geschaalde sizing-wrapper.
import { cvTheme } from '~~/shared/cv-theme';

export default defineNuxtPlugin(() => {
  const apply = () => {
    // clientWidth (niet innerWidth): het blad is altijd hoger dan de viewport,
    // dus er is altijd een verticale scrollbar. innerWidth telt die scrollbar-
    // breedte mee, waardoor het op innerWidth/794 geschaalde blad ~15px breder
    // werd dan de beschikbare content-breedte → horizontale scrollbar op smalle
    // viewports. clientWidth sluit de scrollbar uit en laat het blad precies
    // passen.
    const available = document.documentElement.clientWidth;
    const scale = Math.min(1, available / cvTheme.pageW);
    document.documentElement.style.setProperty('--sheet-scale', String(scale));
  };

  apply();
  window.addEventListener('resize', apply, { passive: true });

  // Geen Nuxt-hook voor "app unmounted" — in productie leeft de listener voor de
  // hele page-lifecycle (onschadelijk, navigatie herlaadt de pagina). Cleanup is
  // alleen relevant bij HMR: elke hot-reload her-runt de plugin en zou anders een
  // extra resize-listener stapelen.
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener('resize', apply);
    });
  }
});
