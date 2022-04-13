/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import StringHelperClass from './StringHelperClass';
import CONSTANTS from './constants';

/**
 * 浏览器辅助类
 */
export default class BrowserHelperClass {
  static isGKKXD() {
    return window.location.hostname === CONSTANTS.HOST_GKKXD;
  }

  static isKAIFAE() {
    return window.location.hostname === CONSTANTS.HOST_KAIFAE;
  }

  static isKXJF() {
    return window.location.hostname === CONSTANTS.HOST_KXJF;
  }

  static getHostname() {
    return window.location.hostname;
  }

  static getPathname() {
    const { location } = window;
    if (location.hostname !== 'localhost') {
      return location.pathname.slice(0, 8);
    }
    return '/';
  }

  static getDownloadURL() {
    let downloadURL;
    switch (this.getHostname()) {
      case CONSTANTS.HOST_KXJF:
        downloadURL = '/cms/mobile/download.html';
        break;
      case CONSTANTS.HOST_KAIFAE:
        downloadURL = '/cms/mobile/downloadKAIFAE.html';
        break;
      case CONSTANTS.HOST_GKKXD:
        downloadURL = '/cms/mobile/downloadKXD.html';
        break;
      case 'localhost':
        downloadURL = '/cms/mobile/download.html';
        break;
      default:
        break;
    }
    return downloadURL;
  }

  /**
   * 获取URL Get参数
   * @returns {Array}
   */
  static getURLParams() {
    const url = window.document.location.href.toString();

    let u = url.split('?');

    let pathParam = '';

    const arr = [];

    // NOTE: 当URL中有多个?
    if (u.length > 2) {
      for (let i = 2; i < u.length; i += 1) {
        pathParam += u[i];
      }
    }
    if (typeof u[1] === 'string') {
      u = u[1].split('&');
      for (const i in u) {
        if ({}.hasOwnProperty.call(u, i)) {
          const a = u[i].split('=');
          const decodeSplitValue = decodeURIComponent(a[1]);
          if (a[0] === 'redirectUrl') {
            arr[a[0]] = `${decodeSplitValue}?${pathParam}`;
          } else {
            arr[a[0]] = decodeSplitValue;
          }
        }
      }
    }
    return arr;
  }

  /**
   * M站项目详情与APP JS Bridge交互
   * @param {string} param
   */
  static mToNativeParams(param) {
    const arr = this.getURLParams();
    if (arr.channel === CONSTANTS.CHANNEL_APP) {
      // For Android
      if (window.Android) {
        try {
          window.Android.getCommodityDetail(param);
        } catch (error) {
          // console.log(error);
        }
      } else {
        // For iOS
        window.getCommodityDetail(param);
      }
    }
  }

  /**
   *
   * @desc  设置Cookie
   * @param {String} name
   * @param {String} value
   * @param {Number} days
   */
  static setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value};expires=${date}`;
  }

  /**
   * 获取cookie值
   * @param name
   * @returns {string}
   */
  static getCookie(name) {
    const strCookie = document.cookie; // 获取cookie字符串
    const arrCookie = strCookie.split('; '); // 分割
    // 遍历匹配
    for (let i = 0; i < arrCookie.length; i += 1) {
      const arr = arrCookie[i].split('=');
      if (arr[0] === name) {
        return arr[1];
      }
    }
    return '';
  }

  /**
   *
   * @desc 根据name删除cookie
   * @param  {String} name
   */
  static removeCookie(name) {
    // 设置已过期，系统会立刻删除cookie
    const value = this.getCookie(name);
    this.setCookie(name, value, -1);
  }

  /**
   * 获取基础URL
   * @returns {*}
   */
  static getBaseUrl() {
    let baseUrl;
    const { location } = window;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = '';
    } else {
      baseUrl = `${location.protocol}//${location.hostname}`;
    }
    return baseUrl;
  }

  /**
   * 获取请求冗余参数
   * 生产环境需要使用从cookie中获取的值
   * @returns {{}}
   */
  static getRedundancyData() {
    let redundancyData = {};
    let appChannel;
    switch (this.getHostname()) {
      case CONSTANTS.HOST_GKKXD:
        appChannel = 'gkkxd';
        break;
      case CONSTANTS.HOST_KAIFAE:
        appChannel = 'kaifae';
        break;
      default:
        appChannel = 'kxjf';
        break;
    }
    if (process.env.NODE_ENV === 'development') {
      redundancyData = {
        appType: 2,
        appVersion: process.env.REACT_APP_APP_VERSION,
        appId: '186BAF35-E9F7-4C7E-86B7-B1C8D89F2674',
        mobileModel: 'Simulator',
        appChannel,
        accessType: this.getCookie('channel') || ''
      };
    } else {
      redundancyData = {
        appType: this.getCookie('kxapptype') || 2,
        appVersion:
          this.getCookie('kxappversion') || process.env.REACT_APP_APP_VERSION,
        appId: this.getCookie('kxduuid') || StringHelperClass.randomString(36),
        appChannel: this.getCookie('kxappchannel') || appChannel,
        accessType: this.getCookie('channel') || ''
      };
    }
    return redundancyData;
  }

  /**
   *
   * @param title
   */
  static changeTitle(title) {
    document.title = title;
    const i = document.createElement('iframe');
    i.style.display = 'none';
    i.src = '/favicon.ico'; // 加载当前页面下一个体积小的资源，比如favicon.ico
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 0);
    };
    document.body.appendChild(i);
  }

  /**
   * 主要解决Android webView 拦截不到routing.push()方法的url问题
   * @param url
   */
  static hrefTo(url) {
    window.location.href = url;
  }

  static hrefPushUrl(url) {
    this.hrefTo(`${window.location.origin}${this.getPathname()}${url}`);
  }

  static hrefReplaceUrl(url) {
    const decodeURL = decodeURIComponent(
      `${window.location.origin}${this.getPathname()}${url}`
    );
    window.location.replace(decodeURL);
  }

  static hrefPushNoPathname(url) {
    this.hrefTo(`${window.location.origin}${url}`);
  }

  /**
   * @param key
   * @param data
   * @param time 失效时间（秒）,默认一天
   * @returns {boolean}
   */
  static setStorage(key, data, time = 60 * 60 * 24 * 1) {
    try {
      if (!localStorage) {
        return false;
      }
      const cacheExpireDate = new Date().getTime() + time * 1000;
      const cacheVal = { val: data, exp: cacheExpireDate };
      localStorage.setItem(key, JSON.stringify(cacheVal)); // 存入缓存值
    } catch (e) {
      // console.log(e);
    }
  }

  /**
   * @param {string} key
   */
  static getStorage(key) {
    try {
      if (!localStorage) {
        return false;
      }
      const cacheVal = localStorage.getItem(key);
      const result = JSON.parse(cacheVal);
      const now = new Date().getTime();
      // 缓存不存在
      if (!result) {
        return null;
      }
      // 缓存过期
      if (now > result.exp) {
        this.removeStorage(key);
        return '';
      }
      return result.val;
    } catch (e) {
      this.removeStorage(key);
      return null;
    }
  }

  /**
   * @param {string} key
   */
  static removeStorage(key) {
    if (!localStorage) {
      return false;
    }
    localStorage.removeItem(key);
  }

  /**
   * 判断是否为iOS系统
   */
  static isIOS() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  /**
   * 判断是否为Android系统
   */
  static isAndroid() {
    const u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
  }
}
