export function resolveBaseUrl(path) {
  let BASE_URL = `http://localhost:3000/api/${path}`;

  if (typeof window !== "undefined") {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

    if (isAndroid) BASE_URL = `http://10.0.2.2:3000/api/${path}`;
  }

  return BASE_URL;
}
