// It is **mandatory** to require this module before requiring React itself:
// `ReactCompositeComponent.Mixin` properties are copied over to a private
// object during React's initialization process.

import ReactDOMComponent from 'react/lib/ReactDOMComponent';
import { cloneElement } from 'react/lib/ReactElement';
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

const { mountComponent, updateComponent } = ReactDOMComponent.prototype;

function applyClassMapToElement(element, context) {
  return cloneElement(element, {
    className: applyClassMap(
      element.props.className,
      context[CLASSMAP_KEY]
    ),
  });
}

ReactDOMComponent.prototype.mountComponent = function(
  rootID,
  transaction,
  context
) {
  this._currentElement = applyClassMapToElement(this._currentElement, context);
  return mountComponent.call(this, rootID, transaction, context);
};

ReactDOMComponent.prototype.updateComponent = function(
  transaction,
  prevElement,
  nextElement,
  context
) {
  this._currentElement = applyClassMapToElement(this._currentElement, context);
  return updateComponent.call(
    this,
    transaction,
    prevElement,
    nextElement,
    context
  );
};
