class Http {
  static async fetch(method, path, opts) {
    const { query, body, headers } = Object.assign(
      { query: {}, body: {}, headers: {} },
      opts
    );

    headers.Authorization = sessionStorage.getItem("password");

    let queryString = Object.entries(query)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    const config = { method, headers: new Headers(headers) };
    if (body !== undefined && (method == "POST" || method == "PUT")) {
      config.body = JSON.stringify(body);
      config.headers.append("Content-Type", "application/json");
    }

    let res = await fetch(
      `${global.env.API_URL}/${path}?${queryString}`,
      config
    );
    return res;
  }

  static async get(path, opts) {
    let res = await Http.fetch("GET", path, opts);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  static async post(path, opts) {
    let res = await Http.fetch("POST", path, opts);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  static async put(path, opts) {
    return Http.fetch("PUT", path, opts);
  }

  static async delete(path, opts) {
    return Http.fetch("DELETE", path, opts);
  }

  static async patch(path, opts) {
    return Http.fetch("PATCH", path, opts);
  }

  static async log(ev, data) {
    Http.post("doit", {
      body: {
        page: window.location.pathname,
        token: localStorage.getItem("token"),
        event: ev,
        data: data ?? "none",
      },
    });
  }
}
export default Http;
