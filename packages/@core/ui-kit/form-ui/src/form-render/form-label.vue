<script setup lang="ts">
import type { CustomRenderType } from '../types';

import {
  FormLabel,
  FinnHelpTooltip,
  FinnRenderContent,
} from '@finn-core/shadcn-ui';
import { cn } from '@finn-core/shared/utils';

interface Props {
  class?: string;
  colon?: boolean;
  help?: CustomRenderType;
  label?: CustomRenderType;
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="text-destructive mr-[2px]">*</span>
    <slot></slot>
    <FinnHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      <FinnRenderContent :content="help" />
    </FinnHelpTooltip>
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </FormLabel>
</template>
