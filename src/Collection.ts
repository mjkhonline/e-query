import { QueryType, QueryFn, QueryOptions } from './index.d'

type WeakQueryType = { queryFn: QueryFn, options: QueryOptions }
export default class Collection {
    [key: string] : QueryType | any

    private static _queryInit: QueryType = {
        queryKey: null,
        queryFn: null,
        promise: null,
        options: {},
        isLoading: false,
        isFetching: false,
        isRetrying: false,
        isIdle: true,
        isFetched: false,
        isFailed: false,
        fetchedAt: null,
        failedAt: null,
        retries: 0
    }

    constructor() {
        return new Proxy(this, {

            get(target, key: string, receiver: any) {
                if (!(key in target)) {
                    target[key] = {
                        ...Collection._queryInit,
                        queryKey: key
                    }

                    return target[key]
                }

                return Reflect.get(target, key, receiver)
            },

            set(target, key: string, value: QueryType | WeakQueryType, receiver: any): boolean {
                const query = target[key]
                if (query) {
                    query.queryFn = value.queryFn
                    query.options = value.options
                } else {
                    target[key] = {
                        ...Collection._queryInit,
                        queryKey: key,
                        queryFn: value.queryFn,
                        options: value.options
                    }
                }
                return true
            }
        })
    }
}
