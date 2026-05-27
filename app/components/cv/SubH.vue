<script setup lang="ts">
import { cvTheme } from '~~/shared/cv-theme';
</script>

<template>
  <div
    :style="{
      marginTop: `${cvTheme.section - 6}px`,
      marginBottom: '6px',
      fontFamily: cvTheme.serif,
      fontSize: `${cvTheme.subHeadSize}px`,
      fontWeight: 600,
      color: cvTheme.accent,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }"
  >
    <slot />
  </div>
</template>
