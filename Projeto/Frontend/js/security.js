(function () {
  const LOGIN_PAGE = "/Projeto/Frontend/html/autenticacao/login.html";
  const TOKEN_KEY = "token";

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function isPublicPage() {
    const p = window.location.pathname.toLowerCase();
    return (
      p.includes("/autenticacao/login.html") ||
      p.includes("/autenticacao/lockscreen.html")
    );
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
    if (!isPublicPage() && token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const res = await _fetch(input, { ...init, headers });

    if (res.status === 401 && !isPublicPage()) forceLogout();
    return res;
  };

  // ---------------- XHR INTERCEPTOR (DevExtreme / jQuery) ----------------
  const open = XMLHttpRequest.prototype.open;
  const send = XMLHttpRequest.prototype.send;
  const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url) {
    this._needsAuth = true;
    this._authHeaderSet = false;
    this._headers = this._headers || {};
    return open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    // regista que já houve Authorization manual
    if (String(name).toLowerCase() === "authorization") {
      this._authHeaderSet = true;
    }
    this._headers = this._headers || {};
    this._headers[name] = value;
    return setRequestHeader.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    try {
      const token = getToken();

      // só mete Authorization se:
      // - há token
      // - a request "precisa"
      // - ainda não foi setado manualmente
      if (!isPublicPage() && token && this._needsAuth && !this._authHeaderSet) {
        setRequestHeader.call(this, "Authorization", `Bearer ${token}`);
        this._authHeaderSet = true;
      }

      this.addEventListener("load", () => {
        if (this.status === 401 && !isPublicPage()) forceLogout();
      });
    } catch (e) {}

    return send.apply(this, arguments);
  };

  function forceLogout() {
  localStorage.removeItem("token");
  // se quiseres também:
   localStorage.removeItem("nome");
   localStorage.removeItem("email");

  sessionStorage.setItem("postLoginRedirect", window.location.href);
  window.location.replace(LOGIN_PAGE);
}


  // ---------------- jQuery global setup (extra safe) ----------------
  if (window.jQuery) {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        if (isPublicPage()) return;
        const token = getToken();
        if (token && !xhr._authSetByJq) {
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          xhr._authSetByJq = true;
        }
      },
    });
  }
})();
