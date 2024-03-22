import {
  DefaultError,
  QueryClient,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";

const useOptimisticMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void
>(
  options: UseMutationOptions<TData, TError, TVariables>,
  queryClient?: QueryClient
) => {
  const [cachedData, setCachedData] = useState<TData | undefined>(undefined);

  const { data, ...restMutationResult } = useMutation<
    TData,
    TError,
    TVariables
  >(
    {
      ...options,
      onSuccess: (...args) => {
        setCachedData(args[0]);
        options.onSuccess?.(...args);
      },
    },
    queryClient
  );

  return { ...restMutationResult, data: data || cachedData };
};

export default useOptimisticMutation;
