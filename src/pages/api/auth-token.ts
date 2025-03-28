interface FetchOptions extends RequestInit {
  headers?: HeadersInit
}

export const fetchWithAuth = async (
  url: string,
  token: string,
  options: FetchOptions = {},
): Promise<Response> => {
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(url, {
    headers,
    ...options,
  })
  return response
}
