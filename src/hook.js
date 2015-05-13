// It is **mandatory** to require this module before requiring React itself:
// `ReactCompositeComponent.Mixin` properties are copied over to a private
// object during React's initialization process.

import ReactCompositeComponent from 'react/lib/ReactCompositeComponent';
import { CLASSMAP_KEY } from './constants';

function applyClassMap(value, classMap) {
  if (!value || !classMap) {
    return value;
  }
  let classNames = value.split(/\s+/);
  classNames = classNames.map(c => {
    if (!classMap[c]) {
      return c;
    }
    return [c, classMap[c]].join(' ');
  }).join(' ');
  return classNames;
}

function rendersDOMComponent(component) {
  return typeof component._currentElement.type === 'string';
}

const { _processProps } = ReactCompositeComponent.Mixin;
ReactCompositeComponent.Mixin._processProps = function(props) {
  let processedProps = _processProps.call(this, props);
  if (
    rendersDOMComponent(this) &&
    typeof processedProps.className !== 'undefined'
  ) {
    let context = this._context;
    processedProps = {
      ...processedProps,
      className: applyClassMap(processedProps.className, context[CLASSMAP_KEY])
    };
  }
  return processedProps;
};
