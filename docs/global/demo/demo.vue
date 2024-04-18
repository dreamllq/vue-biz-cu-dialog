<template>
  <div v-if='ready'>
    <el-card>
      <component :is='com' />
    </el-card>
    <div class='code-preview language-html'>
      <pre class='language-html'>
        <code>{{ sourceCode }}</code>
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.min.css';

const props = defineProps({
  c: {
    type: String,
    default: ''
  }
});

const ready = ref(false);
let sourceCode = '';
let com;

onMounted(async () => {
  let p, cp;
  if (import.meta.env.DEV) {
    p = `../../examples/${props.c}.vue?raw`;
    cp = `../../examples/${props.c}.vue`;
  } else {
    p = `../../../../examples/${props.c}.vue?raw`;
    cp = `../../../../examples/${props.c}.vue`;
  }

  sourceCode = (await import(/* @vite-ignore */ p)).default;
  com = (await import(/* @vite-ignore */ cp)).default;
  ready.value = true;
  await nextTick();
  Prism.highlightAll();
});

</script>

<style scoped lang="scss">
.code-preview {
  pre[class*="language-"] {
    padding: 0;
  }
}
</style>