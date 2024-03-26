import {
  DefaultError,
  MutateFunction,
  MutationKey,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRef, useState } from "react";

type Helper = {
  abortController: AbortController;
};

interface UseOptimisticMutationOptions<TData, TError, TVariables>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> {
  mutationKey: MutationKey;
  mutationFn: (variables: TVariables, helper: Helper) => Promise<TData>;
}

type UseOptimisticMutationResult<TData, TError, TVariables> = UseMutationResult<
  TData,
  TError,
  TVariables
> & {
  cancel: (reason?: any) => void;
};

const useOptimisticMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void
>(
  options: UseOptimisticMutationOptions<TData, TError, TVariables>,
  queryClient?: QueryClient
): UseOptimisticMutationResult<TData, TError, TVariables> => {
  const key = options.mutationKey?.join("-");
  const abortControllerRef = useRef<AbortController | null>(null);
  const [cachedData, setCachedData] = useLocalStorage<TData | null>(
    `${key}-data`,
    null
  );
  const [cachedError, setCachedError] = useLocalStorage<TError | null>(
    `${key}-error`,
    null
  );

  console.log(key);

  const mutateFnWithAbortController: MutateFunction<
    TData,
    TError,
    TVariables
  > = (variables: TVariables) => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    return options.mutationFn(variables, { abortController });
  };

  const handleSuccess: UseMutationOptions<
    TData,
    TError,
    TVariables
  >["onSuccess"] = (...args) => {
    setCachedData(args[0]);
    setCachedError(null);
    options.onSuccess?.(...args);
  };

  const handleError: UseMutationOptions<
    TData,
    TError,
    TVariables
  >["onError"] = (...args) => {
    setCachedError(args[0]);
    setCachedData(null);
    options.onError?.(...args);
  };

  const cancel = (reason?: any) => {
    abortControllerRef.current?.abort(reason);
  };

  const { data, error, ...restMutationResult } = useMutation<
    TData,
    TError,
    TVariables
  >(
    {
      ...options,
      mutationFn: mutateFnWithAbortController,
      onSuccess: handleSuccess,
      onError: handleError,
    },
    queryClient
  );

  const result = {
    ...restMutationResult,
    data: data || cachedData,
    error: error || cachedError,
    cancel,
  } as UseOptimisticMutationResult<TData, TError, TVariables>;

  return result;
};

export default useOptimisticMutation;
