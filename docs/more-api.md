# Other APIs

The rest of e-query APIs.


## getQueries()

Returns a list of all queries of current instance.

```js
const queries = eq.getQueries()
```

## cancelQueryRetry(queryKey)

Manually cancel the retry process of a query and set the query status to failed.

```js
eq.useQuery('getData', () => fetch('https://example.com/data'), {
    retry: true, // infinite retry on failure
    retryDelay: 1000
})
     
// at some point of the code
if (someCondition) {
    eq.cancelQueryRetry('getData')
}
```

## More APIs

More APIs are coming.
