<script setup lang="ts">
import type { SupportedLanguagesType } from '@finn/locales';

import { SUPPORT_LANGUAGES } from '@finn/constants';
import { Languages } from '@finn/icons';
import { loadLocaleMessages } from '@finn/locales';
import { preferences, updatePreferences } from '@finn/preferences';

import { FinnDropdownRadioMenu, FinnIconButton } from '@finn-core/shadcn-ui';

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
    <FinnDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <FinnIconButton>
        <Languages class="text-foreground size-4" />
      </FinnIconButton>
    </FinnDropdownRadioMenu>
  </div>
</template>
