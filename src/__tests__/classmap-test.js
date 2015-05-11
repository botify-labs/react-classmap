import '../classdef';
import expect from 'expect';
import React, { PropTypes, addons } from 'react/addons';

const { TestUtils } = addons;

describe('classdef', () => {

  it('only applies additional classNames as props to DOM components', () => {

    const Child = React.createClass({
      render() {
        return <div {...this.props} />;
      },
    });

    const Test = React.createClass({
      childContextTypes: {
        classDef: PropTypes.object,
      },
      getChildContext() {
        return {
          classDef: {
            Child: 'class1 class2',
          },
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
    expect(childDOM.props.className).toEqual('Child class1 class2');

  });

  it('doesn\'t leak', () => {

    const Child1 = React.createClass({
      childContextTypes: {
        classDef: PropTypes.object,
      },
      getChildContext() {
        return {
          classDef: {
            Child: 'class1',
          },
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
    expect(child1DOM.props.className).toEqual('Child class1');

    let child2DOM = TestUtils.findRenderedDOMComponentWithClass(child2, 'Child');
    expect(child2DOM.props.className).toEqual('Child');
  });

  it('works with `React.renderToString()`', () => {

    const FooBar = React.createClass({
      childContextTypes: {
        classDef: PropTypes.object,
      },
      getChildContext() {
        return {
          classDef: {
            foo: 'bar',
          },
        };
      },
      render() {
        return <div className="foo" />;
      },
    });

    expect(React.renderToString(<FooBar />)).toMatch(/class="foo bar"/);
  });

});
