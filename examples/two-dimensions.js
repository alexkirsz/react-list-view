import React from 'react';
import ReactListView from '../src';

const TwoDimensionsExample = React.createClass({

  displayName: 'TwoDimensionsExample',

  render() {
    return (
      <ReactListView
        style={{
          height: 400,
          width: 400,
        }}
        rowCount={100000}
        columnCount={100000}
        rowHeight={20}
        columnWidth={200}
        renderItem={(x, y, style) =>
          <div style={style}>
            Item #{x},#{y}
          </div>
        }
      />
    );
  },

});

React.render(<TwoDimensionsExample />, document.body);
