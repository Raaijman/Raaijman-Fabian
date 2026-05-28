<script setup lang="ts">
// "Download als PDF"-knop. Wordt build-time gegenereerd door
// scripts/generate-pdf.mjs en als statische asset onder /cv.pdf geserveerd.
// `no-print` klasse zorgt dat 'ie niet in de gegenereerde PDF zelf belandt.
</script>

<template>
  <div class="no-print fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
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
