const useFetch = async <Response>(
  url: string,
  options?: RequestInit | undefined
): Promise<Response> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('');
  }
  const result = response.json();
  return result;
};

export default useFetch;
