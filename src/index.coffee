React = require 'react'
dom = React.DOM

transform = require './transform'

ReactListView = React.createClass
  displayName: 'ReactListView'

  propTypes:
    itemCount: React.PropTypes.number.isRequired
    itemHeight: React.PropTypes.number.isRequired
    itemFactory: React.PropTypes.func.isRequired
    topBoundary: React.PropTypes.number
    bottomBoundary: React.PropTypes.number

  getDefaultProps: ->
    itemCount: 0
    itemHeight: 0
    itemFactory: (idx) -> dom.div key: idx
    topBoundary: null
    bottomBoundary: null

  getInitialState: ->
    clientHeight: null
    scrollTop: 0

  componentDidMount: ->
    @setState
      clientHeight: @getDOMNode().clientHeight

  _handleScroll: ->
    @setState
      scrollTop: @getDOMNode().scrollTop

  _getTopRenderBoundary: ->
    if @props.topBoundary?
      Math.floor @props.topBoundary / @props.itemHeight
    else
      Math.floor @state.scrollTop / @props.itemHeight

  _getBottomRenderBoundary: ->
    if @props.bottomBoundary?
      Math.ceil @props.bottomBoundary / @props.itemHeight
    else
      Math.ceil (@state.scrollTop + @state.clientHeight) / @props.itemHeight

  render: ->
    items =
      for idx in [@_getTopRenderBoundary()...@_getBottomRenderBoundary()]
        dom.div
          className: 'ReactListView-item'
          key: idx
          style: transform 0, idx * @props.itemHeight
          children: @props.itemFactory idx

    dom.div
      className: 'ReactListView'
      onScroll: @_handleScroll
      children: dom.div
        className: 'ReactListView-container'
        style:
          height: "#{@props.itemCount * @props.itemHeight}px"
        children: items

module.exports = ReactListView