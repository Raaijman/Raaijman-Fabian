<script setup lang="ts">
import { cvTheme } from '~~/shared/cv-theme';
</script>

<template>
  <span
    :style="{
      fontSize: '0.7em',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: cvTheme.accent,
      opacity: 0.75,
      fontStyle: 'normal',
      fontFamily: cvTheme.sans,
      marginLeft: '8px',
      whiteSpace: 'nowrap',
    }"
  >
    <slot />
  </span>
</template>
