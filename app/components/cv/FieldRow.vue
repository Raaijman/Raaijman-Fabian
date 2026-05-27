<script setup lang="ts">
import { cvTheme } from '~~/shared/cv-theme';

const props = withDefaults(
  defineProps<{
    label?: string;
    value: string;
    labelW?: number;
    sep?: string;
  }>(),
  {
    label: '',
    labelW: 72,
    sep: ':',
  },
);

const labelText = computed(() => (props.label ? props.label + props.sep : ' '));
</script>

<template>
  <div :style="{ display: 'flex', gap: '6px', alignItems: 'baseline', marginBottom: '2px' }">
    <span
      :style="{
        flex: `0 0 ${labelW}px`,
        color: cvTheme.accent,
        fontVariant: 'small-caps',
        letterSpacing: '0.04em',
        fontSize: '0.78em',
      }"
    >
      {{ labelText }}
    </span>
    <span :style="{ flex: 1 }">{{ value }}</span>
  </div>
</template>
