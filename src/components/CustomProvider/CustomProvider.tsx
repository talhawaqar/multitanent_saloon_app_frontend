"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Provider } from "jotai";
import { UnAuthorizedDialog } from "..//UnAuthorizedDialog";
import { usePathname } from "next/navigation";

export function CustomProvider({ children }: { children: React.ReactNode }) {
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName == "/login") {
      setIsUnauthorized(false);
    }
  }, [pathName]);

  const onError = useCallback(
    (error: any) => {
      if (error.status === 401 && pathName != "/login") {
        setIsUnauthorized(true);
      }
    },
    [pathName]
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError,
        }),
        mutationCache: new MutationCache({
          onError,
        }),
      }),
    [onError]
  );

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        {isUnauthorized ? <UnAuthorizedDialog /> : children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
