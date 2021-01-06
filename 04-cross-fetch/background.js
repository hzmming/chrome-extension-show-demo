chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  /**
   * 跨域请求
   */
  if (sender.tab && req.isRequest) {
    (async () => {
      const res = await fetch(...req.params);
      const data = await res.json();
      sendResponse(data);
    })();
    /**
     * sendResponse异步消息，需告知等待
     */
    return true;
  }
});