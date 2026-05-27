<script setup lang="ts">
import type { CvData } from '~~/shared/types/cv';
import { cvTheme } from '~~/shared/cv-theme';

defineProps<{ data: CvData }>();
</script>

<template>
  <div
    class="cv-sheet"
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
    }"
  >
    <CvSidebar :data="data" />
    <CvMain :data="data" />
  </div>
</template>
