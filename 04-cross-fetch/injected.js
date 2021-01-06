

function inject(...params) {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 我运行在网页js环境中 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // 1. 注册crossFetch方法
  window.crossFetch = (...params) => {
    // injected script ---> content script
    window.postMessage({
      isRequest: true,
      params
    })
    return new Promise(resolve => {
      // 简单处理下 
      // resolve promise outside
      window._tempResolve = resolve;
    })
  }

  // 2. 接收
  window.addEventListener(
    "message",
    async function (e) {
      if(e.data.isResponse){
        _postMessageCallback(e.data.res);
      }
    }
  )


  window._postMessageCallback = (res) =>{
    window._tempResolve(res)
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 我运行在网页js环境中 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
