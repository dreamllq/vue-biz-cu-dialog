import { createInjectionState } from '@vueuse/core';
import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const [useProvideDialogState, useDialogState] = createInjectionState(({ initFunc, submitFunc }) => {
  const visible = ref<boolean>(false);
  const ready = ref<boolean>(false);
  const submitLoading = ref<boolean>(false);
  const initId = ref<any>();
  const initOptions = ref<any>();
  const defaultData = ref<any>();
  const showId = ref<string>();
  const submitId = ref<string>();

  const show = async (id?:any, options?:any) => {
    const _execId = uuidv4();
    showId.value = _execId;
    initId.value = id;
    initOptions.value = options;
    submitLoading.value = false;
    visible.value = true;
    ready.value = false;
    defaultData.value = await initFunc(cloneDeep(initId.value), cloneDeep(initOptions.value));
    if (_execId !== showId.value) return;
    ready.value = true;
  };

  const submit = async () => {
    const _execId = uuidv4();
    submitId.value = _execId;
    
    try {
      submitLoading.value = true;
      await submitFunc(cloneDeep(initId.value), cloneDeep(initOptions.value));
      if (_execId !== submitId.value) return;
      visible.value = false;
    } finally {
      if (_execId === submitId.value) {
        submitLoading.value = false;
      }
    }
  };

  const cancel = async () => {
    visible.value = false;
  };

  return {
    visible,
    ready,
    submitLoading,
    defaultData,
    show,
    submit,
    cancel
  };
});

export { useProvideDialogState, useDialogState };