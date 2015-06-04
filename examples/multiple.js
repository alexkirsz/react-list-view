import React from 'react';
import ReactListView from '../src';
import translate from '../src/translate';

const multipleStyle = {
  height: 300,
  position: 'relative',
  overflow: 'auto',
  border: '2px solid #DDD',
  transform: 'translate3d(0, 0, 0)'
};

const listStyle = {
  width: '33.3%',
  float: 'left',
};

const MultipleExample = React.createClass({

  displayName: 'MultipleExample',

  getInitialState() {
    return {
      clientHeight: 0,
      scrollTop: 0
    };
  },

  componentDidMount() {
    this.setState({
      clientHeight: React.findDOMNode(this).clientHeight,
      scrollTop: React.findDOMNode(this).scrollTop,
    });
  },

  _handleScroll(e) {
    this.setState({
      scrollTop: e.target.scrollTop,
    });
  },

  _renderItem(x, y, style) {
    return <div style={style}>Item #{x},#{y}</div>;
  },

  render() {
    let { scrollTop, clientHeight } = this.state;

    return (
      <div
        onScroll={this._handleScroll}
        style={translate(0, 0, 0)}
      >
        <div style={listStyle}>
          <ReactListView
            rowCount={100000}
            rowHeight={20}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
          />
        </div>
        <div style={listStyle}>
          <ReactListView
            rowCount={80000}
            rowHeight={25}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
          />
        </div>
        <div style={listStyle}>
          <ReactListView
            rowCount={50000}
            rowHeight={40}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
          />
        </div>
      </div>
    );
  },

});

React.render(<MultipleExample />, document.body);
