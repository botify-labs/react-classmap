import React, { PropTypes } from 'react';

import { CLASSMAP_KEY } from './constants';
import './hook';

export default function classMap(...args) {
  if (args.length === 1) {
    let [map] = args;
    return function classMapDecorator(Composed) {
      return classMap(Composed, map);
    };
  }

  let [Composed, map] = args;

  return class ClassMap extends React.Component {
    static childContextTypes = { [CLASSMAP_KEY]: PropTypes.object };

    getChildContext() {
      return { [CLASSMAP_KEY]: map };
    }

    render() {
      return <Composed {...this.props} />;
    }
  };
}
