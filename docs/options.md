# Options

Options let you customize the behavior of a query. 

[[toc]]

## Levels of Options

We have three levels of options:
- **Default Options**: these options are the defaults set by the library.
- **instance Options**: These options are passed to the constructor of e-query class. They are used as the default options for all queries of that instance.
- **Call Options**: These options are passed to the `useQuery` function to override instance / default options. They are the options for a specific query.

The priority of options is from bottom to top. Call options have the highest priority and default options have the lowest priority.

In each level, you can override all or some of the options.

## List of Options

### staleTime <Badge type="tip" text="Number" />
The time in milliseconds before a query is considered stale.
When a query is not stale yet, invoking `useQuery()` will not make a new API call, instead, it will return the promise returned by the previous call.

This is useful when you want to prevent unnecessary API calls in a short period of time.


### force <Badge type="tip" text="Boolean" />
If **true**, the query will be called regardless of whether it is stale or not.
When a call is in progress, this won't make a new call. Instead, it will return the promise of the current call.

_Usage example_: for a refresh button.


### hardForce <Badge type="tip" text="Boolean" />
If **true**, ignores everything (e.g. deactivation, while an equivalent API call is in progress, etc.) and makes the call.

### retry <Badge type="tip" text="Boolean | Number | Function" />
If **true**, the query will be retried on failure infinitely.

If a **number** is provided, it will be the number of retries.

If a **function** is provided, it will be called on failure and should return a boolean based on provided arguments (retries and error).

If **false**, the query retry will be disabled.

example:

```js
retry: (retries, error) => {
    if (error.status === 400)
        return false
    else
        return retries < 3
}
```

### retryDelay <Badge type="tip" text="Number | Function" />
The time in milliseconds to wait before retrying a failed query.

If a **function** is provided, it will be called on failure and should return a number based on provided arguments (retries and error)

example:

```js
retryDelay: 7000 // 7 seconds delay on each retry

retryDelay: (retries, error) => {
    return (5 + retries * 3) * 1000
    // 5 seconds delay on the first retry, 8 seconds for the second retry, etc.
}
```

### distinctRetry <Badge type="tip" text="Boolean" />
If **true**, each retry will be treated separately and independently like a new useQuery.

If **false**, retries are grouped together and treated like a single useQuery. Therefore, the returned promise will settle only once all retries are settled.

_Usage example_: Imagine you have a page depended on an API call to be loaded and visible to user. You might want to show a loading indicator until the query is fulfilled. In this case you may don't want the user be aware of any failure in the API call. So you can set `distinctRetry` to `false` and show the loading indicator until the query is fulfilled or failed after all retries.


### deactivate <Badge type="tip" text="Boolean | Function" />
Temporarily disable the query.

If **true**, the query will be disabled.

If a **function** is provided, it will be called on each invoke and should return a boolean.

```js
deactivate: () => {
    return !user.isLoggedIn
}
```


### deactivateOnWindowHidden <Badge type="tip" text="Boolean" />
If **true**, the query will not be called when the current window is hidden.

Hidden means the user is not seeing the current window. For example, the user has switched to another tab or minimized the window or locked the screen, etc.

This is usually useful for interval calls. For example, you may want to call an API every minute. But if the user is not seeing the window, there is no need to call the API. So you can set `deactivateOnWindowHidden` to `true` and the query will be deactivated when the window is hidden.



### refetchOnWindowFocus <Badge type="tip" text="Boolean" />
While the user's window was hidden, the query might be invoked, but it was deactivated due to `deactivateOnWindowHidden` set to True. When the user comes back to the window, you may want to refetch the query. So you can set `refetchOnWindowFocus` to `true` and the query will be refetched once the current window is focused (be visible) again and the query is stale.


## Default Options by the library

If you do not provide an option at instance or call level the following defaults are considered:


| option                   |                       default                        |
|--------------------------|:----------------------------------------------------:|
| staleTime                |                          0                           |
| force                    |                        false                         |
| hardForce                |                        false                         |
| retry                    |             ```retries => retries < 3```             |
| retryDelay               | ```retries => Math.min(500 * 2 ** retries, 60000)``` |
| distinctRetry            |                        false                         |
| deactivate               |                        false                         |
| deactivateOnWindowHidden |                        false                         |
| refetchOnWindowFocus     |                        false                         |
