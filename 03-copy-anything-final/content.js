
/**
 * 这里是content script。事件流会先经过我这里
 */
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