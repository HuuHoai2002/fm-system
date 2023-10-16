import { useRouter } from "next/router";

interface IParseQuery {
  queries: string;
  router: ReturnType<typeof useRouter>;
}

const useParseQuery = (): IParseQuery => {
  const router = useRouter();

  const queries = Object.keys(router.query)
    .map((key) => `${key}=${encodeURIComponent(router.query[key] as string)}`)
    .join("&");

  return { queries: queries ? `?${queries}` : "", router };
};

export default useParseQuery;
