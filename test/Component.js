import React from 'react';

import { h } from '../src';

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

export const ClassComponentH = h(ClassComponent);
export const CreateClassH    = h(CreateClass);
export const FuncComponentH  = h(FuncComponent);
