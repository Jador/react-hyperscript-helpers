import { createElement } from 'react';
import { expect } from 'chai';

import { div, h } from '../src/';

import * as c from './Component.js';

const compareComponents = (a, b) => expect(a).to.deep.equal(b);

describe('DOM Component', () => {
  it('should be correct dom node', () =>
    expect(createElement('div').nodeName).to.equal(div().nodeName));

  it('should have the correct props', () => {
    const props = { a: 'b', c: 'd' };
    compareComponents(createElement('div', props), div(props));
  });

  it('should work with a single child', () =>
    compareComponents(createElement('div', null, 'hello'), div('hello')));

  it('should work with multiple children', () =>
    compareComponents(createElement('div', null, [ 'hello', 'world' ]), div([ 'hello', 'world' ])));

  it('should work with no children', () => {
    compareComponents(createElement('div'), div());
    compareComponents(createElement('div', { className: 'foo' }), div('.foo'));
    compareComponents(createElement('div', { foo: 'bar' }), div({ foo: 'bar' }));
  });

  it('should have correct props and children', () => {
    const props = { a: 'b', c: 'd' };
    compareComponents(createElement('div', props, 'hello'), div(props, 'hello'));
  });

  describe('with selector', () => {
    it('should add the className prop', () => {
      const el = div('.foo');
      expect(el.props.className).to.equal('foo');
    });

    it('should append to the className prop', () => {
      const el = div('.foo', { className: 'bar' });
      expect(el.props.className).to.equal('foo bar');
    });

    it('should use the id in props if not in selector', () => {
      const el = div('.foo', { id: 'bar' });
      expect(el.props.id).to.equal('bar');
    });

    it('should add the id prop', () => {
      const el = div('#foo');
      expect(el.props.id).to.equal('foo');
    });

    it('should override the id provide in props', () => {
      const el = div('#foo', { id: 'bar' });
      expect(el.props.id).to.equal('foo');
    });

    it('should have the correct children when props are not provided', () => {
      const el1 = div('.foo', 'hello');
      const el2 = div('.foo', [ 'hello', 'world' ]);

      expect(el1.props.children).to.equal('hello');
      expect(el2.props.children).to.deep.equal([ 'hello', 'world' ]);
    });

    it('should automatically pull the child out of a single element array', () => {
      const el1 = div([ 'hello' ]);
      const el2 = div('.foo', [ 'hello' ]);
      const el3 = div({}, [ 'hello' ]);
      const el4 = div('.foo', {}, [ 'hello' ]);

      expect(el1.props.children).to.equal('hello');
      expect(el2.props.children).to.equal('hello');
      expect(el3.props.children).to.equal('hello');
      expect(el4.props.children).to.equal('hello');
    });

    it('should have `test` as the id and `foo` as the className', () => {
      const el = div('#test.foo');
      expect(el.props.id).to.equal('test');
      expect(el.props.className).to.equal('foo');
    });

    it('should have `test` as the id and `foo` as the className', () => {
      const el = div('#test .foo');
      expect(el.props.id).to.equal('test');
      expect(el.props.className).to.equal('foo');
    });

    it('should have `test` as the id and `foo bar` as the className', () => {
      const el = div('#test.foo.bar');
      expect(el.props.id).to.equal('test');
      expect(el.props.className).to.equal('foo bar');
    });
  });

  describe('`isRendered` property', () => {
    it('component should return `null` when `isRendered` is `false`', () => {
      const el = div({ isRendered: false });
      expect(el).to.equal(null);
    });

    it('component should return the react element when `isRendered` is `true`', () => {
      const el = div({ isRendered: true }, 'Some text');
      compareComponents(createElement('div', null, 'Some text'), el);
    });

    it('should not have `isRendered` property in the rendered react component props', () => {
      const el = div({ isRendered: true, className: 'foobar' });
      expect(el.props).to.deep.equal({ className: 'foobar' });
    });
  });
});

describe('Helper Function', () => {
  it('should create the factory function behind the scenes and apply it', () => compareComponents(createElement(c.ClassComponent), h(c.ClassComponent)));
});

describe('Custom Components', () => {
  it('should handle class components', () => compareComponents(createElement(c.ClassComponent), c.ClassComponentH()));
  it('should handle function components', () => compareComponents(createElement(c.FuncComponent), c.FuncComponentH()));
  it('should handle createClass components', () => compareComponents(createElement(c.CreateClass), c.CreateClassH()));
});
