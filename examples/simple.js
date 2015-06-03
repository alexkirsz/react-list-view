import React from 'react';
import ReactListView from '../src';

const SimpleExample = React.createClass({

  displayName: 'SimpleExample',

  _renderItem(i) {
    return <div key={i}>Item #{i}</div>;
  },

  render() {
    return (
      <ReactListView
        style={{
          height: 400,
        }}
        itemCount={100000}
        itemHeight={20}
        renderItem={index => <div>Item #{index}</div>}
      />
    );
  },

});

React.render(<SimpleExample />, document.body);
