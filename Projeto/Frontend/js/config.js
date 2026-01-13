(function () {
  const LOCAL_API = "https://localhost:44311";
  const PROD_API  = "https://api.tuaempresa.pt";

  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  window.APP_CONFIG = {
    API_BASE_URL: isLocal ? LOCAL_API : PROD_API,
    API_PATH: "/api"
  };
})();