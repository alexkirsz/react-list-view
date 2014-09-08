React List View
===============

Infinite list view component. Inspired by [Ember.ListView](https://github.com/emberjs/list-view).

Only visible items are rendered.

Installation
------------
```sh
npm install react-list-view --save
# or
bower install react-list-view
```

Usage
-----

`ReactListView` takes three required props:
  * `itemHeight`: height of every list item, in pixels
  * `itemCount`: number of items in the list
  * `itemFactory`: a function that returns an item's React component

**Example**
```js
/** @jsx React.DOM */
<ReactListView itemHeight={20} itemCount={10000} itemFactory={function (itemIdx) {
  return <div>Item {itemIdx}</div>;
}} />
```

You can also provide `topBoundary` and `bottomBoundary` properties if you wish to control the visible area yourself. Take a look at the [multiple lists example](/examples/multiple.html) to get started.

Styling
-------

To function properly, this component requires the following CSS rules:
```css
.ReactListView {
  position: relative;
  overflow: auto;
}
.ReactListView-container {
  overflow: hidden;
}
.ReactListView-item {
  position: absolute;
}
```
Check out the [examples](/examples) for more use cases. 

For even better performances, you should ignore pointer events inside the list with `pointer-events: none;`.

