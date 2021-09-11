const XRegExp = require('xregexp');

/*          token             */

const ID_TOKEN_KEY = "token";
const ISME_ID_TOKEN_KEY = "isme-token";
const DAL_TOKEN_KEY = "dal-token";
const LOAD_BALANCE = "load-balance";
const SAVING_INTEREST_CAL = "saving-interest-cal";
const TOKEN_EXPERIES_TIME = "token-expires-time";
const ID_REFRESH_TOKEN_KEY = "refresh-token";

export const getToken = () => {
  let token_decode = '';
  if (localStorage.getItem(ID_TOKEN_KEY) !== null) {
    token_decode = JSON.parse(Buffer.from(localStorage.getItem(ID_TOKEN_KEY), 'base64').toString('ascii'));
  }
  token_decode = token_decode.slice(0, -5);
  return token_decode;
  // return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  let update_token = token + '+next';
  let token_encode = Buffer.from(JSON.stringify(update_token)).toString("base64");
  window.localStorage.setItem(ID_TOKEN_KEY, token_encode);

  //window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

/*         TokenExpiresTime         */

export const getTokenExpiresTime = () => {
  return localStorage.getItem(TOKEN_EXPERIES_TIME);
};

export const saveTokenExpiresTime = expiresTime => {
  window.localStorage.setItem(TOKEN_EXPERIES_TIME, expiresTime);

};

export const destroyTokenExpiresTime = () => {
  window.localStorage.removeItem(TOKEN_EXPERIES_TIME);
};

/*         Refresh Token         */
export const getRefreshToken = () => {
  return localStorage.getItem(ID_REFRESH_TOKEN_KEY);
};

export const saveRefreshToken = refresh_token => {
  window.localStorage.setItem(ID_REFRESH_TOKEN_KEY, refresh_token);

  //window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyRefreshToken = () => {
  window.localStorage.removeItem(ID_REFRESH_TOKEN_KEY);
};

/*         ISME Token Info         */

export const getIsmeToken = () => {
  let token_decode = '';
  if (localStorage.getItem(ISME_ID_TOKEN_KEY) !== null) {
    token_decode = JSON.parse(Buffer.from(localStorage.getItem(ISME_ID_TOKEN_KEY), 'base64').toString('ascii'));
  }
  token_decode = token_decode.slice(0, -5);
  return token_decode;
  // return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveIsmeToken = token => {
  let update_token = token + '+next';
  let token_encode = Buffer.from(JSON.stringify(update_token)).toString("base64");
  window.localStorage.setItem(ISME_ID_TOKEN_KEY, token_encode);

  //window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyIsmeToken = () => {
  window.localStorage.removeItem(ISME_ID_TOKEN_KEY);
};

/*         Data Analisis Token Info         */

export const getDalToken = () => {
  let token_decode = '';
  if (localStorage.getItem(DAL_TOKEN_KEY) !== null) {
    token_decode = JSON.parse(Buffer.from(localStorage.getItem(DAL_TOKEN_KEY), 'base64').toString('ascii'));
  }
  token_decode = token_decode.slice(0, -5);
  return token_decode;
};

export const saveDalToken = token => {
  let update_token = token + '+next';
  let token_encode = Buffer.from(JSON.stringify(update_token)).toString("base64");
  window.localStorage.setItem(DAL_TOKEN_KEY, token_encode);
};

export const destroyDalToken = () => {
  window.localStorage.removeItem(DAL_TOKEN_KEY);
};

/*        User Info        */

const USER_INFO = 'user';
export const getUserInfo = () => {
  let user_decode = '';
  if (localStorage.getItem(USER_INFO) !== null) {
    user_decode = JSON.parse(Buffer.from(localStorage.getItem(USER_INFO), 'base64').toString('ascii'));
  }
  return user_decode;
};

export const saveUserInfo = user => {
  let string = JSON.stringify(user);
  let userStr = string.replace(/\u2013|\u2014/g, "-");
  let user_encode = Buffer.from(userStr).toString("base64");
  window.localStorage.setItem(USER_INFO, user_encode);
};

export const destroyUserInfo = () => {
  window.localStorage.removeItem(USER_INFO);
};

/*        config        */

const GENERAL_CONFIG = 'general_config';
const AVERAGE_POSITION = 'average_position';
export const getGeneralConfig = () => {
  let general_config_decode = '';
  if (localStorage.getItem(GENERAL_CONFIG) !== null) {
    general_config_decode = JSON.parse(Buffer.from(localStorage.getItem(GENERAL_CONFIG), 'base64').toString('ascii'));
  }
  return general_config_decode;
};

export const saveGeneralConfig = general_config => {
  let string = JSON.stringify(general_config);
  let genStr = string.replace(/\u2013|\u2014/g, "-");
  let general_config_encode = Buffer.from(genStr).toString("base64");
  window.localStorage.setItem(GENERAL_CONFIG, general_config_encode);
};

export const destroyGeneralConfig = () => {
  window.localStorage.removeItem(GENERAL_CONFIG);
};

export const saveAveragePositionConfig = average_position => {
  let string = JSON.stringify(average_position);
  let genStr = string.replace(/\u2013|\u2014/g, "-");
  let average_position_encode = Buffer.from(genStr).toString("base64");
  window.localStorage.setItem(AVERAGE_POSITION, average_position_encode);
};

export const getAveragePositionConfig = () => {
  let average_position_decode = '';
  if (localStorage.getItem(GENERAL_CONFIG) !== null) {
    average_position_decode = JSON.parse(Buffer.from(localStorage.getItem(AVERAGE_POSITION), 'base64').toString('ascii'));
  }
  return average_position_decode;
};

export const destroyAveragePositionConfig = () => {
  window.localStorage.removeItem(AVERAGE_POSITION);
};
/*        policy        */
const POLICY = 'policy';
export const getPolicy = () => {
  let policy_decode = '';
  if (localStorage.getItem(POLICY) !== null) {
    policy_decode = JSON.parse(Buffer.from(localStorage.getItem(POLICY), 'base64').toString('ascii'));
  }
  return policy_decode;
};

export const savePolicy = general_config => {
  let policy_encode = Buffer.from(JSON.stringify(general_config)).toString("base64");
  window.localStorage.setItem(POLICY, policy_encode);
};

export const destroyPolicy = () => {
  window.localStorage.removeItem(POLICY);
};
/*        notification        */

const NOTIFICATION = 'notification';
export const getNotification = () => {
  let notification_decode = '';
  if (localStorage.getItem(NOTIFICATION) !== null) {
    // notification_decode = JSON.parse(Buffer.from(localStorage.getItem(NOTIFICATION), 'base64').toString('ascii'));
    notification_decode = Buffer.from(localStorage.getItem(NOTIFICATION), 'base64').toString('ascii');
  }
  return notification_decode;
};

export const saveNotification = notification => {
  let notification_encode = Buffer.from(JSON.stringify(notification)).toString("base64");
  window.localStorage.setItem(NOTIFICATION, notification_encode);
};

export const destroyNotification = () => {
  window.localStorage.removeItem(NOTIFICATION);
};

/*        load balancing        */
export const getLoadBalancing = () => {
  let decode = '';
  if (localStorage.getItem(LOAD_BALANCE) !== null) {
    decode = JSON.parse(Buffer.from(localStorage.getItem(LOAD_BALANCE), 'base64').toString('ascii'));
  }
  return decode;
};

export const saveLoadBalancing = data => {
  let encode = Buffer.from(JSON.stringify(data)).toString("base64");
  window.localStorage.setItem(LOAD_BALANCE, encode);
};

export const destroyLoadBalancing = () => {
  window.localStorage.removeItem(LOAD_BALANCE);
};


/*        load Saving Interest Calculation         */

export const getSavingInterestCal = () => {
  let decode = '';
  if (localStorage.getItem(SAVING_INTEREST_CAL) !== null) {
    decode = JSON.parse(Buffer.from(localStorage.getItem(SAVING_INTEREST_CAL), 'base64').toString('ascii'));
  }
  return decode;
};

export const saveSavingInterestCal = data => {
  let encode = Buffer.from(JSON.stringify(data)).toString("base64");
  window.localStorage.setItem(SAVING_INTEREST_CAL, encode);
};

export const destroySavingInterestCal = () => {
  window.localStorage.removeItem(SAVING_INTEREST_CAL);
};


export default {
  getToken,
  saveToken,
  destroyToken,
  saveTokenExpiresTime,
  getTokenExpiresTime,
  destroyTokenExpiresTime,
  getRefreshToken,
  saveRefreshToken,
  destroyRefreshToken,
  getIsmeToken,
  saveIsmeToken,
  destroyIsmeToken,
  getUserInfo,
  saveUserInfo,
  destroyUserInfo,
  saveGeneralConfig,
  getGeneralConfig,
  destroyGeneralConfig,
  saveAveragePositionConfig,
  getAveragePositionConfig,
  destroyAveragePositionConfig,
  getPolicy,
  savePolicy,
  destroyPolicy,
  getNotification,
  saveNotification,
  destroyNotification,
  getDalToken,
  saveDalToken,
  destroyDalToken,
  getLoadBalancing,
  saveLoadBalancing,
  destroyLoadBalancing,
  getSavingInterestCal,
  saveSavingInterestCal,
  destroySavingInterestCal
};
