import { QueryOptions, RetryFn, RetryDelayFn } from './types'

export const defaultQueryRetryFn: RetryFn = (retries: number): boolean => {
    return retries < 3
}

export const defaultQueryRetryDelay: RetryDelayFn = (retries: number): number => {
    return Math.min(500 * 2 ** retries, 60000)
}

export const defaultQueryOptions: QueryOptions = {
    staleTime: 0,
    force: false,
    hardForce: false,
    retry: defaultQueryRetryFn,
    retryDelay: defaultQueryRetryDelay,
    distinctRetry: false,
    deactivate: false,
    deactivateOnWindowHidden: false,
    refetchOnWindowFocus: false
}
