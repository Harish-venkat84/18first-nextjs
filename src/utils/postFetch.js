// "use client";

export async function getData() {
  try {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, isLoading, error } = useSWR(`${process.env.NEXTAUTH_URL}/api/posts`, fetcher);

    return data;
  } catch (error) {
    return undefined;
  }
}
