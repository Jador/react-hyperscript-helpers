import fs from 'fs';
import { TAG_NAMES } from './lib/tag-names.js';

const typings =
`import { Component, HTMLAttributes, Props, ReactNode, ReactElement, ComponentClass, StatelessComponent } from 'react';

declare type ReactComponent<P> = string | ComponentClass<P> | StatelessComponent<P>;

export function hh(component: ReactComponent<any>): (selector?: any, properties?: any, ...children: ReactNode[]) => ReactElement<any>;

export function h(component: ReactComponent<any>, ...children: ReactNode[]): ReactElement<any>;
export function h(component: ReactComponent<any>, selector: string, ...children: ReactNode[]): ReactElement<any>;
export function h<P>(component: ReactComponent<P>, selector: string, properties: P & Props<any>, ...children: ReactNode[]): ReactElement<any>;
export function h<P>(component: ReactComponent<P>, properties: P & Props<any>, ...children: ReactNode[]): ReactElement<any>;
${
  TAG_NAMES.reduce((accum, tag) => `${accum}
export function ${tag}(...children: ReactNode[]): ReactElement<any>;
export function ${tag}(selector: string, ...children: ReactNode[]): ReactElement<any>;
export function ${tag}(selector: string, properties: HTMLAttributes, ...children: ReactNode[]): ReactElement<any>;
export function ${tag}(properties: HTMLAttributes, ...children: ReactNode[]): ReactElement<any>;`
  , ``)
}`;

fs.writeFile('./lib/index.d.ts', typings, (err) => {
  if (err) {
    throw err;
  }
});
