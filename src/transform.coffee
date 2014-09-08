###
Taken from emberjs/list-view
###

el = document.createElement 'div'
style = el.style

propPrefixes = ['Webkit', 'Moz', 'O', 'ms']

testProp = (prop) ->
  if prop of style
    return prop
  
  uppercaseProp = prop.charAt(0).toUpperCase() + prop[1...]
  for i in [0...propPrefixes.length]
    prefixedProp = propPrefixes[i] + uppercaseProp
    if prefixedProp of style
      return prefixedProp;
  return null

transformProp = testProp 'transform'
perspectiveProp = testProp 'perspective'

supports2D = transformProp?
supports3D = perspectiveProp?

module.exports = (x, y) ->
  style = {}
  if supports3D
    style[transformProp] = "translate3d(#{x}px, #{y}px, 0)"
  else if supports2D
    style[transformProp] = "translate(#{x}px, #{y}px)"
  else
    style.top = "#{y}px"
    style.left = "#{x}px"
  return style
