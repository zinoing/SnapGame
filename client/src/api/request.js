export async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(`API Error: ${res.status} - ${message}`);
  }
  return res.json();
}
