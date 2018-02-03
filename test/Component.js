import React from 'react';

import { hh } from '../src';

/* eslint-disable
  react/prefer-stateless-function,
  react/prefer-es6-class,
  react/no-multi-comp
 */
export const ClassComponent = class extends React.Component {
  render() {
    React.createElement('div', 'I am a component');
  }
};

export const CreateClass = React.createClass({
  displayName: 'CreateClass',
  render: () => React.createElement('div', 'I am a component')
});

export const FuncComponent = () => React.createElement('div', 'I am a component');

export const classComponentH = hh(ClassComponent);
export const createClassH = hh(CreateClass);
export const funcComponentH = hh(FuncComponent);
