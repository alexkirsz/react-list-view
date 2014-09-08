!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.reactListView=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React, ReactListView, dom, transform;

React = require('react');

dom = React.DOM;

transform = require('./transform');

ReactListView = React.createClass({
  displayName: 'ReactListView',
  propTypes: {
    itemCount: React.PropTypes.number.isRequired,
    itemHeight: React.PropTypes.number.isRequired,
    itemFactory: React.PropTypes.func.isRequired,
    topBoundary: React.PropTypes.number,
    bottomBoundary: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      itemCount: 0,
      itemHeight: 0,
      itemFactory: function(idx) {
        return dom.div({
          key: idx
        });
      },
      topBoundary: null,
      bottomBoundary: null
    };
  },
  getInitialState: function() {
    return {
      clientHeight: null,
      scrollTop: 0
    };
  },
  componentDidMount: function() {
    return this.setState({
      clientHeight: this.getDOMNode().clientHeight
    });
  },
  _handleScroll: function() {
    return this.setState({
      scrollTop: this.getDOMNode().scrollTop
    });
  },
  _getTopRenderBoundary: function() {
    var boundary;
    boundary = this.props.topBoundary != null ? this.props.topBoundary : this.state.scrollTop;
    return Math.floor(boundary / this.props.itemHeight);
  },
  _getBottomRenderBoundary: function() {
    var boundary, maxBoundary;
    boundary = this.props.bottomBoundary != null ? this.props.bottomBoundary : this.state.scrollTop + this.state.clientHeight;
    maxBoundary = this.props.itemHeight * this.props.itemCount;
    if (boundary > maxBoundary) {
      boundary = maxBoundary;
    }
    return Math.ceil(boundary / this.props.itemHeight);
  },
  render: function() {
    var idx, items;
    items = (function() {
      var _i, _ref, _ref1, _results;
      _results = [];
      for (idx = _i = _ref = this._getTopRenderBoundary(), _ref1 = this._getBottomRenderBoundary(); _ref <= _ref1 ? _i < _ref1 : _i > _ref1; idx = _ref <= _ref1 ? ++_i : --_i) {
        _results.push(dom.div({
          className: 'ReactListView-item',
          key: idx,
          style: transform(0, idx * this.props.itemHeight),
          children: this.props.itemFactory(idx)
        }));
      }
      return _results;
    }).call(this);
    return dom.div({
      className: 'ReactListView',
      onScroll: this._handleScroll,
      children: dom.div({
        className: 'ReactListView-container',
        style: {
          height: "" + (this.props.itemCount * this.props.itemHeight) + "px"
        },
        children: items
      })
    });
  }
});

module.exports = ReactListView;



},{"./transform":2,"react":"react"}],2:[function(require,module,exports){

/*
Taken from emberjs/list-view
 */
var el, perspectiveProp, propPrefixes, style, supports2D, supports3D, testProp, transformProp;

el = document.createElement('div');

style = el.style;

propPrefixes = ['Webkit', 'Moz', 'O', 'ms'];

testProp = function(prop) {
  var i, prefixedProp, uppercaseProp, _i, _ref;
  if (prop in style) {
    return prop;
  }
  uppercaseProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (i = _i = 0, _ref = propPrefixes.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    prefixedProp = propPrefixes[i] + uppercaseProp;
    if (prefixedProp in style) {
      return prefixedProp;
    }
  }
  return null;
};

transformProp = testProp('transform');

perspectiveProp = testProp('perspective');

supports2D = transformProp != null;

supports3D = perspectiveProp != null;

module.exports = function(x, y) {
  style = {};
  if (supports3D) {
    style[transformProp] = "translate3d(" + x + "px, " + y + "px, 0)";
  } else if (supports2D) {
    style[transformProp] = "translate(" + x + "px, " + y + "px)";
  } else {
    style.top = "" + y + "px";
    style.left = "" + x + "px";
  }
  return style;
};



},{}]},{},[1])(1)
});