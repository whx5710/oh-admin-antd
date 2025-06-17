import type { RequestResponse } from '@finn/request';
import type { Recordable, UserInfo } from '@finn/types';

import { requestClient } from '#/api/request';
import { sysApi } from '#/config/env';

export namespace SystemUserApi {
  export interface SystemUser {
    id: string;
    status: 0 | 1;
    createTime: string;
    email: string;
    gender: 0 | 1 | 2;
    mobile: string;
    deptId: string;
    deptName: string;
    realName: string;
    superAdmin: 0 | 1;
    tenantId: string;
    userKey: string;
    username: string;
    roleIdList: string[];
    postIdList: string[];
  }
}

/**
 * 创建用户
 * @param data 用户数据
 */
export async function createUser(data: Omit<Recordable<any>, 'id'>) {
  return requestClient.post(`/${sysApi}/sys/user`, data);
}

/**
 * 更新用户
 *
 * @param id 用户 ID
 * @param data 用户数据
 */
export async function updateUser(id: string, data: Recordable<any>) {
  data.id = id;
  return requestClient.put(`/${sysApi}/sys/user`, data);
}

/**
 * 删除用户
 *
 * @param id 用户 ID
 */
export async function deleteUser(id: string) {
  const data = [];
  data.push(id);
  return requestClient.delete(`/${sysApi}/sys/user`, data);
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>(`/${sysApi}/sys/user/info`);
}

/**
 * 根据用户ID获取用户信息
 */
export async function getUserById(userId: number | string) {
  return requestClient.get<SystemUserApi.SystemUser>(
    `/${sysApi}/sys/user/${userId}`,
  );
}
/**
 * 获取用户列表数据
 */
export async function getUserPage(params: Recordable<any>) {
  return requestClient.get<Array<SystemUserApi.SystemUser>>(
    `/${sysApi}/sys/user/page`,
    {
      params,
    },
  );
}

/**
 * 绑定/解绑租户的管理用户
 * @param tenantId 租户ID
 * @param flag 标识 1 绑定 2 解绑
 * @param userIdList 用户ID列表
 */
export async function tenantUser(
  tenantId: string,
  flag: number,
  userIdList: string[],
) {
  return requestClient.post(
    `/${sysApi}/sys/user/tenantUser/${tenantId}/${flag}`,
    userIdList,
  );
}

/**
 * 导出用户(下载)
 */
export async function userExport(params: Recordable<any>) {
  return requestClient.download<RequestResponse<Blob>>(
    `/${sysApi}/sys/user/export`,
    {
      params,
      responseReturn: 'raw',
    },
  );
}
