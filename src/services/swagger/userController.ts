// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** currentUser GET /api/user/currentUser */
export async function currentUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** currentUserById GET /api/user/currentUserById */
export async function currentUserByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.currentUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/currentUserById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** currentUserList POST /api/user/currentUserList */
export async function currentUserListUsingPOST(
  body: API.CurrentListUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCurrentListUserVO>('/api/user/currentUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser GET /api/user/delete */
export async function deleteUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/updateUser */
export async function updateUserUsingPOST(
  body: API.UpdateUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
