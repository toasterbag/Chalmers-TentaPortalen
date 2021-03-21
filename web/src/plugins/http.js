class Http {
  static async fetch(method, path, query = {}, body = null) {
    let queryString = Object.entries(query)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    const config = { method, headers: new Headers() };
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

  static async get(path, query) {
    let res = await Http.fetch("GET", path, query);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  static async post(path, query, body) {
    return Http.fetch("POST", path, query, body);
  }

  static async put(path, query, body) {
    return Http.fetch("PUT", path, query, body);
  }

  static async delete(path, query) {
    return Http.fetch("DELETE", path, query);
  }

  static async patch(path, query) {
    return Http.fetch("PATCH", path, query);
  }

  static async log(ev, data) {
    Http.post(
      "doit",
      {},
      {
        page: window.location.pathname,
        token: localStorage.getItem("token"),
        event: ev,
        data: data ?? "none",
      }
    );
  }
}
export default Http;
