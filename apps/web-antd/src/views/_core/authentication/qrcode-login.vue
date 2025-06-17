<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@finn/common-ui';
import { LOGIN_PATH } from '@finn/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
