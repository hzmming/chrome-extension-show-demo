const changeColor = document.getElementById("changeColor");

// SECTION 1
// background与popup使用storage通信
// chrome.storage.sync.get("color", data => {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color || 'pink');
// });

changeColor.onclick = (element) => {
  const color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {
      // code: `document.body.style.backgroundColor = '${color}';`

      // SECTION 2
      // code: 'window.alert = () => {}'

      // SECTION 3
      // file: 'content/modifyBg.js'
    });

    // SECTION 4
    chrome.tabs.insertCSS(tabs[0].id, {
      code: `body { background-color: ${color} !important; }`, // 审查元素，旁边有个injected stylesheet标志
      // file: 'content/modifyBg.css'
    });
  });
};
