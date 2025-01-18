// "use client";

export async function getData() {
  try {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/posts`, fetcher);

    return data;
  } catch (error) {
    return undefined;
  }
}
