<script setup lang="ts">
import type { CvData } from '~~/shared/types/cv';
import { cvTheme } from '~~/shared/cv-theme';

defineProps<{ data: CvData }>();
</script>

<template>
  <div
    :style="{
      flex: 1,
      padding: `${cvTheme.padding}px`,
      paddingTop: `${cvTheme.mainTopPad}px`,
      boxSizing: 'border-box',
      minWidth: 0,
      fontFamily: cvTheme.serif,
      fontSize: '11px',
      lineHeight: cvTheme.line,
      color: cvTheme.bodyInk,
    }"
  >
    <!-- Header met naam -->
    <div
      :style="{
        marginBottom: '18px',
        paddingBottom: '14px',
        borderBottom: '0.5px solid #d8cfbe',
      }"
    >
      <div
        :style="{
          fontFamily: cvTheme.serif,
          fontSize: `${cvTheme.nameSize}px`,
          fontWeight: cvTheme.nameWeight,
          letterSpacing: cvTheme.nameTrack,
          lineHeight: 1.0,
          color: cvTheme.nameColor,
        }"
      >
        {{ data.voornamen }} {{ data.achternaam }}
      </div>
    </div>

    <CvSectionH>Werkervaring</CvSectionH>
    <div
      v-for="(w, i) in data.werkgevers"
      :key="i"
      :style="{ marginBottom: `${cvTheme.section}px` }"
    >
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '12px',
        }"
      >
        <div
          :style="{
            fontFamily: cvTheme.serif,
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            color: cvTheme.ink,
          }"
        >
          {{ w.naam }}
        </div>
        <div
          :style="{
            fontSize: '10px',
            color: cvTheme.accent,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }"
        >
          {{ w.periode }}
        </div>
      </div>
      <div :style="{ marginBottom: `${cvTheme.gap}px` }" />
      <ol
        :style="{
          margin: 0,
          paddingLeft: '22px',
          counterReset: 'p',
          listStyle: 'decimal',
        }"
      >
        <li
          v-for="(p, j) in w.projecten"
          :key="j"
          :style="{ marginBottom: `${cvTheme.block - 4}px`, paddingLeft: '2px' }"
        >
          <div :style="{ display: 'inline' }">
            <span :style="{ fontWeight: 600 }">{{ p.titel }}</span>
            <CvProjectTag v-if="p.tag">{{ p.tag }}</CvProjectTag>
          </div>
          <div
            lang="nl"
            :style="{
              marginTop: '2px',
              textAlign: 'justify',
              textAlignLast: 'left',
              hyphens: 'auto',
              WebkitHyphens: 'auto',
              msHyphens: 'auto',
            }"
          >
            {{ p.tekst }}
          </div>
        </li>
      </ol>
    </div>

    <CvSectionH>Voormalige werkgevers</CvSectionH>
    <table :style="{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px' }">
      <tbody>
        <tr v-for="(vm, i) in data.voormalig" :key="i" :style="{ verticalAlign: 'baseline' }">
          <td
            :style="{
              padding: '2px 12px 2px 0',
              color: cvTheme.accent,
              whiteSpace: 'nowrap',
              letterSpacing: '0.03em',
            }"
          >
            {{ vm.periode }}
          </td>
          <td :style="{ padding: '2px 0', fontWeight: 600 }">{{ vm.rol }}</td>
          <td
            :style="{
              padding: '2px 0 2px 8px',
              fontStyle: 'italic',
              color: cvTheme.mutedInk,
            }"
          >
            {{ vm.plek }}
          </td>
        </tr>
      </tbody>
    </table>

    <CvSectionH>Publicaties &amp; scripties</CvSectionH>
    <div
      v-for="(p, i) in data.publicaties"
      :key="i"
      :style="{ marginBottom: `${cvTheme.gap + 1}px` }"
    >
      <div :style="{ display: 'flex', gap: '10px', alignItems: 'baseline' }">
        <span
          :style="{
            color: cvTheme.accent,
            fontSize: '10px',
            letterSpacing: '0.04em',
          }"
        >
          {{ p.jaar }}
        </span>
        <span :style="{ fontStyle: 'italic', color: '#6f6862', fontSize: '10px' }">
          {{ p.type }}
        </span>
      </div>
      <div :style="{ fontWeight: 600, marginTop: '1px' }">{{ p.titel }}</div>
      <div
        v-if="p.noot"
        lang="nl"
        :style="{
          fontSize: '10px',
          color: cvTheme.mutedInk,
          marginTop: '1px',
          textAlign: 'justify',
          textAlignLast: 'left',
          hyphens: 'auto',
          WebkitHyphens: 'auto',
          msHyphens: 'auto',
        }"
      >
        {{ p.noot }}
      </div>
    </div>
  </div>
</template>
