/* eslint-disable no-shadow */
import axios from 'axios';
import _ from 'lodash';
import Qs from 'qs';
import BrowserHelperClass from './BrowserHelperClass';
import StringHelperClass from './StringHelperClass';
// import Toast from '../components/toast/Toast';

// 注入冗余请求参数
const redundancyData = BrowserHelperClass.getRedundancyData();

axios.defaults.withCredentials = true;
// 基础配置
const Axios = axios.create({
  baseURL: BrowserHelperClass.getBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: data => {
    // Toast.loading();
    const assignData = _.assign({}, data, redundancyData);
    return Qs.stringify(assignData);
  }
});

async function httpPost(url, data = {}) {
  const response = await Axios.post(url, data);
  return response.data;
}

async function httpJsonPost(url, data = {}) {
  const response = await Axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: data => {
      const assignData = _.assign({}, data, redundancyData);
      return JSON.stringify(assignData);
    }
  });

  return response.data;
}

async function httpGet(url, config = { responseType: 'json' }) {
  const response = await Axios.get(url, config);
  return response.data;
}

async function httpGetHtml(url, config = { responseType: 'text' }) {
  const response = await Axios.get(url, config);
  return StringHelperClass.getJsonFromHtml(response.data);
}

async function httpGetHtmlText(url, config = { responseType: 'text' }) {
  const response = await Axios.get(url, config);
  return response.data;
}

/**
 *
 * @param methods
 * @returns {Promise<void>}
 */
async function httpAll(methods) {
  const promises = await axios.all(methods);
  return Promise.resolve(promises);
}

export {
  httpPost,
  httpJsonPost,
  httpGet,
  httpGetHtml,
  httpGetHtmlText,
  httpAll
};
