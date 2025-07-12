import type { Recordable } from '@finn/types';

import { requestClient } from '#/api/request';
import { sysApi } from '#/config/env';

export namespace SystemRoleApi {
  export interface SystemRole {
    [key: string]: any;
    id: string;
    name: string;
    menuIdList: string[];
    remark?: string;
    status: 0 | 1;
    isSystem: 0 | 1;
  }
}

/**
 * 获取角色列表数据
 */
async function getRolePage(params: Recordable<any>) {
  return requestClient.get<Array<SystemRoleApi.SystemRole>>(
    `/${sysApi}/sys/role/page`,
    {
      params,
    },
  );
}

/**
 * 创建角色
 * @param data 角色数据
 */
async function createRole(data: Omit<SystemRoleApi.SystemRole, 'id'>) {
  return requestClient.post(`/${sysApi}/sys/role`, data);
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function updateRole(
  id: string,
  data: Omit<SystemRoleApi.SystemRole, 'id'>,
) {
  data.id = id;
  return requestClient.put(`/${sysApi}/sys/role`, data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRole(id: string) {
  return requestClient.delete(`/${sysApi}/sys/role/${id}`);
}

async function getRoleList() {
  return requestClient.get(`/${sysApi}/sys/role/list`);
}

export { createRole, deleteRole, getRoleList, getRolePage, updateRole };
