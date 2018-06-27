import React from 'react';

const isArray = x => Array.isArray(x);
const isString = x => typeof x === 'string' && x.length > 0;
const isSelector = x => isString(x) && (startsWith(x, '.') || startsWith(x, '#'));
const isChildren = x => /string|number|boolean/.test(typeof x) || isArray(x);
const startsWith = (string, start) => string.indexOf(start) === 0;
const split = (string, separator) => string.split(separator);
const subString = (string, start, end) => string.substring(start, end);

const parseSelector = selector => {
  const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
  const parts = split(selector, classIdSplit);

  return parts.reduce((acc, part) => {

    if (startsWith(part, '#')) {
      acc.id = subString(part, 1);
    } else if (startsWith(part, '.')) {
      acc.className = `${acc.className} ${subString(part, 1)}`.trim();
    }

    return acc;
  }, { className: '' });

};

const createElement = (nameOrType, properties = {}, children = []) => {
  if (properties.isRendered !== undefined && !properties.isRendered) {
    return null;
  }

  const { isRendered, ...props } = properties;
  const args = [nameOrType, props];

  if (!isArray(children)) {
    args.push(children);
  } else {
    args.push(...children);
  }

  return React.createElement.apply(React, args);
};

export const hh = nameOrType => (first, second, third) => {

  if (isSelector(first)) {
    const selector = parseSelector(first);

    // selector, children
    if (isChildren(second)) {
      return createElement(nameOrType, selector, second);
    }

    // selector, props, children
    let { className = '' } = second || {};
    className = `${selector.className} ${className} `.trim();
    const props = { ...second, ...selector, className };

    if (isChildren(third)) {
      return createElement(nameOrType, props, third);
    }

    return createElement(nameOrType, props);
  }

  // children
  if (isChildren(first)) {
    return createElement(nameOrType, {}, first);
  }

  // props, children
  if (isChildren(second)) {
    return createElement(nameOrType, first, second);
  }

  return createElement(nameOrType, first);
};

const h = (nameOrType, ...rest) => hh(nameOrType)(...rest);

const TAG_NAMES = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
  'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col',
  'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
  'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins',
  'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem',
  'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param',
  'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
  'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'video',
  'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'
];

module.exports = TAG_NAMES.reduce((exported, type) => {
  exported[type] = hh(type);
  return exported;
}, { h, hh });
