# lc-vue-biz-cu-dialog

新增/创建弹窗

## Demo

[demo](https://unpkg.com/lc-vue-biz-cu-dialog/docs/.vitepress/dist/index.html) 

## 安装 

```
npm i lc-vue-biz-cu-dialog 
```

## 例子

```vue
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
import { BizCuDialog, FooterButton } from 'lc-vue-biz-cu-dialog';
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
```

## API

### BizCuDialog

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| initFunc | 数据初始化方法 | (id?:any, options?:any)=>Promise<any> | () => ({}) |
| submitFunc | 提交方法 | (id?:any, options?:any)=>Promise<void> | () => ({}) |
| title | 标题 | string | '' |
| width | 宽度 | string | '600' |
| showFooter | 显示底 | Boolean | true |
| closeOnClickModal | 点击modal关闭弹窗 | Boolean | false |
| closeOnPressEscape | 按ESC关闭弹窗 | Boolean | false |

### Events

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- | 
| cancel-completed | 取消逻辑执行完成 | - |
| cancel-success | 取消逻辑执行成功 | - |
| submit-completed | 提交逻辑执行成功 | - |
| submit-success | 提交逻辑执行成功 | - |

### Slots

| 插槽名 | 说明 | 参数 |
| ---- | ---- | ---- | 
| default | 弹窗内容 | - |
| footer | 弹窗底部 | - |

### Expose
| 方法名 | 说明 | 类型 |
| ---- | ---- | ---- | 
| show | 显示弹窗 | (id?:any, options?:any)=>void |

### FooterButton

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | el-button type 属性 | string | - |
| btnType | 按钮逻辑类型 | 'cancel' \| 'submit' | 'cancel' |


### Events

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- | 
| completed | 逻辑执行完成 | - |
| success | 逻辑执行成功 | - |

### Slots

| 插槽名 | 说明 | 参数 |
| ---- | ---- | ---- | 
| default | 按钮内容 | - |