<template>
  <el-dialog
    v-model='visible'
    :title='title'
    :width='width'
    append-to-body
    :close-on-click-modal='closeOnClickModal'
    :close-on-press-escape='closeOnPressEscape'
    @open='hidden=false'
    @closed='hidden=true'
  >
    <slot v-if='hidden === false && ready === true' :default-data='defaultData' />
    <div v-else-if='ready === false' v-loading='true' style='height: 50px;' />
    <template v-if='showFooter' #footer>
      <div class='dialog-footer'>
        <slot name='footer' />
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useDialogState } from '@/hooks/dialog-state';
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '600'
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false
  }
});

const hidden = ref<boolean>(true);

const { visible, ready, defaultData, show } = useDialogState()!;
defineExpose({ show });

</script>

<style scoped>

</style>