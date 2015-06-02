React List View
===============

Infinite list view component. Inspired by [Ember.ListView](https://github.com/emberjs/list-view).

Only visible items are rendered.

Installation
------------
```sh
npm install react-list-view --save
```

Usage
-----

`ReactListView` takes three required props:
  * `itemHeight: Number` height of every list item, in pixels
  * `itemCount: Number` number of items in the list
  * `renderItem(index: Number): ReactNode` a function that maps an item index to a React node

**Example**
```js
<ReactListView
  itemHeight={20}
  itemCount={10000}
  renderItem={index => <div>Item #{index}</div>}
/>
```

You can also provide `clientHeight` and `scrollTop` properties if you wish to control the visible area yourself. Take a look at the [multiple lists example](./examples/multiple.js) to get started.

Performance
-----------

For even better performances, you should ignore pointer events inside the list with `pointer-events: none;`.

