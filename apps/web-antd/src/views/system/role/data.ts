import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api/system/role';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      rules: 'required',
    },
    // {
    //   component: 'RadioGroup',
    //   componentProps: {
    //     buttonStyle: 'solid',
    //     options: [
    //       { label: $t('common.enabled'), value: 1 },
    //       { label: $t('common.disabled'), value: 0 },
    //     ],
    //     optionType: 'button',
    //   },
    //   defaultValue: 1,
    //   fieldName: 'status',
    //   label: $t('system.role.status'),
    // },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.role.remark'),
    },
    {
      component: 'Input',
      fieldName: 'menuIdList',
      formItemClass: 'items-start',
      label: $t('system.role.setPermissions'),
      modelPropName: 'modelValue',
    },
  ];
}
// 搜索表单
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      componentProps: {
        allowClear: true,
      },
    },
    // { component: 'Input', fieldName: 'id', label: $t('system.role.id') },
    // {
    //   component: 'Select',
    //   componentProps: {
    //     allowClear: true,
    //     options: [
    //       { label: $t('common.enabled'), value: 1 },
    //       { label: $t('common.disabled'), value: 0 },
    //     ],
    //   },
    //   fieldName: 'status',
    //   label: $t('system.role.status'),
    // },
    // {
    //   component: 'Input',
    //   fieldName: 'tenantId',
    //   label: '租户ID',
    //   componentProps: {
    //     allowClear: true,
    //   },
    // },
    {
      component: 'Input',
      fieldName: 'tenantName',
      label: '租户名',
      componentProps: {
        allowClear: true,
      },
    },
    // {
    //   component: 'Input',
    //   fieldName: 'remark',
    //   label: $t('system.role.remark'),
    //   componentProps: {
    //     allowClear: true,
    //   },
    // },
    // {
    //   component: 'RangePicker',
    //   fieldName: 'createTime',
    //   label: $t('system.role.createTime'),
    // },
  ];
}

export function useColumns<T = SystemRoleApi.SystemRole>(
  onActionClick: OnActionClickFn<T>,
  // onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    {
      field: 'id',
      title: $t('system.role.id'),
      width: 100,
      visible: false,
    },
    {
      field: 'name',
      title: $t('system.role.roleName'),
      width: 200,
    },
    // {
    //   cellRender: {
    //     attrs: { beforeChange: onStatusChange },
    //     name: onStatusChange ? 'CellSwitch' : 'CellTag',
    //   },
    //   field: 'status',
    //   title: $t('system.role.status'),
    //   width: 100,
    // },
    {
      cellRender: {
        name: 'CellTag',
        options: [
          { color: 'warning', label: '是', value: 1 },
          { color: 'success', label: '否', value: 0 },
        ],
      },
      field: 'isSystem',
      minWidth: 100,
      title: '是否内置角色',
    },
    {
      field: 'tenantId',
      minWidth: 100,
      title: '租户ID',
    },
    {
      field: 'tenantName',
      minWidth: 100,
      title: '租户名称',
    },
    {
      field: 'remark',
      minWidth: 100,
      title: $t('system.role.remark'),
    },
    {
      field: 'createTime',
      title: $t('system.role.createTime'),
      width: 160,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.role.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          'edit', // 默认的编辑按钮
          {
            code: 'delete', // 默认的删除按钮
            disabled: (row: SystemRoleApi.SystemRole) => {
              return !!(row.isSystem === 1);
            },
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
    },
  ];
}
