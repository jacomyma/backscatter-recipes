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
settings.show_modalities_list= true

settings.title = "NETWORK DETAILS"

settings.modalities_list_alpha_order = false // Default: biggest to smallest

// Main clusters and color code:
// This specifies which is the represented attribute, and which
// modalities have which colors. You can generate this
// JSON object with the PREPARE script.
settings.node_clusters = {
  "attribute_id": "attr_8",
  "modalities": {
    "Digital industries": {
      "label": "Digital industries",
      "count": 595,
      "color": "#6fc5a4"
    },
    "Arts and Crafts": {
      "label": "Arts and Crafts",
      "count": 298,
      "color": "#f26b6e"
    },
    "Film & TV": {
      "label": "Film & TV",
      "count": 221,
      "color": "#b9a2ce"
    },
    "Advertising, marketing and public relations": {
      "label": "Advertising, marketing and public relations",
      "count": 192,
      "color": "#e8a74b"
    },
    "Architecture;Andet": {
      "label": "Architecture",
      "count": 182,
      "color": "#658ec9"
    },
    "Fashion and textiles": {
      "label": "Fashion and textiles",
      "count": 160,
      "color": "#ce6028"
    },
    "Design": {
      "label": "Design",
      "count": 159,
      "color": "#f2a5a6"
    },
    "Music": {
      "label": "Music",
      "count": 145,
      "color": "#4aa05b"
    },
    "Advertising, marketing and public relations | Architecture;Andet | Arts and Crafts | Design | Digital industries | Fashion and textiles | Film & TV | Music": {
      "label": "Multiple",
      "count": 58,
      "color": "#b65887"
    },
    "Arts and Crafts | Music": {
      "label": "Arts and Crafts & Music",
      "count": 36,
      "color": "#7169af"
    }
  },
  "default_color": "#9d9b99"
}

/// (END OF SETTINGS)


/// JOBS
// General background color
document.querySelector('#playground').innerHTML = '<div id="background" style="background-color:'+settings.general_background_color+'"></div>'
// document.querySelector('#playground').innerHTML = '<div id="background" style="width:'+settings.width+'px; background-color:'+settings.general_background_color+'"></div>'

if (settings.show_title) {
	showTitleBlock()
}
if (settings.show_nodes_eges_count) {
	showCountsBlock()
}
if (settings.show_modalities_list) {
	showModalitiesBlock()
}

// Title block
function showTitleBlock() {
	var options = {}
	options.margin = 6 * settings.width/1000
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

// Edge and node count block
function showCountsBlock() {
	var options = {}
	options.margin = 6 * settings.width/1000
	options.font_size = 56 * settings.width/1000
	options.width = settings.width
	options.height = Math.ceil(2 * options.margin + 1.25 * options.font_size)
  options.font_weight_bold = 500
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
	ctx.beginPath()
  ctx.rect(0, 0, options.width, options.height)
  ctx.fillStyle = color.toString()
  ctx.fill()
  ctx.closePath()

  // Text
  var w, txt
  ctx.lineWidth = 0
  ctx.fillStyle = options.text_color

  ctx.font = options.font_weight_bold + " " + options.font_size+"px "+options.font_family
  txt = "nodes: "
  
  ctx.fillText(
    txt
  , options.margin
  , options.height - options.margin - 0.2 * options.font_size
  )
  w = ctx.measureText(txt).width

  ctx.font = options.font_weight_regular + " " + options.font_size+"px "+options.font_family
  txt = numberWithCommas(g.order)
  
  ctx.fillText(
    txt
  , options.margin + w
  , options.height - options.margin - 0.2 * options.font_size
  )
  w = ctx.measureText(txt).width

	ctx.font = options.font_weight_bold + " " + options.font_size+"px "+options.font_family
  txt = "edges: "
  
  ctx.fillText(
    txt
  , options.width / 2
  , options.height - options.margin - 0.2 * options.font_size
  )
  w = ctx.measureText(txt).width

  ctx.font = options.font_weight_regular + " " + options.font_size+"px "+options.font_family
  txt = numberWithCommas(g.size)
  
  ctx.fillText(
    txt
  , options.width / 2 + w
  , options.height - options.margin - 0.2 * options.font_size
  )
  w = ctx.measureText(txt).width
}

// Modalities
function showModalitiesBlock() {
	var options = {}
	options.margin = 6 * settings.width/1000
	options.font_size = 48 * settings.width/1000
	options.width = settings.width
	options.row_height = Math.ceil(2 * options.margin + 1.25 * options.font_size)
  options.font_weight_bold = 500
  options.font_weight_regular = 200
  options.font_family = settings.font_family
	options.background_color = settings.block_background_color
	options.background_opacity = settings.block_background_opacity
	options.text_color = settings.text_color
	options.alphabetical_order = settings.modalities_list_alpha_order

	// Compute height
	var modalities = d3.values(settings.node_clusters.modalities)
	var rows_count = modalities.length
	var represented_nodes = d3.sum(modalities, function(m){
		return m.count
	})
	if (represented_nodes < g.order) {
		rows_count++ // line for other modalities
	}
	var height = rows_count * options.row_height
	console.log("H", height)

	// Create canvas
	var canvas = document.createElement('canvas')
	canvas.width = options.width
	canvas.height = height
	var ctx = canvas.getContext("2d")
	document.querySelector('#background').appendChild(canvas)

	// Paint background
	var color = d3.color(options.background_color)
	color.opacity = options.background_opacity
	ctx.beginPath()
  ctx.rect(0, 0, options.width, height)
  ctx.fillStyle = color.toString()
  ctx.fill()
  ctx.closePath()
	
  // Sort modalities
  if (options.alphabetical_order) {
  	modalities.sort(function(a,b){
  		if (a.label<b.label) {
  			return -1
  		} else return 1
  	})
  }

	// Paint modalities
	console.log(modalities)

}

// Helpers
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}