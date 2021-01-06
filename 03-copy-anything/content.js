
// NOTICE 这里依然是作为demo演示简单点，直接将代码贴在这里
// 实际上项目有工程化，通过import进来
const crack = function() {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  window.addEventListener(
    // 键盘 control/command + c
    'keydown',
    e => e.stopImmediatePropagation(),
    true // 捕获阶段
  )
  window.addEventListener(
    // 右键菜单
    'contextmenu',
    e => e.stopImmediatePropagation(),
    true // 捕获阶段
  )
  window.addEventListener(
    // 复制事件
    'copy',
    e => e.stopImmediatePropagation(),
    true // 捕获阶段
  )
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

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
