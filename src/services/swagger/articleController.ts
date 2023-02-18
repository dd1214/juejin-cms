// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** articleAdd POST /api/article/add */
export async function articleAddUsingPOST(
  body: API.ArticleAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/article/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** currentArticle GET /api/article/current */
export async function currentArticleUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.currentArticleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseArticleVO>('/api/article/current', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** currentListArticle POST /api/article/current_list */
export async function currentListArticleUsingPOST(
  body: API.CurrentListArticleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCurrentListArticleVO>('/api/article/current_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteArticle POST /api/article/delete */
export async function deleteArticleUsingPOST(
  body: API.DeleteArticleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/article/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getHomeConfig GET /api/article/getHomeConfig */
export async function getHomeConfigUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseHome>('/api/article/getHomeConfig', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importArticle POST /api/article/import */
export async function importArticleUsingPOST(
  body: API.ImportArticleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/article/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** setHomeConfig POST /api/article/setHomeConfig */
export async function setHomeConfigUsingPOST(
  body: API.SetHomeConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/article/setHomeConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateArticle POST /api/article/update */
export async function updateArticleUsingPOST(
  body: API.UpdateArticleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/article/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateStatus POST /api/article/updateStatus */
export async function updateStatusUsingPOST(
  body: API.UpdateStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/article/updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploadArticleImg POST /api/article/uploadImg */
export async function uploadArticleImgUsingPOST(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponsestring>('/api/article/uploadImg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
