<template>
  <dialog-root :init-func='initFunc' :submit-func='submitFunc'>
    <a-dialog
      v-bind='$attrs'
      ref='dialogRef'
      :title='title'
      :width='width'
      :show-footer='showFooter'
      :close-on-click-modal='closeOnClickModal'
      :close-on-press-escape='closeOnPressEscape'>
      <template #default='{defaultData}'>
        <slot :default-data='defaultData' />
      </template>
      <template #footer>
        <slot name='prefix-footer' />
        <slot name='footer'>
          <footer-button 
            btn-type='cancel'
            @completed='onCancelCompleted'
            @success='onCancelSuccess'>
            {{ ct('cancel') }}
          </footer-button>
          <footer-button
            btn-type='submit'
            type='primary'
            @completed='onSubmitCompleted'
            @success='onSubmitSuccess'>
            {{ ct('ok') }}
          </footer-button>
        </slot>
        <slot name='suffix-footer' />
      </template>
    </a-dialog>
  </dialog-root>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import DialogRoot from './dialog-root.vue';
import ADialog from './dialog.vue';
import FooterButton from './footer-button.vue';
import { ct } from '@/locales';
import { type InitFunc, type SubmitFunc } from '@/type';

defineProps({
  initFunc: {
    type: Function as PropType<InitFunc>,
    default: () => ({})
  },
  submitFunc: {
    type: Function as PropType<SubmitFunc>,
    default: () => ({})
  },
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

const emits = defineEmits([
  'cancel-completed',
  'cancel-success',
  'submit-completed',
  'submit-success'
]);

const onCancelCompleted = () => {
  emits('cancel-completed');
};

const onCancelSuccess = () => {
  emits('cancel-success');
};

const onSubmitCompleted = () => {
  emits('submit-completed');
};

const onSubmitSuccess = () => {
  emits('submit-success');
};

const dialogRef = ref();
const show = (id?:any, options?:any) => {
  dialogRef.value.show(id, options);
};

defineExpose({ show });
</script>

<style scoped>

</style>