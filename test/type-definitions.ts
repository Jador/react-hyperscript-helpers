/// <reference path="./react-mock.d.ts"/>
import { Component } from 'react';
import { div, h, hh } from 'react-hyperscript-helpers';

class ClassComponent extends Component<{ foo: string }, any> {}
const StatelessFunctionComponent = ({ foo }: { foo: string }) => div(`foo: ${foo}`);

const hClassComponent = hh(ClassComponent);
const hStatelessFunctionComponent = hh(StatelessFunctionComponent);
const hDiv = hh('div');

export default () => div('.foo', [
  hClassComponent(),
  hClassComponent('.selector'),
  hClassComponent('.selector', [h('span')]),
  hClassComponent('.selector', {foo: 1, key: 1}, [h('span')]),
  hClassComponent('.selector', {foo: 1, key: 1}),
  hClassComponent({foo: 1, key: 1}),
  hClassComponent([h('span')]),
  hStatelessFunctionComponent(),
  hStatelessFunctionComponent('.selector'),
  hStatelessFunctionComponent('.selector', [h('span')]),
  hStatelessFunctionComponent('.selector', h('span')),
  hStatelessFunctionComponent('.selector', {foo: 'bar', key: 1}, [h('span')]),
  hStatelessFunctionComponent('.selector', {foo: 'bar', key: 1}),
  hStatelessFunctionComponent({foo: 'bar', key: 1}),
  hStatelessFunctionComponent([h('span')]),
  hDiv(),
  hDiv('.selector'),
  hDiv('.selector', [h('span')]),
  hDiv('.selector', h('span')),
  hDiv('.selector', {ariaHidden: false, key: 1}, [h('span')]),
  hDiv('.selector', {ariaHidden: false, key: 1}),
  hDiv({ariaHidden: false, key: 1}),
  hDiv([h('span')]),
  h(ClassComponent),
  h(ClassComponent, '.selector'),
  h(ClassComponent, '.selector', [h('span')]),
  h(ClassComponent, '.selector', {foo: 1, key: 1}, [h('span')]),
  h(ClassComponent, '.selector', {foo: 1, key: 1}),
  h(ClassComponent, {foo: 1, key: 1}),
  h(ClassComponent, [h('span')]),
  h(StatelessFunctionComponent),
  h(StatelessFunctionComponent, '.selector'),
  h(StatelessFunctionComponent, '.selector', [h('span')]),
  h(StatelessFunctionComponent, '.selector', {foo: 'bar', key: 1}, [h('span')]),
  h(StatelessFunctionComponent, '.selector', {foo: 'bar', key: 1}),
  h(StatelessFunctionComponent, {foo: 'bar', key: 1}),
  h(StatelessFunctionComponent, [h('span')]),
  h('div'),
  h('div', '.selector'),
  h('div', '.selector', [h('span')]),
  h('div', '.selector', {ariaHidden: false, key: 1}, [h('span')]),
  h('div', '.selector', {ariaHidden: false, key: 1}),
  h('div', {ariaHidden: false, key: 1}),
  h('div', [h('span')]),
  div(),
  div('.selector'),
  div('.selector', [h('span')]),
  div('.selector', {ariaHidden: false, key: 1}, [h('span')]),
  div('.selector', {ariaHidden: false, key: 1}),
  div({ariaHidden: false, key: 1}),
  div([h('span')]),
]);
