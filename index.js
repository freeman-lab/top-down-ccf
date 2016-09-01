var loadsvg = require('load-svg')
var css = require('dom-css')
var position = require('mouse-position')
var request = require('browser-request')
var pointinpoly = require('point-in-svg-polygon')

var scale = 0.5
var targets = ['VISam_000', 'VISa_000', 'SSp-un_000', 'SSp-m_000', 'SSp-ul_000', 'SSp-ll_000', 'SSp-tr_000', 'MOp_000', 'MOs_000']
 
var selected = document.createElement('div')
selected.innerHTML = 'select an area'
css(selected, {
  fontFamily: 'monospace',
  fontSize: '24px',
  position: 'fixed',
  left: 10,
  top: 10,
  color: 'white'
})
document.body.appendChild(selected)

loadsvg('./resources/top_down_outline.svg', function (err, svg) {
  css(svg, {
    width: 1140 * scale,
    height: 1320 * scale,
    position: 'absolute',
    left: 0,
    top: 0,
    cursor: 'pointer'
  })
  document.body.appendChild(svg)

  document.querySelectorAll('path').forEach(function (d) {
    css(d, {
      stroke: 'yellow',
      strokeWidth: 5
    })
  })

  var lookup = {}
  targets.forEach(function (d) {
    var el = document.querySelector('#' + d)
    lookup[d] = {
      el: el,
      path: el.attributes.d.textContent
    }
  })

  mouse = position(svg)  
  mouse.on('move', function (event) {
    var pos = [event.clientX * 1 / scale, event.clientY * 1 / scale]
    for (var t=0; t < targets.length; t++) {
      var item = lookup[targets[t]]
      css(item.el, {fill: 'none'})
    }
    selected.innerHTML = 'select an area'
    for (var t=0; t < targets.length; t++) {
      var item = lookup[targets[t]]
      var result = pointinpoly.isInside(pos, item.path)
      if (result) {
        css(item.el, {fill: 'yellow'})
        selected.innerHTML = targets[t]
        break
      }
    }
  })  
})

var image = document.createElement('img')
image.src = './resources/background_10.png'
css(image, {
  width: 1140 * scale,
  height: 1320 * scale,
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: -1000
})
document.body.appendChild(image)

