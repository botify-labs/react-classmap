# react-classmap

This hook lets you reconcile third-party React components with your CSS framework of choice by defining a mapping of additional class names to apply to children DOM components that have a given class name.

## Usage

You need to require `react-classmap` **before** you require `react`, otherwise the hook will not be applied correctly.

```js
import 'react-classmap';
import React, { PropTypes } from 'react';

const GenericButton = React.createClass({
  render() {
    return (
      <button className="generic-button" />
    );
  },
});

const MyButton = React.createClass({
  childContextTypes: {
    classMap: PropTypes.object,
  },
  getChildContext() {
    return {
      classMap: {
        // Children DOM components with the `generic-button` className will also
        // have the `fa fa-cog` classNames applied to them.
        'generic-button': 'fa fa-cog',
      },
    };
  },
  render() {
    return <GenericButton />;
  },
});

React.renderToString(<MyButton />);
// => <button class="generic-button fa fa-cog"></div>
```

## Installing

```
npm install react-classmap
```

## Building

```
npm run build
```

## Running tests

```
npm test
```

