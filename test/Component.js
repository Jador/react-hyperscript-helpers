import React from 'react';

export class ClassComponent extends React.Component {
  render() {
    React.createElement('div', 'I am a component');
  }
}

export const CreateClass = React.createClass({
  displayName: 'CreateClass',
  render: () => React.createElement('div', 'I am a component')
});

export const FuncComponent = () => React.createElement('div', 'I am a component');
