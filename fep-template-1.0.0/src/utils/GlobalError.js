// import Toast from '../components/toast/Toast';

function GlobalError(response, callback) {
  // Toast.hide();
  const { errorCode, errorMessage } = response;
  // 以下为业务错误
  if (
    errorCode === '_GE_LOGIN_OUT_TIME' ||
    errorCode === 'KM-002' ||
    errorCode === 'ERR_USER_REGNAME_ISNULL' ||
    errorCode === '_GE_LOGIN_OPENID_OUT_TIME' ||
    errorCode === 'SYS_USER_ISNULL' ||
    errorCode === 'CM-002'
  ) {
    const encodeURL = encodeURIComponent(window.location);
    window.location.replace(
      `/cms/h5/user.html#!/login?redirectUrl=${encodeURL}`
    );
    return false;
  }

  if (errorCode === 'SYSTEM_MAINTAINING') {
    window.location.href = '/cms/kxdApp/maintain.html';
    return false;
    // throw new Error();
  }

  if (errorMessage === 'timeout of 30000ms exceeded') {
    // Toast.show('网络不给力，请稍后再试');
    return false;
    // throw new Error('网络不给力，请稍后再试');
  }

  if (errorMessage) {
    // 此行要删除
    callback();
    // Toast.show({ message: errorMessage, hideCallback: callback });
    return false;
    // throw new Error(errorMessage);
  }
  return true;
}

export { GlobalError as default };
