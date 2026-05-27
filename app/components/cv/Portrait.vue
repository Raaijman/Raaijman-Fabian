<script setup lang="ts">
import { cvTheme } from '~~/shared/cv-theme';

const props = defineProps<{
  w: number;
  h: number;
  src?: string;
}>();

// Unieke ID per instance voor de SVG-gradient (alleen relevant als src ontbreekt).
const gradientId = useId();

const tone = {
  bg: cvTheme.sidebarBg,
  light: cvTheme.photoLight,
  dark: cvTheme.photoDark,
  shape: cvTheme.photoShape,
  text: cvTheme.photoText,
};

const imgStyle = computed(() => ({
  display: 'block',
  width: `${props.w}px`,
  height: `${props.h}px`,
  objectFit: 'cover' as const,
  objectPosition: '50% 25%',
}));
</script>

<template>
  <img v-if="src" :src="src" :width="w" :height="h" alt="" :style="imgStyle" />
  <svg
    v-else
    :width="w"
    :height="h"
    viewBox="0 0 120 160"
    preserveAspectRatio="xMidYMid slice"
    :style="{ display: 'block', background: tone.bg }"
  >
    <defs>
      <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="tone.light" />
        <stop offset="100%" :stop-color="tone.dark" />
      </linearGradient>
    </defs>
    <rect width="120" height="160" :fill="`url(#${gradientId})`" />
    <path
      d="M 0 160 L 0 138 Q 0 108 30 98 L 48 94 L 72 94 L 90 98 Q 120 108 120 138 L 120 160 Z"
      :fill="tone.shape"
      opacity="0.92"
    />
    <ellipse cx="60" cy="68" rx="24" ry="28" :fill="tone.shape" opacity="0.92" />
    <rect x="50" y="92" width="20" height="10" :fill="tone.shape" opacity="0.92" />
    <text
      x="60"
      y="155"
      text-anchor="middle"
      font-size="6"
      :fill="tone.text"
      font-family="ui-sans-serif,system-ui,sans-serif"
      letter-spacing="0.12em"
      opacity="0.55"
    >
      FOTO
    </text>
  </svg>
</template>
