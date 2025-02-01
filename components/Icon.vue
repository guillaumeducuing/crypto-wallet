<script setup>
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';
import { convertToCamelCase } from '~/utils/utils.ts';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: { type: String, default: '16' },
  // eslint-disable-next-line vue/require-default-prop
  color: String,
  strokeWidth: { type: Number, default: 2 },
  // eslint-disable-next-line vue/require-default-prop
  defaultClass: String,
});

// eslint-disable-next-line import/namespace
const icon = computed(() => icons[convertToCamelCase(props.name)]);
</script>

<template>
  <component :is="icon" :size="size" :color="color" :stroke-width="strokeWidth" :default-class="defaultClass" />
</template>
