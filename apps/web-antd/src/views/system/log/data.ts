import type { FinnFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
// import type { SystemLogApi } from '#/api/system/log';

import { h, ref } from 'vue';

import { useUserStore } from '@finn/stores';

import { useDebounceFn } from '@vueuse/core';
import { Spin } from 'ant-design-vue';

import { getTenantPage } from '#/api/system/tenant';

const keyWord = ref('');

const fetching = ref(false);
const userStore = useUserStore();

// 远程获取数据
function fetchRemoteOptions(keyWord: Record<string, any>) {
  fetching.value = true;
  return getTenantPage({
    pageNum: 1,
    pageSize: 10,
    ...keyWord,
  });
}

// 搜索表单
export function useGridFormSchema(): FinnFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: '用户名',
      componentProps: {
        allowClear: true,
      },
    },
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: () => {
        return {
          // 接口转options格式 { tenantId: string; tenantName: string }[]
          afterFetch: (res: any) => {
            fetching.value = false;
            const data: { name: string; path: string }[] = res.list;
            return data.map((item: any) => ({
              label: item.tenantName,
              value: item.tenantId,
            }));
          },
          api: fetchRemoteOptions,
          allowClear: true,
          disabled: userStore.userInfo?.tenantId !== undefined,
          // 禁止本地过滤
          filterOption: false,
          // 如果正在获取数据，使用插槽显示一个loading
          notFoundContent: fetching.value ? undefined : null,
          // 搜索词变化时记录下来， 使用useDebounceFn防抖。
          onSearch: useDebounceFn((value: string) => {
            keyWord.value = value;
          }, 300),
          // 远程搜索参数。当搜索词变化时，params也会更新
          params: {
            keyWord: keyWord.value || undefined,
          },
          showSearch: true,
        };
      },
      // 字段名
      fieldName: 'tenantId',
      // 界面显示的label
      label: '租户',
      renderComponentContent: () => {
        return {
          notFoundContent: fetching.value ? h(Spin) : undefined,
        };
      },
      // rules: 'selectRequired',
    },
    {
      component: 'RangePicker',
      fieldName: 'createTime',
      label: '创建时间',
    },
  ];
}
// 搜索表单-操作日志
export function useOpGridFormSchema(): FinnFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'keyWords',
      label: '关键字',
      componentProps: {
        allowClear: true,
      },
    },
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: () => {
        return {
          // 接口转options格式 { tenantId: string; tenantName: string }[]
          afterFetch: (res: any) => {
            fetching.value = false;
            const data: { name: string; path: string }[] = res.list;
            return data.map((item: any) => ({
              label: item.tenantName,
              value: item.tenantId,
            }));
          },
          api: fetchRemoteOptions,
          allowClear: true,
          disabled: userStore.userInfo?.tenantId !== undefined,
          // 禁止本地过滤
          filterOption: false,
          // 如果正在获取数据，使用插槽显示一个loading
          notFoundContent: fetching.value ? undefined : null,
          // 搜索词变化时记录下来， 使用useDebounceFn防抖。
          onSearch: useDebounceFn((value: string) => {
            keyWord.value = value;
          }, 300),
          // 远程搜索参数。当搜索词变化时，params也会更新
          params: {
            keyWord: keyWord.value || undefined,
          },
          showSearch: true,
        };
      },
      // 字段名
      fieldName: 'tenantId',
      // 界面显示的label
      label: '租户',
      renderComponentContent: () => {
        return {
          notFoundContent: fetching.value ? h(Spin) : undefined,
        };
      },
      // rules: 'selectRequired',
    },
    {
      component: 'RangePicker',
      fieldName: 'createTime',
      label: '创建时间',
    },
  ];
}
// 登录日志
export function useLoginColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 60 },
    { title: '序号', type: 'seq', width: 50 },
    {
      field: 'id',
      title: 'ID',
      minWidth: 100,
      visible: false,
    },
    {
      field: 'username',
      title: '用户名',
      width: 200,
    },
    {
      field: 'tenantName',
      title: '租户',
      minWidth: 150,
    },
    {
      field: 'address',
      title: '登录地址',
      minWidth: 180,
    },
    {
      field: 'status', // 登录状态  0：失败   1：成功
      width: 120,
      title: '登录状态',
      cellRender: {
        name: 'CellTag',
        options: [
          { color: 'warning', label: '失败', value: 0 },
          { color: 'success', label: '成功', value: 1 },
        ],
      },
    },
    {
      field: 'ip',
      width: 120,
      title: 'IP',
    },
    {
      field: 'userAgent',
      minWidth: 120,
      title: 'User Agent',
    },
    // {
    //   field: 'statusLabel',
    //   minWidth: 120,
    //   title: '登录状态',
    // },
    {
      field: 'operationLabel',
      minWidth: 120,
      title: '操作信息',
    },
    {
      field: 'createTime',
      width: 150,
      title: '创建时间',
    },
    // {
    //   align: 'center',
    //   cellRender: {
    //     attrs: {
    //       nameField: 'name',
    //       nameTitle: '附件',
    //       onClick: onActionClick,
    //     },
    //     name: 'CellOperation',
    //     options: [
    //       {
    //         code: 'download', // 默认的删除按钮
    //         text: '详情',
    //       },
    //     ],
    //   },
    //   field: 'operation',
    //   fixed: 'right',
    //   title: '操作',
    //   width: 130,
    // },
  ];
}

// 操作日志
export function useOpColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 60 },
    { title: '序号', type: 'seq', width: 50 },
    {
      field: 'id',
      title: 'ID',
      minWidth: 100,
      visible: false,
    },
    {
      field: 'module',
      title: '模块名',
      width: 150,
    },
    {
      field: 'name',
      title: '操作名',
      minWidth: 120,
    },
    {
      field: 'reqUri',
      width: 120,
      title: '请求URI',
    },
    {
      field: 'tenantName',
      title: '租户',
      minWidth: 150,
    },
    {
      field: 'realName',
      minWidth: 120,
      title: '操作人',
    },
    {
      field: 'reqMethod',
      width: 100,
      title: '请求方法',
    },
    {
      field: 'reqParams',
      minWidth: 120,
      title: '请求参数',
    },
    {
      field: 'ip',
      minWidth: 120,
      title: '操作IP',
    },
    {
      field: 'address',
      minWidth: 120,
      title: '登录地址',
    },
    {
      field: 'userAgent',
      minWidth: 120,
      title: 'User Agent',
    },
    {
      field: 'operateTypeLabel',
      minWidth: 120,
      title: '操作类型',
    },
    {
      field: 'duration',
      minWidth: 120,
      title: '执行时长(毫秒)',
    },
    {
      field: 'status',
      minWidth: 120,
      title: '操作状态',
      cellRender: {
        name: 'CellTag',
        options: [
          { color: 'warning', label: '失败', value: 0 },
          { color: 'success', label: '成功', value: 1 },
        ],
      },
    },
    {
      field: 'resultMsg',
      minWidth: 120,
      title: '返回消息',
    },
    {
      field: 'createTime',
      width: 150,
      title: '创建时间',
    },
    {
      field: 'userId',
      title: '用户ID',
      visible: false, // 是否可见-隐藏列
    },
  ];
}
