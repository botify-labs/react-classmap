import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ClassMapMixin from '../mixin';

describe('ClassMapMixin', () => {

  it('applies classes correctly', () => {

    const Test = React.createClass({
      mixins: [
        ClassMapMixin({
          child: 'class1 class2',
        }),
      ],

      render() {
        return <div className="child" />;
      },
    });

    let test = TestUtils.renderIntoDocument(<Test />);

    let childDOM = TestUtils.findRenderedDOMComponentWithClass(test, 'child');
    expect(childDOM.className).toEqual('child class1 class2');

  });

});
