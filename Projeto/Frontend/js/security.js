(function () {

  const LOGIN_PAGE = "/Projeto/Frontend/html/autenticacao/login.html";
  const TOKEN_KEY = "token";

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function isPublicPage() {
    const p = window.location.pathname.toLowerCase();
    return p.includes("/autenticacao/login.html") || p.includes("/autenticacao/lockscreen.html");
  }

  // ---------------- ROUTE GUARD ----------------
  if (!isPublicPage() && !getToken()) {
    sessionStorage.setItem("postLoginRedirect", window.location.href);
    window.location.replace(LOGIN_PAGE);
    return;
  }

  // ---------------- FETCH INTERCEPTOR ----------------
  const _fetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const token = getToken();
    const headers = new Headers(init.headers || {});
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await _fetch(input, { ...init, headers });

    if (res.status === 401 && !isPublicPage()) forceLogout();
    return res;
  };

  // ---------------- XHR INTERCEPTOR (DevExtreme / jQuery) ----------------
  const open = XMLHttpRequest.prototype.open;
  const send = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function () {
    this._needsAuth = true;
    return open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    try {
      const token = getToken();
      if (token && this._needsAuth) {
        this.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      this.addEventListener("load", () => {
        if (this.status === 401 && !isPublicPage()) forceLogout();
      });

    } catch (e) { }

    return send.apply(this, arguments);
  };

  function forceLogout() {
    localStorage.clear();
    sessionStorage.setItem("postLoginRedirect", window.location.href);
    window.location.replace(LOGIN_PAGE);
  }

})();
