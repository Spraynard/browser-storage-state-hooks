# Browser Storage State Hooks

A collection of hooks for React that persist data through storage within a client browser's `localStorage` or `sessionStorage`

## Installation

You can install this package through `npm` with the following command:

```
npm install browser-storage-state-hooks
```

## Usage

Below are examples of the two most accessible hooks that are offered with this package.

```js
const [localStorageState, setLocalStorageState] = useLocalStorageState('local-storage-example', true);

const [sessionStorageState, setSessionStorageState] = useSessionStorageState('session-storage-example', true);
```
Both of these hooks require the first parameter to be a named key used for storage within the client's local or session storage. The second parameter is the initial state that you would use for a regular call to `useState`.

That should be all you need to get going!

### Built With

* Typescript
* React