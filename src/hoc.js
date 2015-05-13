import './hook';
import { CLASSMAP_KEY } from './constants';
import React, { PropTypes } from 'react';

export default function classMap(...args) {
  if (args.length === 1) {
    let [map] = args;
    return function classMapDecorator(Composed) {
      return classMap(Composed, map);
    };
  }

  let [Composed, map] = args;

  return class ClassMap {
    static childContextTypes = { [CLASSMAP_KEY]: PropTypes.object };

    getChildContext() {
      return { [CLASSMAP_KEY]: map };
    }

    render() {
      return <Composed {...this.props} />;
    }
  };
}
