# react-hyperscript-helpers
[![npm version](https://badge.fury.io/js/react-hyperscript-helpers.svg)](https://badge.fury.io/js/react-hyperscript-helpers) [![Circle CI](https://circleci.com/gh/Jador/react-hyperscript-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/Jador/react-hyperscript-helpers/tree/master)

A library inspired by [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) and [react-hyperscript](https://github.com/mlmorg/react-hyperscript).

Allows for expressing UIs in the hyperscript-helpers style but with first class support for React.

The api has been greatly improved, making the library usable for actual projects.

## Why?

### Pros
* Consistent javascript syntax
* Mistyped components return errors
* No need to litter code with `null` values when a component doesn't have any props
* No need for a JSX syntax highlighter
* No need for a JSX linter
* JSX elements are just functions anyway

### Cons
* Most react documentation is written with JSX so it might be unfamiliar syntax
* A lot of library components use JSX, so unless the compiled version of the library is used
a JSX transform will be necessary

## API

For elements that have already been compiled by `hh`:

```js
tagName(selector)
tagName(props)
tagName(children)
tagName(props, children)
tagName(selector, children)
tagName(selector, props, children)
```

For custom components or tags not compiled by `hh`:

```js
import { h } from 'react-hyperscript-helpers';

h(component, selector)
h(component, props)
h(component, children)
h(component, props, children)
h(component, selector, children)
h(component, selector, props, children)
```

* `component` is an HTML element as a string or a react function/class custom element
* `selector` is a string, starting with "." or "#"
* `props` is an object of attributes (the props of the component)
* `children` is the innerHTML text (string|boolean|number), or an array of elements

## Usage

DOM components are really easy to use. Just import and go.

```javascript
import { div, h2 } from 'react-hyperscript-helpers';

export default () => div('.foo', [ h2('Hello, world') ]);
```

For custom components you can either create a factory function or use the `h` function, similar to react-hyperscript.

```javascript
//MyComponent
import { div, hh } from 'react-hyperscript-helpers';

export default hh(() => div('Nifty Component'));

//Container
import MyComponent        from './MyComponent';
import SomeOtherComponent from 'who-whats-its';
import { div, h }         from  'react-hyperscript-helpers';

export default () => div('.foo', [
  MyComponent(),
  h(SomeOtherComponent, { foo: 'bar' })
]);
```

## Alternatives

* https://github.com/ohanhi/hyperscript-helpers
* https://github.com/mlmorg/react-hyperscript

## References

* https://facebook.github.io/react/docs/displaying-data.html#react-without-jsx
* https://github.com/ustun/react-without-jsx
* http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/
