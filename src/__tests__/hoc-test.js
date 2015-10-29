import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import classMap from '../hoc';

describe('classMap', () => {

  it('applies classes correctly', () => {

    const Test = classMap(React.createClass({
      render() {
        return <div className="child" />;
      },
    }), { child: 'class1 class2' });

    let test = TestUtils.renderIntoDocument(<Test />);

    // For some reason `TestUtils.findRenderedDOMComponentWithClass` doesn't
    // work with higher-order components.
    expect(ReactDOM.findDOMNode(test).className).toEqual('child class1 class2');

  });

  it('works as a decorator', () => {

    @classMap({ child: 'class1 class2' })
    class Test extends React.Component {
      render() {
        return <div className="child" />;
      }
    }

    let test = TestUtils.renderIntoDocument(<Test />);

    expect(ReactDOM.findDOMNode(test).className).toEqual('child class1 class2');

  });

  it('preserves non react statics', () => {

    @classMap({})
    class Test extends React.Component {
      static foo = 'bar';

      render() {
        return <div className="child" />;
      }
    }

    expect(Test.foo).toBe('bar');

  });

});
