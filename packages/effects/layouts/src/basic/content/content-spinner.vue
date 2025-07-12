<script lang="ts" setup>
import { FinnSpinner } from '@finn-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <FinnSpinner :spinning="spinning" />
</template>
