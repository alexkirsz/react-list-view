import React from 'react';
import ReactDOM from 'react-dom';
import ReactListView from '../src';
import translate from '../src/translate';

const listStyle = {
  width: '33.3%',
  display: 'inline-block',
};

const MultipleExample = React.createClass({

  displayName: 'MultipleExample',

  getInitialState() {
    return {
      clientHeight: 0,
      clientWidth: 0,
      scrollTop: 0
    };
  },

  componentDidMount() {
    this.setState({
      clientHeight: ReactDOM.findDOMNode(this).clientHeight,
      clientWidth: ReactDOM.findDOMNode(this).clientWidth,
      scrollTop: ReactDOM.findDOMNode(this).scrollTop,
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
        style={{
          height: 400,
          overflow: 'auto',
          ...translate(0, 0, 0),
        }}
      >
        <div style={listStyle}>
          <ReactListView
            rowCount={100000}
            rowHeight={20}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
            clientWidth={this.state.clientWidth / 3}
          />
        </div>
        <div style={listStyle}>
          <ReactListView
            rowCount={80000}
            rowHeight={25}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
            clientWidth={this.state.clientWidth / 3}
          />
        </div>
        <div style={listStyle}>
          <ReactListView
            rowCount={50000}
            rowHeight={40}
            renderItem={this._renderItem}
            scrollTop={this.state.scrollTop}
            clientHeight={this.state.clientHeight}
            clientWidth={this.state.clientWidth / 3}
          />
        </div>
      </div>
    );
  },

});

ReactDOM.render(<MultipleExample />, document.body);
