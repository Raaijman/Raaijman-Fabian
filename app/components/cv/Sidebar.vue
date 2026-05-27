<script setup lang="ts">
import type { CvData } from '~~/shared/types/cv';
import { cvTheme } from '~~/shared/cv-theme';
import foto from '~/assets/foto.png';

defineProps<{ data: CvData }>();

const portraitW = cvTheme.sidebarW - cvTheme.padding * 2;
const portraitH = Math.round(portraitW * 1.28);
</script>

<template>
  <div
    :style="{
      width: `${cvTheme.sidebarW}px`,
      padding: `${cvTheme.padding}px`,
      paddingTop: `${cvTheme.sidebarTopPad}px`,
      background: cvTheme.sidebarBg,
      color: cvTheme.sidebarText,
      borderRight: cvTheme.sidebarRule,
      boxSizing: 'border-box',
      fontFamily: cvTheme.serif,
      fontSize: '10.5px',
      lineHeight: cvTheme.line,
    }"
  >
    <div
      :style="{
        marginBottom: `${cvTheme.section}px`,
        border: `0.5px solid ${cvTheme.accent}55`,
        padding: 0,
        background: '#fff',
      }"
    >
      <CvPortrait :w="portraitW" :h="portraitH" :src="foto" />
    </div>

    <CvSubH>Personalia</CvSubH>
    <CvFieldRow label="Naam" :value="`${data.voornamen} ${data.achternaam}`" />
    <CvFieldRow label="Geboortedatum" :value="data.geboortedatum" />
    <CvFieldRow label="Adres" :value="`${data.straatnaam} ${data.huisnummer}`" />
    <CvFieldRow :value="`${data.postcode} ${data.woonplaats}`" />
    <CvFieldRow label="Telefoon" :value="data.telefoon" />
    <CvFieldRow label="E-mail" :value="data.email" />

    <CvSubH>Opleidingen</CvSubH>
    <div
      v-for="(o, i) in data.opleidingen"
      :key="i"
      :style="{ marginBottom: `${cvTheme.gap}px` }"
    >
      <div :style="{ fontSize: '9.5px', color: cvTheme.accent, letterSpacing: '0.04em' }">
        {{ o.periode }}
      </div>
      <div :style="{ fontWeight: 600 }">{{ o.titel }}</div>
      <div :style="{ fontStyle: 'italic', opacity: 0.85 }">{{ o.plek }}</div>
      <div
        v-if="o.detail"
        :style="{ fontSize: '9.5px', opacity: 0.75, marginTop: '1px' }"
      >
        {{ o.detail }}
      </div>
    </div>

    <div
      v-if="cvTheme.showQuote"
      :style="{
        marginTop: `${cvTheme.section}px`,
        paddingTop: `${cvTheme.gap}px`,
        borderTop: `0.5px solid ${cvTheme.accent}33`,
        fontStyle: 'italic',
        fontSize: '9.5px',
        lineHeight: 1.4,
        color: cvTheme.sidebarText,
        opacity: 0.85,
      }"
    >
      “{{ data.quote.tekst }}”
      <div :style="{ marginTop: '4px', textAlign: 'right', opacity: 0.7 }">
        — {{ data.quote.bron }}
      </div>
    </div>
  </div>
</template>
