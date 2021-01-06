01-basic
首先，我们看一个简单的demo。通过它可以修改 “https://developer.chrome.com/” 这个网站的背景色
访问这网站，默认是个白色背景，很刺眼。
演示我们的demo
那这是如何实现的呢？
讲解下manifest.json：这是一个核心文件，配置了我们所需要的权限，指明了我们的popup页面是哪个文件。

要实现的目标
1. 我们的扩展只针对developer.chrome.com这个网站。所以使用的是page_action而不是browser_action。演示下这两者的区别。只有当匹配到对应规则时，page_action才生效，那如何匹配呢，使用到chrome.declarativeContent这样一个api，所以需声明权限declarativeContent
2. 要修改网页背景色。为了操作网页的document，需要声明权限activeTab
3. 操作网页document，我们需要使用chrome.tabs.executeScript这样一个api，它又需要chrome.tabs.query获取当前tabId，指明要操作的tab
4. 支持选择其它颜色。options.html配置了几种颜色，popup.html默认了绿色，如何在popup.js获取到options.html配置的颜色呢？使用chrome.storage做媒介。所以我们需要声明权限storage。(SESSION 1)


02-injected
1. 我们想让代码尽早执行，所以执行时机是document_start
2. web_accessible_resources需要添加注入的脚本
3. 还不够第一时间

02-injected-optimized
1. 同步执行script，肯定最快

03-copy-anything
1. 因为只针对百度文库，所以content_scripts的matches限制下

03-copy-anything-final

04-cross-request
1. 这回content script注入我们改用`<all_urls>`，注入任意网站。顺便一提，content 这里支持注入多个（数组形式）
2. 因为我们要请求任意地址，所以permissions声明下权限
3. 同样使用前面demo中的injectCustomJs方法，用于injected代码
4. 查看通信表，得知content script脚本可以使用 chrome.runtime.sendMessage 发送消息给 background.js。而background.js则使用chrome.runtime.onMessage.addListener接收消息
5. 异步消息需return true告知
6. injected ---> content ---> background ---> content ---> injected
7. 原请求：fetch('https://wenku.baidu.com/xpage/form/getform?id=2020_index_classification')。
  跨域请求：crossFetch('https://wenku.baidu.com/xpage/form/getform?id=2020_index_classification').then(res=>console.log(res))

05-vue-force-dev
1. 简单地搜索下关键字，如devtools之类的，大概翻下源码
2.