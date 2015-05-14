# react-classmap

This hook lets you reconcile third-party React components with your CSS framework of choice by defining a mapping of additional class names to apply to children DOM components that have a given class name.

## Usage

You need to require `react-classmap` **before** you require `react`, otherwise the hook will not be applied correctly.

```js
import { ClassMapMixin } from 'react-classmap';
import React, { PropTypes } from 'react';

const GenericButton = React.createClass({
  render() {
    return (
      <button className="generic-button" />
    );
  },
});

const MyButton = React.createClass({
  mixins: [
    ClassMapMixin({
      // Children DOM components with the `generic-button` className will also
      // have the `fa fa-cog` classNames applied to them.
      'generic-button': 'fa fa-cog',
    }),
  ],

  render() {
    return <GenericButton />;
  },
});

React.renderToString(<MyButton />);
// => <button class="generic-button fa fa-cog"></button>
```

If you're using ES6 classes instead of `React.createClass`, there's a [higher-order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775).

```js
import { classMap } from 'react-classmap';

classMap(MyButton, { 'generic-button': 'fa fa-cog' });
```

With [ES7 decorators](https://github.com/wycats/javascript-decorators):

```js
@classMap({ 'generic-button': 'fa fa-cog' })
class MyButton {
  // ...
}
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

