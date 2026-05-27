<script setup lang="ts">
import { cvData } from '~~/shared/data/cv-data';

useHead({
  title: `${cvData.voornamen} ${cvData.achternaam} — CV`,
  meta: [
    {
      name: 'description',
      content: `Curriculum Vitae van ${cvData.voornamen} ${cvData.achternaam}.`,
    },
  ],
});
</script>

<template>
  <div class="cv-wrap">
    <DownloadButton />
    <div class="cv-viewport">
      <CvPage :data="cvData" />
    </div>
  </div>
</template>
