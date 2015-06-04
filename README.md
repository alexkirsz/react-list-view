# React List View

Infinite list view component with support for vertical and horizontal scrolling. Inspired by [Ember.ListView](https://github.com/emberjs/list-view).

Only visible items are rendered.

## Installation

```sh
npm install react-list-view --save
```

## Usage

### Props

`renderItem(x: Number, y: Number, style: Object): ReactElement`  
**Required**. Maps an item's coordinates to a React element. The style object contains CSS positioning properties that should be applied to the element returned from `renderItem`.

#### Vertical scrolling

`rowHeight: Number`  
Height of every row, in pixels.

`rowCount: Number`  
Number of rows in the list.

`clientHeight: Number`  
Height of the scrollable area, in pixels.

`scrollTop: Number`  
Vertical scroll offset of the scrollable area, in pixels.

#### Horizontal scrolling

`columnWidth: Number`  
Width of every column, in pixels.

`columnCount: Number`  
Number of columns in the list.

`clientWidth: Number`  
Width of the scrollable area, in pixels.

`scrollLeft: Number`  
Horizontal scroll offset of the scrollable area, in pixels.

### Notes

If neither `clientWidth` nor `clientHeight` are provided, the `ReactListView` component will control its own `clientWidth`, `clientHeight`, `scrollTop` and `scrollLeft` properties.

Otherwise, the `ReactListView` expects to be provided with either:
 * `clientHeight` and `scrollTop`
 * `clientWidth` and `scrollLeft`
 * all four properties

### Example
```js
<ReactListView
  rowHeight={20}
  rowCount={10000}
  renderItem={(x, y, style) => <div style={style}>Item #{x}</div>}
/>
```

See also [the examples directory](examples/).

To run the examples, simply clone the repo and then `npm install` and `npm start` at the root of the repo.

## Performance

For even better performances, you should ignore pointer events inside the list with `pointer-events: none;`.

When the `client{Height,Width}` and `scroll{Top,Left}` props of the component are controlled by a parent component, the scrollable container should have a CSS transform applied. See #2.
