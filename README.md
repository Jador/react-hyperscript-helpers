# react-hyperscript-helpers
[![npm version](https://badge.fury.io/js/react-hyperscript-helpers.svg)](https://badge.fury.io/js/react-hyperscript-helpers) [![Circle CI](https://circleci.com/gh/Jador/react-hyperscript-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/Jador/react-hyperscript-helpers/tree/master) 

A semi-practical library inspired by [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) and [react-hyperscript](https://github.com/mlmorg/react-hyperscript).

Allows for expressing UIs in the hyperscript-helpers style but with first class support for React.

### Usage
```javascript
var MyComponent          = require('./MyComponent');
var { div, MyComponent } = require('react-hyperscript-helpers')(MyComponent);

export default () => div('.foo', MyComponent({ bar: 'baz' }));
```

The bootstrapping function can accept components as an array, object, or parameter list.

The displayName or function name of the component is what is exported by the bootstrapper.

For components created with `React.createClass` a displayName **must be provided**.

The function for creating the helpers is also exported. Therefore the above example could be rewritten
```javascript
import MyComponent from './MyComponent';
import hh, { h }   from  'react-hyperscript-helpers';

const { div } = hh();

export default () => div('.foo', h(MyComponent)({ bar: 'baz' }));
```
