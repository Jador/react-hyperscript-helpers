import React from 'react';

import { hh } from '../src';

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

export const ClassComponentH = hh(ClassComponent);
export const CreateClassH    = hh(CreateClass);
export const FuncComponentH  = hh(FuncComponent);
