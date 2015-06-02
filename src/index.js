import React, { PropTypes } from 'react';
import cx from 'classnames';

import translate from './translate';

export default class ReactListView extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    itemCount: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    clientHeight: PropTypes.number,
    scrollTop: PropTypes.number,
  };

  static defaultProps = {
    className: null,
    style: {},
    clientHeight: null,
    scrollTop: null,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      clientHeight: 0,
      scrollTop: 0,
    };

    this._isControlled = props.clientHeight != null;
    this._maxBoundary = props.itemHeight * props.itemCount;
    this._handleScroll = this._handleScroll.bind(this);
  }

  componentDidMount() {
    if (!this._isControlled) {
      this.setState({
        clientHeight: React.findDOMNode(this).clientHeight,
        scrollTop: React.findDOMNode(this).scrollTop,
      });
    }
  }

  _handleScroll(e) {
    this.setState({
      scrollTop: e.target.scrollTop,
    });
  }

  _getRenderBoundaries() {
    let { scrollTop, clientHeight } = this._isControlled ? this.props : this.state;
    let { itemHeight } = this.props;
    let topBoundary = Math.floor(scrollTop / itemHeight);
    let bottomBoundary = topBoundary + Math.ceil(clientHeight / itemHeight)
    return [topBoundary, bottomBoundary];
  }

  render() {
    let { style, className, itemCount, itemHeight, renderItem } = this.props;

    let items = [];
    let [top, bottom] = this._getRenderBoundaries();
    for (let i = top; i < bottom; i++) {
      items.push(
        <div
          key={i}
          className="ReactListView-item"
          style={{
            position: 'absolute',
            ...translate(0, i * itemHeight),
          }}
        >
          {renderItem(i)}
        </div>
      );
    }

    return (
      <div
        className={cx('ReactListView', className)}
        style={{
          position: 'relative',
          overflow: 'auto',
          ...style,
        }}
        onScroll={!this._isControlled && this._handleScroll}
      >
        <div
          className="ReactListView-container"
          style={{
            overflow: 'hidden',
            height: `${this._maxBoundary}px`,
          }}
        >
          {items}
        </div>
      </div>
    );
  }

}
