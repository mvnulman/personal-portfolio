export const fetchHygraphQuery = async <T>(
  query: string,
  revalidate?: number,
): Promise<T> => {
  const hygraphUrl = process.env.HYGRAPH_URL;
  const hygraphToken = process.env.HYGRAPH_TOKEN;

  if (!hygraphUrl || !hygraphToken) {
    throw new Error(
      'HYGRAPH_URL and HYGRAPH_TOKEN environment variables must be set',
    );
  }

  const response = await fetch(hygraphUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${hygraphToken}`,
    },
    next: {
      revalidate,
    },
    body: JSON.stringify({
      query,
    }),
  });

  const { data } = await response.json();

  return data;
};
