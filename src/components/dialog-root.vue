<template>
  <slot />
</template>

<script setup lang="ts">
import { useProvideDialogState } from '@/hooks/dialog-state';

const props = defineProps({
  initFunc: {
    type: Function,
    default: () => ({})
  },
  submitFunc: {
    type: Function,
    default: () => ({})
  }
});

useProvideDialogState({
  initFunc: props.initFunc,
  submitFunc: props.submitFunc
});
</script>

<style scoped>

</style>