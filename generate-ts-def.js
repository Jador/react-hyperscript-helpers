import fs from 'fs';
import { TAG_NAMES } from './lib/tag-names.js';

const typings =
`import { Component, HTMLAttributes, Props, ReactChild, ReactElement } from 'react';

declare interface ClassComponent<P> {
  new(...args): Component<P, any>;
}
declare interface StatelessComponent<P> {
  (props: P): ReactElement;
}
declare type Children = ReactChild | ReactChild[];
declare type ReactComponent<P> = ClassComponent<P> | StatelessComponent<P>;

export function hh(tag: string): (selector?: any, properties?: any, children?: Children) => ReactElement;
export function hh(component: ReactComponent<any>): (selector?: any, properties?: any, children?: Children) => ReactElement;

export function h(tag: string, children?: Children): ReactElement;
export function h(tag: string, selector: string, children?: Children): ReactElement;
export function h(tag: string, selector: string, properties: HTMLAttributes, children?: Children): ReactElement;
export function h(tag: string, properties: HTMLAttributes, children?: Children): ReactElement;
export function h(component: ReactComponent<any>, children?: Children): ReactElement;
export function h(component: ReactComponent<any>, selector: string, children?: Children): ReactElement;
export function h<P>(component: ReactComponent<P>, selector: string, properties: P & Props<any>, children?: Children): ReactElement;
export function h<P>(component: ReactComponent<P>, properties: P & Props<any>, children?: Children): ReactElement;
${
  TAG_NAMES.reduce((accum, tag) => `${accum}
export function ${tag}(children?: Children): ReactElement;
export function ${tag}(selector: string, children?: Children): ReactElement;
export function ${tag}(selector: string, properties: HTMLAttributes, children?: Children): ReactElement;
export function ${tag}(properties: HTMLAttributes, children?: Children): ReactElement;`
  , ``)
}`;

fs.writeFile('./lib/index.d.ts', typings, (err) => {
  if (err) {
    throw err;
  }
});
