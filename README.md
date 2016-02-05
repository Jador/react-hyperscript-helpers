# react-hyperscript-helpers
[![npm version](https://badge.fury.io/js/react-hyperscript-helpers.svg)](https://badge.fury.io/js/react-hyperscript-helpers) [![Circle CI](https://circleci.com/gh/Jador/react-hyperscript-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/Jador/react-hyperscript-helpers/tree/master) 

A library inspired by [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) and [react-hyperscript](https://github.com/mlmorg/react-hyperscript).

Allows for expressing UIs in the hyperscript-helpers style but with first class support for React.

The api has been greatly improved, making the library usable for actual projects.

### Usage

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
