const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3001/api/aroy";

type ApiRequestOptions = RequestInit & {
  token?: string | null;
};

export const buildApiUrl = (path: string): string =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { token, headers, ...restOptions } = options;
  let response: Response;

  try {
    response = await fetch(buildApiUrl(path), {
      ...restOptions,
      headers: {
        ...(headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your internet connection.",
    );
  }

  const isJsonResponse = response.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJsonResponse ? await response.json().catch(() => undefined) : undefined;

  if (!response.ok) {
    const message =
      payload?.message ??
      payload?.error ??
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}
