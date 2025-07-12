<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemDictApi } from '#/api/system/dict';

import { computed, ref } from 'vue';

import { useDrawer, useModal } from '@finn/common-ui';
import { Plus } from '@finn/icons';

import { Button, message } from 'ant-design-vue';

import { useVxeGrid } from '#/adapter/vxe-table';
import { deleteDictData, getDictDataPage } from '#/api/system/dict';
import { $t } from '#/locales';

import { useDictDataColumns } from '../data';
import ModalFormData from './modalFormData.vue';
/**
 * 数据字典-数据列表（抽屉）。
 */
const [FormModal, formModalApi] = useModal({
  connectedComponent: ModalFormData,
  destroyOnClose: true,
});

const dictTypeId = ref();
// drawerApi
const [Drawer, drawerApi] = useDrawer({
  showConfirmButton: false,
  onOpenChange() {
    const data = drawerApi.getData<SystemDictApi.SystemType>();
    dictTypeId.value = data.id;
  },
});
// 编辑字典数据
function onDataEdit(row: SystemDictApi.SystemData) {
  formModalApi.setData(row).open();
}
// 删除字典数据
function onDataDelete(row: SystemDictApi.SystemData) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteDictData(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch(() => {
      hideLoading();
    });
}

const getDrawerTitle = computed(() => {
  return '维护字典数据';
});

// gridApi 字典数据
const [Grid, gridApi] = useVxeGrid({
  gridOptions: {
    columns: useDictDataColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          formValues.dictTypeId = dictTypeId.value;
          return await getDictDataPage({
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
  } as VxeTableGridOptions<SystemDictApi.SystemType>,
});

function onRefresh() {
  gridApi.query();
}

function onActionClick(e: OnActionClickParams<SystemDictApi.SystemData>) {
  switch (e.code) {
    case 'delete': {
      onDataDelete(e.row);
      break;
    }
    case 'edit': {
      onDataEdit(e.row);
      break;
    }
  }
}

function onCreate() {
  formModalApi.setData({ dictTypeId: dictTypeId.value }).open();
}
</script>
<template>
  <Drawer class="w-full max-w-[800px]" :title="getDrawerTitle">
    <FormModal @success="onRefresh" />
    <Grid table-title="字典数据列表">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增
        </Button>
      </template>
    </Grid>
  </Drawer>
</template>
<style lang="css" scoped>
:deep(.ant-tree-title) {
  .tree-actions {
    display: none;
    margin-left: 20px;
  }
}

:deep(.ant-tree-title:hover) {
  .tree-actions {
    display: flex;
    flex: auto;
    justify-content: flex-end;
    margin-left: 20px;
  }
}
</style>
