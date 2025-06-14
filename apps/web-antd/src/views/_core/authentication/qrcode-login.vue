<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@oh/common-ui';
import { LOGIN_PATH } from '@oh/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
