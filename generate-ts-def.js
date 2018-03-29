import fs from 'fs';
import { TAG_NAMES } from './lib/tag-names.js';

const typings =
`import { 
  Props, 
  ReactChild, 
  ReactElement, 
  ComponentType, 
  ReactHTML, 
  ReactSVG, 
  DOMElement, 
  AllHTMLAttributes, 
  SVGAttributes, 
  ClassAttributes 
} from 'react';

declare type Children = ReactChild | ReactChild[];
  
type Tag = keyof ReactHTML | keyof ReactSVG | string;

/* All HTML and SVG attributes */
type ReactDOMAttributes = AllHTMLAttributes<EventTarget> | SVGAttributes<EventTarget>;

/* Instantiated React element which is not a component but a HTML or SVG element */
type ReactDOMElement = DOMElement<ReactDOMAttributes, Element>;

/* All HTML and SVG attributes, plus "ref" and "key" */
type ReactDOMProps = ReactDOMAttributes & ClassAttributes<Element>;

export function hh(tag: Tag): (selector?: any, properties?: any, children?: Children) => ReactDOMElement;
export function hh(component: ComponentType<any>): (selector?: any, properties?: any, children?: Children) => ReactElement<any>;

export function h(tag: Tag, children?: Children): ReactDOMElement;
export function h(tag: Tag, selector: string, children?: Children): ReactDOMElement;
export function h(tag: Tag, selector: string, properties: ReactDOMProps, children?: Children): ReactDOMElement;
export function h(tag: Tag, properties: ReactDOMProps, children?: Children): ReactDOMElement;

export function h<P>(component: ComponentType<P>, selector: string, properties: P & Props<any>, children?: Children): ReactElement<P>;
export function h<P>(component: ComponentType<P>, properties: P & Props<any>, children?: Children): ReactElement<P>;
export function h(component: ComponentType<any>, children?: Children): ReactElement<any>;
export function h(component: ComponentType<any>, selector: string, children?: Children): ReactElement<any>;
${
  TAG_NAMES.reduce((accum, tag) => `${accum}
export function ${tag}(children?: Children): ReactDOMElement;
export function ${tag}(selector: string, children?: Children): ReactDOMElement;
export function ${tag}(selector: string, properties: ReactDOMProps, children?: Children): ReactDOMElement;
export function ${tag}(properties: ReactDOMProps, children?: Children): ReactDOMElement;`
  , ``)
}`;

fs.writeFile('./lib/index.d.ts', typings, (err) => {
  if (err) {
    throw err;
  }
});
