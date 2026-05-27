<script setup lang="ts">
import type { CvData } from '~~/shared/types/cv';
import { cvTheme } from '~~/shared/cv-theme';

defineProps<{ data: CvData }>();
</script>

<template>
  <div
    :style="{
      width: `${cvTheme.pageW}px`,
      height: `${cvTheme.pageH}px`,
      background: cvTheme.pageBg,
      display: 'flex',
      flexDirection: 'row',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      color: cvTheme.bodyInk,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.06)',
    }"
  >
    <CvSidebar :data="data" />
    <CvMain :data="data" />
  </div>
</template>
