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

/** currentArticle POST /api/article/current */
export async function currentArticleUsingPOST(
  body: API.CurrentArticleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseArticleVO>('/api/article/current', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** currentListArticle POST /api/article/current_list */
export async function currentListArticleUsingPOST(
  body: API.CurrentListArticle,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListArticleVO>('/api/article/current_list', {
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
