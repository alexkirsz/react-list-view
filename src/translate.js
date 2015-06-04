// Extracted from emberjs/list-view

let { style } = document.createElement('div');

let propPrefixes = ['Webkit', 'Moz', 'O', 'ms'];

function testProp(prop) {
  if (prop in style) {
    return prop;
  }

  let capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);

  let prefixedProp;
  for (let i = 0; i < propPrefixes.length; i++) {
    prefixedProp = propPrefixes[i] + capitalizedProp;
    if (prefixedProp in style) {
      return prefixedProp;
    }
  }
  return false;
}

let transformProp = testProp('transform');
let perspectiveProp = testProp('perspective');

let supports2D = !!transformProp;
let supports3D = !!perspectiveProp;

export default function translate(x, y) {
  if (supports3D) {
    return {
      [transformProp]: `translate3d(${x}px, ${y}px, 0)`,
    };
  }
  if (supports2D) {
    return {
      [transformProp]: `translate(${x}px, ${y}px)`,
    };
  }
  return {
    top: `${y}px`,
    left: `${x}px`,
  };
}
