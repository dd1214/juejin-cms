declare namespace API {
  type AdvertisementVO = {
    imgUrl?: string;
    open?: boolean;
    url?: string;
  };

  type ArticleAddRequest = {
    category?: string;
    content?: string;
    label?: string;
    preview?: string;
    snapshot?: string;
    title?: string;
  };

  type ArticleVO = {
    articleID?: string;
    articleStatus?: number;
    author?: string;
    avatar?: string;
    category?: string;
    collectCount?: number;
    commentCount?: number;
    content?: string;
    currentTime?: string;
    preview?: string;
    snapshot?: string;
    title?: string;
    viewCount?: number;
  };

  type AuditArticleVO = {
    id?: string;
  };

  type BaseResponseArticleVO = {
    code?: number;
    data?: ArticleVO;
    description?: string;
    message?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    description?: string;
    message?: string;
  };

  type BaseResponseCurrentListArticleVO = {
    code?: number;
    data?: CurrentListArticleVO;
    description?: string;
    message?: string;
  };

  type BaseResponseCurrentListUserVO = {
    code?: number;
    data?: CurrentListUserVO;
    description?: string;
    message?: string;
  };

  type BaseResponseHome = {
    code?: number;
    data?: Home;
    description?: string;
    message?: string;
  };

  type BaseResponseint = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    description?: string;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    description?: string;
    message?: string;
  };

  type currentArticleUsingGETParams = {
    /** id */
    id?: string;
  };

  type CurrentListArticleRequest = {
    articleStatus?: number;
    category?: string;
    content?: string;
    current?: number;
    label?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CurrentListArticleVO = {
    list?: ArticleVO[];
    total?: number;
  };

  type CurrentListUserRequest = {
    content?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
  };

  type CurrentListUserVO = {
    list?: UserVO[];
    total?: number;
  };

  type currentUserByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type DeleteArticleRequest = {
    id?: string;
  };

  type deleteUserUsingGETParams = {
    /** id */
    id?: string;
  };

  type Home = {
    advertisement?: AdvertisementVO[];
    labelList?: HomeLabelListVO[];
    screening?: ScreeningListVO[];
    titleList?: HomeTitleListVO[];
    userList?: HomeUserListVO[];
  };

  type HomeLabelListVO = {
    badge?: string;
    parameter?: string;
    sublist?: HomeSubListVO[];
    text?: string;
  };

  type HomeSubListVO = {
    parameter?: string;
    text?: string;
  };

  type HomeTitleListVO = {
    badge?: string;
    image?: boolean;
    imgUrl?: string;
    title?: string;
    url?: string;
  };

  type HomeUserListVO = {
    list?: UserListVO[];
    title?: string;
  };

  type ImportArticleRequest = {
    content?: ImportArticleVO[];
  };

  type ImportArticleVO = {
    articleID?: string;
    author?: string;
    avatar?: string;
    category?: string;
    collectCount?: number;
    commentCount?: number;
    content?: string;
    preview?: string;
    snapshot?: string;
    title?: string;
    viewCount?: number;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'ACCEPTED'
      | 'ALREADY_REPORTED'
      | 'BAD_GATEWAY'
      | 'BAD_REQUEST'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'CHECKPOINT'
      | 'CONFLICT'
      | 'CONTINUE'
      | 'CREATED'
      | 'DESTINATION_LOCKED'
      | 'EXPECTATION_FAILED'
      | 'FAILED_DEPENDENCY'
      | 'FORBIDDEN'
      | 'FOUND'
      | 'GATEWAY_TIMEOUT'
      | 'GONE'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'IM_USED'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'INSUFFICIENT_STORAGE'
      | 'INTERNAL_SERVER_ERROR'
      | 'I_AM_A_TEAPOT'
      | 'LENGTH_REQUIRED'
      | 'LOCKED'
      | 'LOOP_DETECTED'
      | 'METHOD_FAILURE'
      | 'METHOD_NOT_ALLOWED'
      | 'MOVED_PERMANENTLY'
      | 'MOVED_TEMPORARILY'
      | 'MULTIPLE_CHOICES'
      | 'MULTI_STATUS'
      | 'NETWORK_AUTHENTICATION_REQUIRED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NOT_ACCEPTABLE'
      | 'NOT_EXTENDED'
      | 'NOT_FOUND'
      | 'NOT_IMPLEMENTED'
      | 'NOT_MODIFIED'
      | 'NO_CONTENT'
      | 'OK'
      | 'PARTIAL_CONTENT'
      | 'PAYLOAD_TOO_LARGE'
      | 'PAYMENT_REQUIRED'
      | 'PERMANENT_REDIRECT'
      | 'PRECONDITION_FAILED'
      | 'PRECONDITION_REQUIRED'
      | 'PROCESSING'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'REQUEST_TIMEOUT'
      | 'REQUEST_URI_TOO_LONG'
      | 'RESET_CONTENT'
      | 'SEE_OTHER'
      | 'SERVICE_UNAVAILABLE'
      | 'SWITCHING_PROTOCOLS'
      | 'TEMPORARY_REDIRECT'
      | 'TOO_EARLY'
      | 'TOO_MANY_REQUESTS'
      | 'UNAUTHORIZED'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'UNPROCESSABLE_ENTITY'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UPGRADE_REQUIRED'
      | 'URI_TOO_LONG'
      | 'USE_PROXY'
      | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
  };

  type ScreeningListVO = {
    parameter?: string;
    text?: string;
  };

  type SetHomeConfigRequest = {
    homeConfig?: Home;
  };

  type UpdateArticleRequest = {
    content?: UpdateArticleVO;
    id?: string;
  };

  type UpdateArticleVO = {
    category?: string;
    content?: string;
    preview?: string;
    snapshot?: string;
    title?: string;
  };

  type UpdateStatusRequest = {
    content?: AuditArticleVO[];
  };

  type UpdateUserRequest = {
    content?: UpdateUserVO;
    id?: string;
  };

  type UpdateUserVO = {
    avatar?: string;
    introduction?: string;
    nickname?: string;
  };

  type UserListVO = {
    avatar?: string;
    creationLevel?: string;
    introduction?: string;
    nickname?: string;
    userId?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    introduction?: string;
    nickname?: string;
    userAccount?: string;
    userAvatar?: string;
    userPassword?: string;
  };

  type UserVO = {
    avatar?: string;
    collectCount?: number;
    currentTime?: string;
    introduction?: string;
    nickname?: string;
    userid?: string;
    viewCount?: number;
  };

  type View = {
    contentType?: string;
  };
}
