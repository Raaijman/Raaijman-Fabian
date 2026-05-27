<script setup lang="ts">
// "Download als PDF"-knop. Wordt build-time gegenereerd door
// scripts/generate-pdf.mjs en als statische asset onder /cv.pdf geserveerd.
// `no-print` klasse zorgt dat 'ie niet in de gegenereerde PDF zelf belandt.
</script>

<template>
  <div
    class="no-print"
    :style="{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 50,
    }"
  >
    <UButton
      to="/cv.pdf"
      external
      target="_blank"
      icon="i-lucide-download"
      color="primary"
      variant="solid"
      size="md"
    >
      Download als PDF
    </UButton>
  </div>
</template>
