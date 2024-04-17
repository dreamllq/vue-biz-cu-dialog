<template>
  <div>
    <el-button @click='onClick'>
      aaa
    </el-button>
    <biz-cu-dialog
      ref='dialogRef'
      title='aaaa'
      :show-footer='false'
      :init-func='initFunc'
      :submit-func='submitFunc'>
      <template #default='{defaultData}'>
        {{ defaultData }}
      </template>
      <template #prefix-footer>
        <footer-button btn-type='cancel'>
          取消1
        </footer-button>
      </template>
      <template #suffix-footer>
        <footer-button btn-type='submit' type='primary'>
          下一步
        </footer-button>
      </template>
    </biz-cu-dialog>
  </div>
</template>

<script setup lang="ts">
import { BizCuDialog, FooterButton } from '@/index.ts';
import { ref } from 'vue';

const dialogRef = ref();

const onClick = () => {
  dialogRef.value.show(1, { a: 1 });
};

const initFunc = (...args:any[]) => {
  console.log('initFunc', ...args);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ bb: 33 });
    }, 2000);
  });
};

const submitFunc = (...args:any[]):Promise<void> => {
  console.log('submitFunc', ...args);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

</script>

<style scoped>

</style>