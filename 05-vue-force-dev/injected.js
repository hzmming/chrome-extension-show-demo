

function inject() {
  // SECTION 6.1 拦截api
  const defineProperty = Object.defineProperty;
  Object.defineProperty = function(...args) {
    // [native code]
    hack(...args);
    return defineProperty(...args);
  };

  function hack(...args) {
    // SECTION 6.2 判断时机
    const prop = args[1];
    if (prop !== "config") return;
    const obj = args[0];
    if (!isVue(obj)) return;

    // SECTION 6.3 直接修改成true
    const descriptor = args[2];
    const config = descriptor.get();
    config.devtools = !0;
    config.productionTip = !0;
    // console.log(config);
  }

  // 没什么好的方法，能用就行
  function isVue(obj) {
    if (typeof obj !== "function") return false;
    const prototype = obj.prototype;
    const signs = [
      "_init",
      "$set",
      "$delete",
      "$watch",
      "$on",
      "$once",
      "$off",
      "$emit",
      "_update",
      "$forceUpdate",
      "$destroy"
    ];
    const objKeys = Object.keys(prototype);
    return signs.every(i => objKeys.includes(i));
  }
}


injectCustomJs(inject);


/**
 * 注入脚本
 * @param {文件路径} jsPath
 */
function injectCustomJs(func) {
  const source = ";(" + func.toString() + ")(window)";
  const script = document.createElement("script");
  script.textContent = source;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}
