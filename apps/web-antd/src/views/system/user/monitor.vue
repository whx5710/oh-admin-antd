<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api/system/user';

import { Page } from '@finn/common-ui';

import { Modal } from 'ant-design-vue';

import { useVxeGrid } from '#/adapter/vxe-table';
import { forceLogoutAll, onlineUserPage } from '#/api/system/user';

import { useMonitorColumns, useMonitorGridFormSchema } from './data';

const [Grid, gridApi] = useVxeGrid({
  showSearchForm: false, // 隐藏搜索表单
  formOptions: {
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: useMonitorGridFormSchema(),
    submitOnChange: true,
    showCollapseButton: false, // 是否显示展开/折叠
  },
  gridOptions: {
    columns: useMonitorColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await onlineUserPage({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
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
  } as VxeTableGridOptions<SystemUserApi.SystemUser>,
});

function onActionClick({
  code,
  row,
}: OnActionClickParams<SystemUserApi.SystemUser>) {
  switch (code) {
    case 'exit': {
      console.warn('退出', row);
      forceLogout(row.id, row.realName);
      break;
    }
    case 'show': {
      console.warn('详情', row);
      break;
    }
  }
}
// 下线
function forceLogout(userId: string, userName: string) {
  Modal.confirm({
    content: `是否下线 ${userName}`,
    onCancel() {
      console.warn('已取消');
    },
    onOk() {
      forceLogoutAll(userId).then(() => {
        onRefresh();
      });
    },
    title: '是否下线',
  });
}
// 刷新列表
function onRefresh() {
  gridApi.query();
}
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="附件列表" />
  </Page>
</template>
