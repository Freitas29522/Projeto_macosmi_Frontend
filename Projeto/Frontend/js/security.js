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

  // ---------------- AUTO-LOCK POR INATIVIDADE ----------------
  const LOCKSCREEN_PAGE = "/Projeto/Frontend/html/autenticacao/lockscreen.html";
  const IDLE_MINUTES = 5; // ajusta aqui

  function forceLock() {
    // remove só o token (mantém nome/email para o lockscreen mostrar)
    localStorage.removeItem("token");

    // opcional: guardar para onde estava para voltar depois do unlock
    sessionStorage.setItem("postLoginRedirect", window.location.href);

    // manda para lockscreen
    window.location.replace(LOCKSCREEN_PAGE);
  }

  function startIdleLock() {
    if (isPublicPage()) return;

    let idleTimer;
    let lastReset = 0;

    const reset = () => {
      const now = Date.now();
      if (now - lastReset < 1000) return; // máx 1 vez por segundo
      lastReset = now;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(forceLock, IDLE_MINUTES * 60 * 1000);
    };

    window.addEventListener("storage", (e) => {
      if (e.key === TOKEN_KEY && e.newValue === null && !isPublicPage()) {
        window.location.replace(LOCKSCREEN_PAGE);
      }
    });

    ["click", "mousemove", "keydown", "scroll", "touchstart"].forEach((evt) => {
      document.addEventListener(evt, reset, { passive: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) reset();
    });

    reset();
  }

  startIdleLock();

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
