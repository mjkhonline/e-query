import Collection from './Collection'
import { QueryOptions, QueryKey, QueryFn, QueryType, QueryState, RetryFn, RetryDelayFn } from './index.d'
import { SetStorage, MapStorage } from './Storage'
import { defaultQueryOptions } from './defaults'
import {isBrowser, isPromise} from './utils'

export default class Query {
    public readonly commonOptions: QueryOptions
    private readonly _collection!: Collection
    private _retryStorage!: MapStorage
    private _refetchStorage!: SetStorage

    constructor(options:  QueryOptions = {}) {
        this.commonOptions = {
            ...defaultQueryOptions,
            ...options
        }

        this._collection = new Collection()
        this._retryStorage = new MapStorage()
        this._refetchStorage = new SetStorage()
        this.registerListeners()
    }

    public useQuery(queryKey: QueryKey, queryFn: QueryFn, options: QueryOptions = {}): Promise<any> {
        if (!queryKey || typeof queryFn !== 'function') {
            throw new Error('useQuery requires a query key and a query function.')
        }

        queryKey = Query.deriveKey(queryKey)
        options = {
            ...this.commonOptions,
            ...options
        }

        this._collection[queryKey] = {
            queryFn,
            options
        }

        const query: QueryType = this._collection[queryKey]

        const granted: boolean = this.approveCall(query)
        if (granted) {
            query.promise = query.queryFn!()

            if (!isPromise(query.promise)) {
                throw new Error('queryFn must return a promise.')
            }

            const { isFetched, isFailed } = query
            const isInitialFetch = !isFetched && !isFailed
            Query.setState(query, isInitialFetch ? 'loading' : 'fetching')

            return query.promise
                .then((result: any) => {
                    Query.setState(query, 'fulfilled')
                    return result
                })
                .catch((error) => {
                    if (Query.retryAllowed(query, error)) {
                        Query.setState(query, 'retrying')

                        if (query.options.distinctRetry) {
                            const timerId = setTimeout(
                                () => {
                                    Query.setState(query, 'retried')
                                    return this.useQuery(queryKey, queryFn, options)
                                },
                                Query.calcRetryDelay(query, error)
                            )

                            this._retryStorage.add(queryKey, timerId)
                        } else {
                            return new Promise((resolve) => {
                                const timerId = setTimeout(
                                    () => {
                                        Query.setState(query, 'retried')
                                        resolve(this.useQuery(queryKey, queryFn, options))
                                    },
                                    Query.calcRetryDelay(query, error)
                                )

                                this._retryStorage.add(queryKey, timerId)
                            })
                        }
                    }

                    Query.setState(query, 'failed')

                    throw error
            })
        }

        return query.promise!
    }

    public getQuery(queryKey: QueryKey): QueryType {
        if (!queryKey) {
            throw new Error('getQuery requires a query key.')
        }
        queryKey = Query.deriveKey(queryKey)
        return this._collection[queryKey]
    }

    public getQueries(): Array<Collection> {
        return Object.entries(this._collection)
    }

    cancelQueryRetry (queryKey: QueryKey): void {
        if (!queryKey) {
            throw new Error('cancelQueryRetry requires a queryKey.')
        }

        const key = Query.deriveKey(queryKey)
        const query = this._collection[key]
        if (query.isRetrying) {
            Query.setState(query, 'failed')
        }
        clearTimeout(this._retryStorage.getAndDelete(key))
    }

    private approveCall(query: QueryType): boolean {
        const { force: isForce, hardForce: isHardForce } = query.options

        if (isHardForce) return true

        const now = new Date()
        const { isIdle, isFetched, fetchedAt, isFailed, isRetrying } = query
        const isStale = now.getTime() - fetchedAt!.getTime() > query.options.staleTime!

        const conditions = [
            (isIdle || isRetrying),
            (isStale || isForce || isFailed || !isFetched),
            !Query.isDeactivate(query.options.deactivate!),
            this.authorizeOnWindowHidden(query)
        ]

        return conditions.every(Boolean)
    }

    private authorizeOnWindowHidden(query: QueryType): boolean {
        if (!isBrowser()) return true

        const { deactivateOnWindowHidden, hardForce, refetchOnWindowFocus } = query.options
        const isAuthorized = !(deactivateOnWindowHidden && document.visibilityState === 'hidden')

        if (!(isAuthorized || hardForce || !refetchOnWindowFocus)) {
            this._refetchStorage.add(query)
        }

        return isAuthorized
    }



    private registerListeners(): void {
        if (!isBrowser()) return

        window.document.addEventListener('visibilitychange', handleVisibilityChange)
        const that = this
        function handleVisibilityChange(): void {
            if (window.document.visibilityState === 'visible') {
                that._refetchStorage
                    .forEach(query => that.useQuery(query.queryKey, query.queryFn, query.options))

                that._refetchStorage.clear()
            }
        }
    }

    private static deriveKey(rawKey: QueryKey): string {
        try {
            return serializeKey(rawKey)
        }
        catch (error) {
            throw new Error('Query key must be serializable.')
        }

        function serializeKey(key: any): string {
                if (typeof key === 'string') {
                    return key
                }

                if (typeof key === 'number') {
                    return key.toString()
                }

                if (Array.isArray(key)) {
                    return key.map(serializeKey).join(',')
                }

                if (typeof key === 'object' && key !== null) {
                    return Object.keys(key)
                        .sort()
                        .map(k => `${k}:${serializeKey(key[k])}`)
                        .join(',')
                }

                return key
        }
    }

    private static retryAllowed(query: QueryType, error: Error): boolean {
        try {
            const { retry } = query.options
            if (typeof retry === 'boolean') {
                return retry
            }
            if (typeof retry === 'number') {
                return query.retries < retry
            }
            return (retry as RetryFn)(query.retries, error)
        }
        catch (error) {
            throw new Error('retry option must be a boolean or an integer or a function that returns a boolean.')
        }
    }

    private static calcRetryDelay(query: QueryType, error: Error): number {
        try {
            const { retryDelay } = query.options
            if (typeof retryDelay === 'number') {
                return retryDelay
            }

            return (retryDelay as RetryDelayFn)(query.retries, error)
        } catch (error) {
            throw new Error('retryDelay option must be a number or a function that returns a number.')
        }
    }

    private static setState (query: QueryType, state: QueryState): void {
        return {
            loading(query: QueryType) : void{
                query.isLoading = true
                query.isFetching = true
                query.isIdle = false
            },
            fetching(query: QueryType) : void{
                query.isFetching = true
                query.isIdle = false
            },
            retrying(query: QueryType) : void{
                query.isRetrying = true
                query.isIdle = false
            },
            fulfilled(query: QueryType) : void{
                query.isLoading = false
                query.isFetching = false
                query.isRetrying = false
                query.isIdle = true
                query.isFetched = true
                query.isFailed = false
                query.fetchedAt = new Date()
                query.retries = 0
            },
            failed(query: QueryType) : void{
                query.isLoading = false
                query.isFetching = false
                query.isRetrying = false
                query.isIdle = true
                query.isFailed = true
                query.failedAt = new Date()
            },
            retried(query: QueryType) : void{
                query.retries += 1
            }
        }[state](query)
    }

    private static isDeactivate(val: boolean | (() => boolean)): boolean {
        if (typeof val === 'boolean') {
            return val
        }

        try {
            return val()
        } catch (error) {
            throw new Error('deactivate option must be a boolean or a function that returns a boolean.')
        }
    }
}
