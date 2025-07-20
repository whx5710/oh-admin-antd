<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api/system/user';

import { ref } from 'vue';

import { useModal } from '@finn/common-ui';

import { useVxeGrid } from '#/adapter/vxe-table';
import { tokenList } from '#/api/system/user';

import { useTokenColumns } from '../data';

const userId = ref();

const [Grid, gridApi] = useVxeGrid({
  showSearchForm: false, // 隐藏搜索表单
  formOptions: {},
  gridOptions: {
    columns: useTokenColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }) => {
          console.warn(page);
          return await tokenList(userId.value);
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isCurrent: true, // 高亮选中行
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      search: true,
      zoom: true,
    },
    pagerConfig: {
      enabled: false,
    },
  } as VxeTableGridOptions<SystemUserApi.SystemUser>,
});

const [Modal, modalApi] = useModal({
  async onConfirm() {},
  onOpenChange(isOpen) {
    const data = modalApi.getData<SystemUserApi.SystemUser>();
    console.warn(data);
    if (isOpen) {
      console.warn('=========', isOpen);
      userId.value = data.id;
    }
  },
});
// 刷新列表
function onRefresh() {
  gridApi.query();
}
function onActionClick({
  code,
  row,
}: OnActionClickParams<SystemUserApi.SystemUser>) {
  switch (code) {
    case 'exit': {
      console.warn('退出', row);
      // forceLogout(row.id, row.realName);
      onRefresh();
      break;
    }
  }
}
</script>

<template>
  <Modal title="用户token列表" class="w-[800px]">
    <Grid class="mx-4" />
  </Modal>
</template>
