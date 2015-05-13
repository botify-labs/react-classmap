import './hook';
import { CLASSMAP_KEY } from './constants';
import { PropTypes } from 'react';

export default function ClassMapMixin(map) {
  return {
    childContextTypes: { [CLASSMAP_KEY]: PropTypes.object },

    getChildContext() {
      return { [CLASSMAP_KEY]: map };
    },
  };
}
