<h1 align="center" >
<img src="docs/public/logo.png" width="100" height="100" alt="e-query logo" />
<br />
E-Query
</h1>

<p align="center">an easy and effortless API calls manager to reduce and optimize your API calls, on the client</p>

***

Visit [E-Query Docs](https://e-query.js.org/) for detailed instructions.

## 💡 What is E-Query?

E-Query is a library for managing API calls in your client application. It's written in TypeScript, and it's fully typed. It's also framework-agnostic, so you can use it with Vue, React, Angular, Svelte, Next, Nuxt, or even vanilla JavaScript.

### ✅ What it can do?

✔️ manage API calls

✔️ prevent unnecessary fetch

✔️ optimise & improve performance

✔️ retry calls on error

✔️ deactivate call on window hidden

✔️ refetch on window refocus

✔️ make different instances

✔️ customizable

✔️ get API call status

### 🤔 What E-Query is not?

It's not a state management library, it's not a data fetching library, and it's not a caching library. And it has no opinion about how you manage them.

## Installation
Use npm or yarn to add e-query to your project.

```npm
npm i @mjkhonline/e-query
```

```yarn
yarn add @mjkhonline/e-query
```

## Usage
Import eQuery and create an instance of it. Pass in your default options to the constructor.
You can find the list of all available options [here](https://e-query.js.org/options.html).

```js
import eQuery from 'e-query'

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
You can find the list of all available exposed data [here](https://e-query.js.org/get-query.html#exposed-data).

```js
const { isLoading, isFailed, fetchedAt } = eq.getQuery('your-query-key')
```

## Documentation

[e-query.js.org](https://e-query.js.org/)

## License

[MIT](http://opensource.org/licenses/MIT)
