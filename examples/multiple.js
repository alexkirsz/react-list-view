import React from 'react';
import ReactListView from '../src';

const multipleStyle = {
  height: 300,
  position: 'relative',
  overflow: 'auto',
  border: '2px solid #DDD',
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

  _renderItem(index) {
    return <div>Item #{index}</div>;
  },

  render() {
    let { scrollTop, clientHeight } = this.state;

    return (
      <div onScroll={this._handleScroll} style={multipleStyle}>
        <div style={listStyle}>
          <ReactListView
            itemCount={100000}
            itemHeight={20}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
          />
        </div>
        <div style={listStyle}>
          <ReactListView
            itemCount={80000}
            itemHeight={25}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
          />
        </div>
        <div style={listStyle}>
          <ReactListView
            itemCount={50000}
            itemHeight={40}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
          />
        </div>
      </div>
    );
  },

});

React.render(<MultipleExample />, document.getElementById('container'));
