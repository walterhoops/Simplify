function initialize() {
  exposeAPI();
}

function exposeAPI() {
  window.translateTextAPI = api;
}

export { initialize };