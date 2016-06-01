import fs from 'fs';
import { TAG_NAMES } from './lib/tag-names.js';

const typings =
`import { Component, HTMLAttributes, Props, ReactChild, ReactElement } from 'react';

declare interface ClassComponent<P> {
  new(...args): Component<P, any>;
}
declare interface StatelessComponent<P> {
  (props: P): ReactElement<P>;
}
declare type Children = ReactChild | ReactChild[];
declare type ReactComponent<P> = ClassComponent<P> | StatelessComponent<P>;

export function hh<P>(tag: string): (selector?: any, properties?: any, children?: Children) => ReactElement<P>;
export function hh<P>(component: ReactComponent<any>): (selector?: any, properties?: any, children?: Children) => ReactElement<P>;

export function h<P>(tag: string, children?: Children): ReactElement<P>;
export function h<P>(tag: string, selector: string, children?: Children): ReactElement<P>;
export function h<P>(tag: string, selector: string, properties: HTMLAttributes, children?: Children): ReactElement<P>;
export function h<P>(tag: string, properties: HTMLAttributes, children?: Children): ReactElement<P>;
export function h<P>(component: ReactComponent<any>, children?: Children): ReactElement<P>;
export function h<P>(component: ReactComponent<any>, selector: string, children?: Children): ReactElement<P>;
export function h<P>(component: ReactComponent<P>, selector: string, properties: P & Props<any>, children?: Children): ReactElement<P>;
export function h<P>(component: ReactComponent<P>, properties: P & Props<any>, children?: Children): ReactElement<P>;
${
  TAG_NAMES.reduce((accum, tag) => `${accum}
export function ${tag}<P>(children?: Children): ReactElement<P>;
export function ${tag}<P>(selector: string, children?: Children): ReactElement<P>;
export function ${tag}<P>(selector: string, properties: HTMLAttributes, children?: Children): ReactElement<P>;
export function ${tag}<P>(properties: HTMLAttributes, children?: Children): ReactElement<P>;`
  , ``)
}`;

fs.writeFile('./lib/index.d.ts', typings, (err) => {
  if (err) {
    throw err;
  }
});
