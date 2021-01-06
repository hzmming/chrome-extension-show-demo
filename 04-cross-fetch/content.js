
window.addEventListener(
  "message",
  async function (e) {
    if(e.data.isRequest){
      const res = await _crossFetch(e.data.params);
      // content script ---> injected script
      window.postMessage({
        isResponse: true,
        res
      })
    }
  }
)

/**
 * 跨域请求
 * @param {请求地址} url
 * @param {参数} params
 */
function _crossFetch(params) {
  return new Promise((resolve, reject) => {
    // content script ---> background.js
    chrome.runtime.sendMessage(
      {
        isRequest: true,
        params,
      },
      function (response) {
        resolve(response);
      }
    );
  });
}
