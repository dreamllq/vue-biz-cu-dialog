<template>
  <el-button
    :type='type'
    :loading='loading'
    :disabled='disabled'
    @click='onClick'>
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { useDialogState } from '@/hooks/dialog-state';
import { PropType, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  btnType: {
    type: String as PropType<'cancel' | 'submit'>,
    default: 'cancel'
  }
});

const emits = defineEmits(['completed', 'success']);

const { cancel, submit, submitLoading, ready } = useDialogState()!;
const loading = computed(() => submitLoading.value && props.btnType === 'submit');
const disabled = computed(() => !ready.value && props.btnType === 'submit');


const onClick = async () => {
  try {
    if (props.btnType === 'cancel') {
      await cancel();
    } else if (props.btnType === 'submit') {
      await submit();
    }
    emits('success');
  } finally {
    emits('completed');
  }
};
</script>

<style scoped>

</style>