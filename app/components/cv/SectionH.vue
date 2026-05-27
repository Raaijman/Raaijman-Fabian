<script setup lang="ts">
import { cvTheme } from '~~/shared/cv-theme';

defineProps<{ sub?: string }>();
</script>

<template>
  <div
    :style="{
      marginTop: `${cvTheme.section}px`,
      marginBottom: `${cvTheme.block - 4}px`,
      borderBottom: `0.5px solid ${cvTheme.accent}55`,
      paddingBottom: '4px',
    }"
  >
    <div
      :style="{
        fontFamily: cvTheme.serif,
        fontSize: `${cvTheme.headSize}px`,
        fontWeight: cvTheme.headWeight,
        letterSpacing: cvTheme.headTrack,
        textTransform: 'uppercase',
        color: cvTheme.accent,
      }"
    >
      <slot />
    </div>
    <div
      v-if="sub"
      :style="{
        fontSize: '10px',
        fontStyle: 'italic',
        color: cvTheme.hintInk,
        marginTop: '2px',
      }"
    >
      {{ sub }}
    </div>
  </div>
</template>
