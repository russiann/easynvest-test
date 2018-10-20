# Easynvest Front-End Test

## Installing / Getting started

```shell
yarn install
yarn start
```

## Developing

### Built With

Vanilla to entire project with exception of build. <br/>
LESS to Stylesheet using BEM Architecture. <br/>
Parcel.js to build.

## Tests

I used Cypress to unit and e2e tests

Just run this to run test:

```shell
yarn test
```

## How this works

### Core Microframework

I created a 'microframework' to simplify the project implementation that do a few things:

#### Render the view using simple ES6 `template string` 

With template string we can, for exempla, run .map to render a list from an Array.

```js
createComponent(() => ({
  el: '.app',
  render: () => `
    <div>Hello World</div>
    <ul>
      ${[0,1,2,3,4,5,6].map(number, => `
        <li>Number ${number}</li>
      `.join(''))}
    </ul>
  `
}));
```

#### Simple DOM Events Bind/Handlers
The component definition accepts a property `events` that receive all events handlers.

To bind a click just create a handler in events object and set an attribute `bindclick` on element passing the name of handler:

```js
createComponent(() => ({
  el: '.list',
  events: {
    greet: () => {
      const input = document.querySelector('input');;
      alert(`Hello ${input.value}!`);
      input.value = "";
    },
  },
  render: (state) => `
    <h1>Greeter</h1>
    <input type="text" placeholder="your name" />
    <button bindclick="greet">greet</button>
  `
}));
```

#### Simple State Control similar to React

The component brings a helper called `setState` that accepts a function that will receive the previous state as argument and returns the new component state and re-render the view.

```js

const actions = {
  increment: state => ({ value: state.value + 1 }),
  decrement: state => ({ value: state.value - 1 })
};

createComponent(setState => ({
  el: '.list',
  state: {
    value: 0
  },
  events: {
    increment: () => setState(actions.increment),
    decrement: () => setState(actions.decrement)
  },
  render: (state) => `
    <h1>Counter</h1>
    <p>Value: ${state.value}</p>
    <button bindclick="increment" >increment</button>
    <button bindclick="decrement" >decrement</button>
  `
}));
```
### Storage

I create a simple helper to set and get data from `localStorage`.

```js
import storage from './helpers/storage';

const person = { name: 'John Doe', age: '34' };

storage.set('person', person);
storage.get('person'); // return the object above already parsed
```
