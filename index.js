var loadsvg = require('load-svg')
var css = require('dom-css')
var position = require('mouse-position')
var request = require('browser-request')

var size = 700
 
loadsvg('./resources/top_down_outline.svg', function (err, svg) {
  css(svg, {
    width: size,
    height: size,
    position: 'absolute',
    left: 0,
    top: 0
  })
  document.body.appendChild(svg)
  mouse = position(svg)
  mouse.on('move', function (event) {
    console.log(event.clientX + ',' + event.clientY)
  })
})

var image = document.createElement('img')
image.src = 'http://connectivity.brain-map.org/api/v2/well_known_file_download/501058982'
css(image, {
  width: size,
  height: size,
  position: 'absolute',
  left: 0,
  top: 0
})
document.body.appendChild(image)