<script lang="ts" setup>
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemLogApi } from '#/api/system/log';

import { Page } from '@finn/common-ui';
import { IconifyIcon } from '@finn/icons';
import { downloadFileFromBlob } from '@finn/utils';

import { Button, Popconfirm } from 'ant-design-vue';

import { useVxeGrid } from '#/adapter/vxe-table';
import { getLoginLogPage, loginLogExport } from '#/api/system/log';
// import { sysApi } from '#/config/env';

import { useGridFormSchema, useLoginColumns } from './data';

const fileMap = new Map();

// 表格事件
const gridEvents: VxeGridListeners<SystemLogApi.SysLoginLog> = {
  // 勾选
  checkboxChange: ({ checked, row }) => {
    // console.warn(checked, '选择数据', row);
    if (checked && row) {
      fileMap.set(row.id, row);
    } else {
      fileMap.delete(row.id);
    }
  },
  // 全选
  checkboxAll: ({ checked }) => {
    const records = gridApi.grid.getCheckboxRecords();
    if (checked) {
      if (records) {
        records.forEach((element) => {
          fileMap.set(element.id, element);
        });
      }
    } else {
      fileMap.clear();
    }
  },
};

const [Grid, gridApi] = useVxeGrid({
  gridEvents,
  showSearchForm: false, // 隐藏搜索表单
  formOptions: {
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: useGridFormSchema(),
    submitOnChange: true,
    showCollapseButton: false, // 是否显示展开/折叠
  },
  gridOptions: {
    columns: useLoginColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          if (formValues.startTime) {
            formValues.startTime = `${formValues.startTime} 00:00:00`;
          }
          if (formValues.endTime) {
            formValues.endTime = `${formValues.endTime} 23:59:59`;
          }
          return await getLoginLogPage({
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
  } as VxeTableGridOptions<SystemLogApi.SysLoginLog>,
});

// 批量导出
function batchExport() {
  gridApi.formApi.getValues().then((res) => {
    const params = res;
    if (res.startTime) {
      params.startTime = `${res.startTime} 00:00:00`;
    }
    if (res.endTime) {
      params.endTime = `${res.endTime} 23:59:59`;
    }
    loginLogExport(params).then((res) => {
      const disposition = res.headers['content-disposition'];
      const filename = disposition.replaceAll('attachment;filename=', '');
      downloadFileFromBlob({
        source: res.data,
        fileName: decodeURI(filename),
      });
    });
  });
}
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="日志列表">
      <template #toolbar-tools>
        <Popconfirm title="确定导出？" @confirm="batchExport">
          <Button class="mr-2" type="primary">
            <IconifyIcon icon="carbon:export" /> 导出
          </Button>
        </Popconfirm>
      </template>
    </Grid>
  </Page>
</template>
