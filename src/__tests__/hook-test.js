import '../hook';
import { CLASSMAP_KEY } from '../constants';
import expect from 'expect';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';

describe('hook', () => {

  it('only applies additional classNames as props to DOM components', () => {

    const Child = React.createClass({
      render() {
        return <div {...this.props} />;
      },
    });

    const Test = React.createClass({
      childContextTypes: {
        [CLASSMAP_KEY]: PropTypes.object,
      },

      getChildContext() {
        return {
          [CLASSMAP_KEY]: { Child: 'class1 class2' },
        };
      },

      render() {
        return (
          <div>
            <Child className="Child" />
          </div>
        );
      },
    });

    let test = TestUtils.renderIntoDocument(<Test />);

    let child = TestUtils.findRenderedComponentWithType(test, Child);
    expect(child.props.className).toEqual('Child');

    let childDOM = TestUtils.findRenderedDOMComponentWithClass(test, 'Child');
    expect(childDOM.className).toEqual('Child class1 class2');

  });

  it('updates correctly', () => {

    const Test = React.createClass({
      childContextTypes: {
        [CLASSMAP_KEY]: PropTypes.object,
      },

      getChildContext() {
        return {
          [CLASSMAP_KEY]: { class1: 'class3', class2: 'class4' },
        };
      },

      render() {
        return (
          <div {...this.props} />
        );
      },
    });

    let div = document.createElement('div');
    let test = ReactDOM.render(<Test className="class1" />, div);

    TestUtils.findRenderedDOMComponentWithClass(test, 'class3');

    ReactDOM.render(<Test className="class2" />, div);

    TestUtils.findRenderedDOMComponentWithClass(test, 'class4');

  });

  it('doesn\'t leak', () => {

    const Child1 = React.createClass({
      childContextTypes: {
        [CLASSMAP_KEY]: PropTypes.object,
      },

      getChildContext() {
        return {
          [CLASSMAP_KEY]: { Child: 'class1' },
        };
      },

      render() {
        return <div {...this.props} />;
      },
    });

    const Child2 = React.createClass({
      render() {
        return <div {...this.props} />;
      },
    });

    const Test = React.createClass({
      render() {
        return (
          <div>
            <Child1 className="Child" />
            <Child2 className="Child" />
          </div>
        );
      },
    });

    let test = TestUtils.renderIntoDocument(<Test />);

    let child1 = TestUtils.findRenderedComponentWithType(test, Child1);
    expect(child1.props.className).toEqual('Child');

    let child2 = TestUtils.findRenderedComponentWithType(test, Child2);
    expect(child2.props.className).toEqual('Child');

    let child1DOM = TestUtils.findRenderedDOMComponentWithClass(child1, 'Child');
    expect(child1DOM.className).toEqual('Child class1');

    let child2DOM = TestUtils.findRenderedDOMComponentWithClass(child2, 'Child');
    expect(child2DOM.className).toEqual('Child');
  });

  it('works with `ReactDOMServer.renderToString()`', () => {

    const FooBar = React.createClass({
      childContextTypes: {
        [CLASSMAP_KEY]: PropTypes.object,
      },

      getChildContext() {
        return {
          [CLASSMAP_KEY]: { foo: 'bar' },
        };
      },

      render() {
        return <div className="foo" />;
      },
    });

    expect(ReactDOMServer.renderToString(<FooBar />)).toMatch(/class="foo bar"/);
  });

});
