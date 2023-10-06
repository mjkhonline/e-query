# Get Started

What E-Query is, and how to install and use it.

## 💡 What is E-Query?

E-Query is a library for managing API calls in your client application. It's written in TypeScript, and it's fully typed. It's also framework-agnostic, so you can use it with Vue, React, Angular, Svelte, Next, Nuxt, or even vanilla JavaScript.

### ✅ What it can do?

In summery it helps developers to prevent unnecessary API calls. For example if you have multiple components that are using the same API call, it prevents calling the API multiple times. It easily helps you to disable the button while the API call is in progress. If an API is not required to be called when user's tab is inactive, e-query easily manage that for you.

 It also has some other features like retrying calls on error, accessing information such as when the last successful call, is call in progress, and more.

### 🤔 What E-Query is not?

It's not a state management library, it's not a data fetching library, and it's not a caching library. And it has no opinion about how you manage them. It's just a library for managing API calls.

## Installation
Use `npm` or `yarn` to add e-query to your project.

```
npm i @mjkhonline/e-query
```

```
yarn add @mjkhonline/e-query
```

## Usage
Import eQuery and create an instance of it. Pass in your default options to the constructor.
You can find the list of all available options [here](/options).

```js
import eQuery from '@mjkhonline/e-query'

const eq = new eQuery({
  // default options
  staleTime: 30 * 1000 // 30 seconds  
})
```

Then wrap your API calls with `useQuery`. This invokes your API call's function and returns the promise returned by it.

```js
eq.useQuery('your-query-key',
    () => fetch('https://example.com/somedata'),
    { // options
      staleTime: 60 * 1000, // 1 minute
      deactivateOnWindowHidden: true  
    }
)
```

use `getQuery` to inquire about the status of your API call.
You can find the list of all available exposed data [here](/get-query#exposed-data).

```js
const { isLoading, isFailed, fetchedAt } = eq.getQuery('your-query-key')
```

Congratulations! 🎉 You learned it. Now you can use e-query in your application.

Or continue reading the doc to familiarize yourself with other cool features of e-query.
