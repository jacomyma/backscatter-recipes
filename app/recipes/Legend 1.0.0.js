// GENERATE LEGEND
//
//  This script generates a legend

/// EDIT SETTINGS BELOW

var settings = {}

settings.width = 1000
settings.general_background_color = "#C6C5C7" // Only visible if block background is transparent
settings.block_background_opacity = 0 // Ranges from 0 to 1. 0=transparent, 1=opaque
settings.block_background_color = "#DCDCDC"
settings.font_family = "'IBM Plex Sans Condensed', sans-serif"
settings.text_color = "#000"
settings.text_color_alt = "#FFF" // Alternative color for data vis figures etc.

settings.show_title = true
settings.show_nodes_eges_count = true

settings.title = "NETWORK DETAILS"

/// (END OF SETTINGS)


/// JOBS
// General background color
document.querySelector('#playground').innerHTML = '<div id="background" style="width:'+settings.width+'px; background-color:'+settings.general_background_color+'"></div>'

if (settings.show_title) {
	showTitleBlock()
}
if (settings.show_nodes_eges_count) {
	showCountsBlock()
}

// Title block
function showTitleBlock() {
	var options = {}
	options.margin = 6
	options.font_size = 100 * settings.width/1000
	options.width = settings.width
	options.height = Math.ceil(2 * options.margin + 1.05 * options.font_size)
  options.font_weight = 600
  options.font_family = settings.font_family
	options.background_color = settings.block_background_color
	options.background_opacity = settings.block_background_opacity
	options.text_color = settings.text_color

	// Create canvas
	var canvas = document.createElement('canvas')
	canvas.width = options.width
	canvas.height = options.height
	var ctx = canvas.getContext("2d")
	document.querySelector('#background').appendChild(canvas)

	// Paint background
	var color = d3.color(options.background_color)
	color.opacity = options.background_opacity
	console.log(color.toString())
	ctx.beginPath()
  ctx.rect(0, 0, options.width, options.height)
  ctx.fillStyle = color.toString()
  ctx.fill()
  ctx.closePath()

  // Paint label
  ctx.lineWidth = 0
  ctx.font = options.font_weight + " " + options.font_size+"px "+options.font_family
  ctx.fillStyle = options.text_color
  ctx.fillText(
    settings.title
  , options.margin
  , options.height - options.margin
  )
}

function showCountsBlock() {
	var options = {}
	options.margin = 6
	options.font_size = 64 * settings.width/1000
	options.width = settings.width
	options.height = Math.ceil(2 * options.margin + 1.05 * options.font_size)
  options.font_weight_bold = 600
  options.font_weight_regular = 300
  options.font_family = settings.font_family
	options.background_color = settings.block_background_color
	options.background_opacity = settings.block_background_opacity
	options.text_color = settings.text_color

	// Create canvas
	var canvas = document.createElement('canvas')
	canvas.width = options.width
	canvas.height = options.height
	var ctx = canvas.getContext("2d")
	document.querySelector('#background').appendChild(canvas)

	// Paint background
	var color = d3.color(options.background_color)
	color.opacity = options.background_opacity
	console.log(color.toString())
	ctx.beginPath()
  ctx.rect(0, 0, options.width, options.height)
  ctx.fillStyle = color.toString()
  ctx.fill()
  ctx.closePath()

  // Paint label
  ctx.lineWidth = 0
  ctx.font = options.font_weight + " " + options.font_size+"px "+options.font_family
  ctx.fillStyle = options.text_color
  ctx.fillText(
    settings.title
  , options.margin
  , options.height - options.margin
  )
}
