import { createElement } from 'react';

export const TAG_NAMES = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
  'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
  'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
  'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
  'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
  'li', 'link', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object',
  'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's',
  'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong',
  'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th',
  'thead', 'title', 'tr', 'u', 'ul', 'video'
];

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
