export type QueryKey = any

export type QueryFn = (...args: any[]) => Promise<any>

export type RetryFn = (retries: number, error?: Error) => boolean

export type RetryDelayFn = (retries: number, error?: Error) => number

export type QueryRetry = boolean | number | RetryFn

export type QueryRetryDelay = number | RetryDelayFn

export type QueryOptions = {
    staleTime?: number
    force?: boolean
    hardForce?: boolean
    retry?: QueryRetry
    retryDelay?: QueryRetryDelay
    distinctRetry?: boolean
    deactivate?: boolean | (() => boolean)
    deactivateOnWindowHidden?: boolean
    refetchOnWindowFocus?: boolean
}

export type QueryType = {
    queryKey: QueryKey
    queryFn: QueryFn | null
    promise: Promise<any> | null
    options: QueryOptions
    isLoading: boolean
    isFetching: boolean
    isRetrying: boolean
    isIdle: boolean
    isFetched: boolean
    isFailed: boolean
    fetchedAt: Date | null
    failedAt: Date | null
    retries: number
}

export type QueryState = 'loading' | 'fetching' | 'retrying' | 'fulfilled' | 'failed' | 'retried'
