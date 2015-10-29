import { PropTypes } from 'react';

import { CLASSMAP_KEY } from './constants';
import './inject';

export default function ClassMapMixin(map) {
  return {
    childContextTypes: { [CLASSMAP_KEY]: PropTypes.object },

    getChildContext() {
      return { [CLASSMAP_KEY]: map };
    },
  };
}
