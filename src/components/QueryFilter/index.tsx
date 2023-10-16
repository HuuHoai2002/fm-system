"use client";

import { IPagination } from "@/types/pagination";
import { Button } from "@nextui-org/react";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { DependencyList } from "react";
import Input from "../Input/Input";
import Select, { SelectOption } from "../Input/Select";

type QueryFilterItem = {
  queryType: "search" | "filter" | "sort";
  options?: SelectOption[];
  key: string; // unique
  placeholder?: string;
};

type QueryFilterItemValue = {
  key: string;
  value: string;
  queryType?: string;
};

type ChildrenProps = {
  pagination: IPagination;
  onPaginationChange: (page: number) => void;
};

interface QueryFilterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: QueryFilterItem[];
  setQuery?: (query: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  initPagination: {
    page: number;
    limit: number;
  };
  pagination?: IPagination | undefined;
  children?: (props: ChildrenProps) => React.ReactNode;
  deps?: DependencyList;
}

const QueryFilter: React.FC<QueryFilterProps> = ({
  items,
  setQuery,
  disabled,
  isLoading,
  pagination,
  initPagination,
  children,
  ...props
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const initialState = React.useMemo(
    () => [
      {
        key: "page",
        value: initPagination.page.toString(),
      },
      {
        key: "limit",
        value: initPagination.limit.toString(),
      },
    ],
    [initPagination]
  );

  const [queries, setQueries] = React.useState<QueryFilterItemValue[]>([
    ...initialState,
  ]);

  const parseQuery = React.useCallback((queries: QueryFilterItemValue[]) => {
    return queries
      .map((q) => {
        if (q.value) {
          return q.queryType
            ? `${q.queryType}[${q.key}]=${q.value}`
            : `${q.key}=${q.value}`;
        }

        return;
      })
      ?.join("&")
      ?.replace(/&+/g, "&");
  }, []);

  const getQuery = React.useCallback(
    () => parseQuery(queries),
    [queries, parseQuery]
  );

  const getQueryFilterItem = React.useCallback(
    (queryType: string) => {
      return items.filter((d) => d.queryType === queryType);
    },
    [items]
  );

  const onQueryChange = React.useCallback(() => {
    const query = getQuery();

    if (!query) {
      return;
    }

    if (setQuery) {
      setQuery(`?${query}`);
    }

    router.push(`${pathname}?${query}`);
  }, [getQuery, pathname, router, setQuery]);

  const onPaginationChange = React.useCallback(
    (page: number) => {
      const newQueries = [...queries];
      const index = newQueries.findIndex((d) => d.key === "page");
      newQueries[index].value = page.toString();

      setQueries(newQueries);

      if (setQuery) {
        setQuery(`?${parseQuery(newQueries)}`);
      }

      router.push(`${pathname}?${parseQuery(newQueries)}`);
    },

    [pathname, queries, router, setQuery, parseQuery]
  );

  const onQueryClear = React.useCallback(() => {
    if (queries.length === 0) {
      return;
    }
    setQueries(() => [...initialState]);

    if (setQuery) {
      setQuery(`?${parseQuery(initialState)}`);
    }

    router.push(`${pathname}?${parseQuery(initialState)}`);
  }, [initialState, pathname, queries, router, setQuery, parseQuery]);

  const initQueryParams = React.useCallback(() => {
    const query = decodeURIComponent(params.toString() || "");
    const queryItems = query?.split("&"); // ["search[title]=abc", "filter[status]=1", "page=1", "limit=10"]

    if (!query || !queryItems?.length) {
      return;
    }

    const newQueries: QueryFilterItemValue[] = [];

    queryItems.forEach((item) => {
      const queryType = item.split("[")[0];
      const key = item.split("[")[1]?.split("]")[0];
      const value = decodeURIComponent(item.split("=")[1])?.replace(/\+/g, " ");

      const isValid = items.find(
        (d) => d.key === key && d.queryType === queryType
      );

      const isPagination =
        item.split("=")[0] === "page" || item.split("=")[0] === "limit";

      if (isPagination) {
        const key = item.split("=")[0];
        const value = decodeURIComponent(item.split("=")[1]);

        if (key === "page") {
          return newQueries.push({
            key,
            value,
          });
        }

        if (key === "limit") {
          return newQueries.push({
            key,
            value: initPagination.limit.toString(),
          });
        }
      }

      if (isValid) {
        if (queryType === "sort" || queryType === "filter") {
          if (
            items
              .find((d) => d.key === key)
              ?.options?.find((d) => d.value === value)
          ) {
            return newQueries.push({
              key,
              value,
              queryType,
            });
          }

          return;
        }
        newQueries.push({
          key,
          value,
          queryType,
        });
      } else {
        console.warn(`Query key ${key} is not valid`);
      }
    });

    setQueries(newQueries);

    return newQueries;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const queries = initQueryParams();

    if (queries?.length && setQuery) {
      setQuery(`?${parseQuery(queries)}`);
    }

    if (!queries?.length && initPagination?.page) {
      onQueryChange();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuery = (queryType: string, key: string, value: string) => {
    const newQuery = [...queries];
    const index = newQuery.findIndex((q) => q.key === key);

    if (!value) {
      newQuery.splice(index, 1);
      setQueries(newQuery);
      return;
    }

    if (index >= 0) {
      newQuery[index] = { key, value, queryType };
    } else {
      newQuery.push({ key, value, queryType });
    }

    setQueries(newQuery);
  };

  return (
    <div {...props}>
      <div
        className={classNames(
          "bg-white p-4 rounded-xl mb-4 flex items-center",
          {
            "select-none opacity-80 !cursor-not-allowed": disabled,
          }
        )}
      >
        <div className="space-y-3 md:space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {getQueryFilterItem("search").map((item) => (
              <div key={item.key} className="w-full flex items-center gap-x-3">
                <Input
                  placeholder={item.placeholder}
                  onChange={(e) =>
                    handleQuery("search", item.key, e.target.value)
                  }
                  fullWidth
                  disabled={disabled}
                  small
                  value={queries.find((q) => q.key === item.key)?.value || ""}
                />
              </div>
            ))}
            {getQueryFilterItem("filter").map((item) => (
              <div key={item.key} className="w-full flex items-center gap-x-3">
                <Select
                  onChange={(option) =>
                    handleQuery("filter", item.key, option.value)
                  }
                  fullWidth
                  placeholder={item.placeholder}
                  defaultValue={queries.find((q) => q.key === item.key)?.value}
                  disabled={disabled}
                  small
                  options={item.options || []}
                />
              </div>
            ))}
            {getQueryFilterItem("sort").map((item) => (
              <div key={item.key} className="w-full flex items-center gap-x-3">
                <Select
                  onChange={(option) =>
                    handleQuery("sort", item.key, option.value)
                  }
                  fullWidth
                  placeholder={item.placeholder}
                  defaultValue={queries.find((q) => q.key === item.key)?.value}
                  disabled={disabled}
                  small
                  options={item.options || []}
                />
              </div>
            ))}
          </div>
          <div className="space-x-4">
            <Button
              className="rounded-md bg-blue-400 text-white"
              onPress={onQueryChange}
              isDisabled={disabled || !queries.length}
              isLoading={isLoading}
              size="sm"
            >
              Tìm
            </Button>
            <Button
              className="rounded-md"
              variant="bordered"
              onPress={onQueryClear}
              isDisabled={disabled}
              isLoading={isLoading}
              size="sm"
            >
              Nhập lại
            </Button>
          </div>
        </div>
      </div>
      {children &&
        children({
          pagination: pagination || {
            current_page: 1,
            take_per_page: 10,
            has_next_page: false,
            has_previous_page: false,
            total_pages: 1,
            total_results: 0,
          },
          onPaginationChange,
        })}
    </div>
  );
};

export default QueryFilter;
