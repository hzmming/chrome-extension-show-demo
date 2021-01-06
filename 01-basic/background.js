// 第一次安装扩展、扩展升级、浏览器升级都会触发
chrome.runtime.onInstalled.addListener(() => {

  // SECTION 1
  // chrome.storage.sync.set({ color: "pink" }, () => {
  //   console.log("The color is green.");
  // });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});