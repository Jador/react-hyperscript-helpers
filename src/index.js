import React from 'react';
import { TAG_NAMES } from './tag-names.js';

const isArray = x => Array.isArray(x);
const isString = x => typeof x === 'string' && x.length > 0;
const startsWith = (string, start) => string.indexOf(start) === 0;
const isSelector = x => isString(x) && (startsWith(x, '.') || startsWith(x, '#'));
const isChildren = x =>
  /string|number|boolean|function/.test(typeof x) || isArray(x) || x instanceof React.Component;
const split = (string, separator) => string.split(separator);
const subString = (string, start, end) => string.substring(start, end);

const parseSelector = selector => {
  const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
  const parts = split(selector, classIdSplit);

  return parts.reduce(
    (acc, part) => {
      if (startsWith(part, '#')) {
        acc.id = subString(part, 1);
      } else if (startsWith(part, '.')) {
        acc.className = `${acc.className} ${subString(part, 1)}`.trim();
      }

      return acc;
    },
    { className: '' }
  );
};

const createElement = (nameOrType, properties = {}, children = []) => {
  if (properties.isRendered !== undefined && !properties.isRendered) {
    return null;
  }

  const { ...props } = properties;
  const args = [ nameOrType, props ];

  if (!isArray(children)) {
    args.push(children);
  } else {
    args.push(...children);
  }

  return React.createElement.apply(React, args);
};

export const hh = nameOrType => (first, second, third, ...rest) => {
  rest = rest || [];
  if (isSelector(first)) {
    const selector = parseSelector(first);

    // selector, ...children
    if (isChildren(second)) {
      if (isChildren(third)) {
        rest.splice(0, 0, third);
      }
      rest.splice(0, 0, second);
      return createElement(nameOrType, selector, rest);
    }

    // selector, props, ...children
    let { className = '' } = second || {};
    className = `${selector.className} ${className} `.trim();
    const props = { ...second, ...selector, className };

    if (isChildren(third)) {
      rest.splice(0, 0, third);
      return createElement(nameOrType, props, rest);
    }

    return createElement(nameOrType, props);
  }

  // children
  if (isChildren(first)) {
    if (isChildren(second)) {
      if (isChildren(third)) {
        rest.splice(0, 0, third);
      }
      rest.splice(0, 0, second);
    }
    rest.splice(0, 0, first);
    return createElement(nameOrType, {}, rest);
  }

  // props, children
  if (isChildren(second)) {
    if (isChildren(third)) {
      rest.splice(0, 0, third);
    }
    rest.splice(0, 0, second);
    return createElement(nameOrType, first, rest);
  }

  return createElement(nameOrType, first);
};

export const h = (nameOrType, ...rest) => hh(nameOrType)(...rest);

module.exports = TAG_NAMES.reduce(
  (exported, type) => {
    exported[type] = hh(type);
    return exported;
  },
  { h, hh }
);
