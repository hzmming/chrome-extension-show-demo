// SECTION 5
debugger;
injectCustomJs("crack.js");

/**
 * 注入脚本
 * @param {文件路径} jsPath
 */
function injectCustomJs(jsPath) {
  var temp = document.createElement("script");
  temp.async = false;
  temp.setAttribute("type", "text/javascript");
  /**
   * 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/crack.js
   */
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    this.parentNode.removeChild(this);
  };
  /**
   * web_accessible_resources需要添加注入的脚本，不然会加载失败的！！！
   * 此处为 crack.js
   */
  document.documentElement.appendChild(temp);
}
