
// NOTICE 这里作为demo演示简单点，直接将代码贴在这里
// 实际上项目有工程化，通过import进来
const crack = function() {
  const _alert = window.alert.bind(window);
  debugger;
  window.alert = () => {
    _alert('你被我拦截了');
  }
}

debugger;
injectCustomJs(crack);

/**
 * 注入脚本
 * @param {文件路径} jsPath
 */
function injectCustomJs(func) {
  const source = ';(' + func.toString() + ')(window)';
  const script = document.createElement('script');
  // 将代码作为内容贴到script里，直接同步执行，保证第一时间
  script.textContent = source;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}
