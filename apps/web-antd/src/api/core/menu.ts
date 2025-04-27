import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  // return requestClient.get<RouteRecordStringComponent[]>('/menu/all');
  return requestClient.get<RouteRecordStringComponent[]>('/sys/menu/route');
}

/**
 * 获取所有菜单列表
 */
export async function getMenuListApi() {
  return requestClient.get('/sys/menu/list');
}
