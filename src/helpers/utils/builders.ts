export const urlWithParams = (inputUrl: string, params: Record<string, any>): string => {
  console.log('🚀 ~ urlWithParams ~ params:', params);
  const apiUrl = import.meta.env.VITE_API_URL;

  const safeApiUrl = apiUrl.charAt(apiUrl.length - 1) === '/' ? apiUrl.slice(0, -1) : apiUrl;
  const safeInputUrl = inputUrl.charAt(0) === '/' ? inputUrl.slice(1) : inputUrl;

  const url = new URL(`${safeApiUrl}/${safeInputUrl}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const strUrl = url.toString();

  return strUrl;
};
