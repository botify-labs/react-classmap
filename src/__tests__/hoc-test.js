import classMap from '../hoc';
import expect from 'expect';
import React, { addons } from 'react/addons';

const { TestUtils } = addons;

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
    expect(React.findDOMNode(test).className).toEqual('child class1 class2');

  });

  it('works as a decorator', () => {

    @classMap({ child: 'class1 class2' })
    class Test extends React.Component {
      render() {
        return <div className="child" />;
      }
    }

    let test = TestUtils.renderIntoDocument(<Test />);

    expect(React.findDOMNode(test).className).toEqual('child class1 class2');

  });

});
