import { createElement } from 'react';
import { TAG_NAMES } from './tag-names.js';
export { TAG_NAMES };

const isString   = x => typeof x === 'string' && x.length > 0;
const startsWith = (string, start) => string.indexOf(start) === 0;
const isSelector = x => isString(x) && (startsWith(x, '.') || startsWith(x, '#'));
const split      = (string, separator)  => string.split(separator);
const subString  = (string, start, end) => string.substring(start, end);
const isChildren = x => typeof x === 'string' || Array.isArray(x);

const flattenChildren = x => !Array.isArray(x) || x.length > 1 ? x : x[0];

const parseSelector = selector => {
  const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
  const parts        = split(selector, classIdSplit);

  return parts.reduce((acc, part) => {

    if(startsWith(part, '#')) {
      acc.id = subString(part, 1);
    } else if(startsWith(part, '.')) {
      acc.className = `${acc.className} ${subString(part, 1)}`.trim();
    }

    return acc;
  }, { className: '' });

};

export const hh = nameOrType => (first, ...rest) => {

  if(isSelector(first)) {
    const selector = parseSelector(first);
    const [ second = {}, ...remains ] = rest;

    //selector, children
    if(isChildren(second)) {
      return createElement(nameOrType, selector, flattenChildren(second));
    }

    //selector, props, children
    let { className = '' } = second;
    className = `${selector.className} ${className} `.trim();

    if(remains && remains.length > 0) {
      return createElement(nameOrType, { ...second, ...selector, className }, flattenChildren(remains[0]));
    } else {
      return createElement(nameOrType, { ...second, ...selector, className });
    }
  }

  //children
  if(isChildren(first)) {
    return createElement(nameOrType, {}, flattenChildren(first));
  }

  //props, children
  if(rest && rest.length > 0) {
    return createElement(nameOrType, first, flattenChildren(rest[0]));
  } else {
    return createElement(nameOrType, first);
  }
};

const h = (nameOrType, ...rest) => hh(nameOrType)(...rest);

module.exports = TAG_NAMES.reduce((exported, type) => {
  exported[type] = hh(type);
  return exported;
}, { h, hh });
