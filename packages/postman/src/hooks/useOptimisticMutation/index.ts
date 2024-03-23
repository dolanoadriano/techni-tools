import {
  DefaultError,
  MutateFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { useRef, useState } from "react";

type Helper = {
  abortController: AbortController;
};

interface UseOptimisticMutationOptions<TData, TError, TVariables>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> {
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
  const abortControllerRef = useRef<AbortController | null>(null);
  const [cachedData, setCachedData] = useState<TData | undefined>(undefined);

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
    options.onSuccess?.(...args);
  };

  const cancel = (reason?: any) => {
    abortControllerRef.current?.abort(reason);
  };

  const { data, ...restMutationResult } = useMutation<
    TData,
    TError,
    TVariables
  >(
    {
      ...options,
      mutationFn: mutateFnWithAbortController,
      onSuccess: handleSuccess,
    },
    queryClient
  );

  const result = {
    ...restMutationResult,
    data: data || cachedData,
    cancel,
  } as UseOptimisticMutationResult<TData, TError, TVariables>;

  return result;
};

export default useOptimisticMutation;
