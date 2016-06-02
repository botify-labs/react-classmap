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
  let className = applyClassMap(
    element.props.className,
    context[CLASSMAP_KEY]
  );
  if (className === element.props.className) {
    return element;
  }
  return cloneElement(element, { className });
}

class DOMComponent extends ReactDOMComponent {
  mountComponent(transaction, hostParent, hostContainerInfo, context) {
    this._currentElement = applyClassMapToElement(
      this._currentElement,
      context
    );
    return super.mountComponent(...arguments);
  }

  updateComponent(transaction, prevElement, nextElement, context) {
    this._currentElement = applyClassMapToElement(
      this._currentElement,
      context
    );
    return super.updateComponent(...arguments);
  }
}

export default DOMComponent;
