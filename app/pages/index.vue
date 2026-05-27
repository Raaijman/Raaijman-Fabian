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
    <CvPage :data="cvData" />
  </div>
</template>
