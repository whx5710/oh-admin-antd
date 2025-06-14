<script setup lang="ts">
import type { SupportedLanguagesType } from '@oh/locales';

import { SUPPORT_LANGUAGES } from '@oh/constants';
import { Languages } from '@oh/icons';
import { loadLocaleMessages } from '@oh/locales';
import { preferences, updatePreferences } from '@oh/preferences';

import { VbenDropdownRadioMenu, VbenIconButton } from '@oh-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <VbenDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <VbenIconButton>
        <Languages class="text-foreground size-4" />
      </VbenIconButton>
    </VbenDropdownRadioMenu>
  </div>
</template>
