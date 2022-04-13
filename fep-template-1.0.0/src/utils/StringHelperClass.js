/**
 * 字符串辅助类
 */
export default class StringHelperClass {
  /**
   * 处理HTML字符串
   * @param htmlString
   * @returns {null}
   */
  static getJsonFromHtml(htmlString) {
    const i = htmlString.indexOf('{');
    const j = htmlString.lastIndexOf('}');
    if (i >= 0 && j >= 0 && j > i) {
      let jsonString = htmlString.substring(i, j + 1);
      jsonString = this.replaceString(jsonString, '<!--', '-->', '');
      return JSON.parse(jsonString);
    }
    return null;
  }

  /**
   * 生成随机字符串
   * @param 字符串长度
   * @returns {*}
   */
  static randomString(len = 32) {
    const $chars =
      'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i += 1) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  /**
   *
   * @param s 目标字符串
   * @param startString 起始字符
   * @param endString 结束字符
   * @param replaceString 需要替换的字符
   * @returns {*}
   */
  static replaceString(s, startString, endString, replaceString) {
    let tmpS = s;
    let i = -1;
    let j = -1;
    i = tmpS.indexOf(startString);

    while (i >= 0) {
      j = tmpS.indexOf(endString, i + 1);
      if (j >= 0) {
        tmpS =
          tmpS.substring(0, i) +
          replaceString +
          tmpS.substr(j + endString.length);
        i = tmpS.indexOf(
          startString,
          i + startString.length + replaceString.length + 1
        );
      }
    }
    return tmpS;
  }
}
