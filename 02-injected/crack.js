(() => {
  const _alert = window.alert.bind(window);
  // SECTION 5
  debugger;
  window.alert = () => {
    _alert('你被我拦截了');
  }
})()