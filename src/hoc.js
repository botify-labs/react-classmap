import React, { PropTypes } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { CLASSMAP_KEY } from './constants';
import './inject';

export default function classMap(...args) {
  if (args.length === 1) {
    let [map] = args;
    return function classMapDecorator(Composed) {
      return classMap(Composed, map);
    };
  }

  let [Composed, map] = args;

  class ClassMap extends React.Component {
    static childContextTypes = { [CLASSMAP_KEY]: PropTypes.object };

    getChildContext() {
      return { [CLASSMAP_KEY]: map };
    }

    render() {
      return <Composed {...this.props} />;
    }
  }

  return hoistNonReactStatics(ClassMap, Composed);
}
