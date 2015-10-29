import ReactDOMComponent from 'react/lib/ReactDOMComponent';
import { cloneElement } from 'react';

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

function applyClassMapToElement(element, context) {
  return cloneElement(element, {
    className: applyClassMap(
      element.props.className,
      context[CLASSMAP_KEY]
    ),
  });
}

class DOMComponent extends ReactDOMComponent {
  mountComponent(rootID, transaction, context) {
    this._currentElement = applyClassMapToElement(
      this._currentElement,
      context
    );
    return super.mountComponent(rootID, transaction, context);
  }

  updateComponent(transaction, prevElement, nextElement, context) {
    this._currentElement = applyClassMapToElement(this._currentElement, context);
    return super.updateComponent(
      transaction,
      prevElement,
      nextElement,
      context
    );
  }
}

export default DOMComponent;
