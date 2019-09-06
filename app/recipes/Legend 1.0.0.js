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
settings.show_modalities_list = false
settings.show_modalities_distribution = false
settings.show_modalities_chord_diagram = true

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
if (settings.show_modalities_distribution) {
	showModalitiesDistributionBlock()
}
if (settings.show_modalities_chord_diagram) {
	showChordDiagramBlock()
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
  , options.height - options.margin - 0.38 * options.font_size
  )
  w = ctx.measureText(txt).width

  ctx.font = options.font_weight_regular + " " + options.font_size+"px "+options.font_family
  txt = numberWithCommas(g.order)
  
  ctx.fillText(
    txt
  , options.margin + w
  , options.height - options.margin - 0.38 * options.font_size
  )
  w = ctx.measureText(txt).width

	ctx.font = options.font_weight_bold + " " + options.font_size+"px "+options.font_family
  txt = "edges: "
  
  ctx.fillText(
    txt
  , options.width / 2
  , options.height - options.margin - 0.38 * options.font_size
  )
  w = ctx.measureText(txt).width

  ctx.font = options.font_weight_regular + " " + options.font_size+"px "+options.font_family
  txt = numberWithCommas(g.size)
  
  ctx.fillText(
    txt
  , options.width / 2 + w
  , options.height - options.margin - 0.38 * options.font_size
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
	options.others_label = "Others"

	// Compute height
	var modalities = d3.values(settings.node_clusters.modalities)
	var rows_count = modalities.length
	var represented_nodes = d3.sum(modalities, function(m){
		return m.count
	})
	if (represented_nodes < g.order) {
		rows_count++ // line for other modalities
	}
	var height = rows_count * options.row_height + options.margin
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
	if (represented_nodes < g.order) {
		modalities.push({
			"label": options.others_label,
      "count": g.order-represented_nodes,
      "color": settings.node_clusters.default_color
		})
	}
	var yOffset = 0.5 * options.margin
	modalities.forEach(function(mod){
		// Circle
		var r = options.row_height/2 - 0.5*options.margin
		var x = options.row_height/2 + 0.5*options.margin
		var y = yOffset + options.row_height/2
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    ctx.lineWidth = 0
    ctx.fillStyle = mod.color
    ctx.shadowColor = 'transparent'
    ctx.fill()
    
    // Text settings
		ctx.lineWidth = 0
	  ctx.fillStyle = options.text_color

    // Number label width
	  ctx.font = options.font_weight_regular + " " + options.font_size+"px "+options.font_family
	  var numLabel = ' '+numberWithCommas(mod.count) + ' nodes'
	  var numLabelW = ctx.measureText(numLabel).width

	  // Cat label
	  ctx.font = options.font_weight_bold + " " + options.font_size+"px "+options.font_family
	  var label = mod.label
	  if (2*options.margin + 2*r + ctx.measureText(label).width + numLabelW + options.margin > options.width) {
	  	label = label.substr(0, label.length-1)+'...'
	  	while (2*options.margin + 2*r + ctx.measureText(label).width + numLabelW + options.margin > options.width) {
	  		label = label.substr(0, label.length-4)+'...'
	  	}
	  }
	  ctx.fillText(
	    label
	  , 2*options.margin + 2*r
	  , yOffset + options.row_height - 0.5 * options.margin - 0.38 * options.font_size
	  )
	  var labelW = ctx.measureText(label).width

	  // Number label
	  ctx.font = options.font_weight_regular + " " + options.font_size+"px "+options.font_family
	  ctx.fillText(
	    numLabel
	  , 2*options.margin + 2*r + labelW
	  , yOffset + options.row_height - 0.5 * options.margin - 0.38 * options.font_size
	  )

    yOffset += options.row_height
	})
}

// Distribution
function showModalitiesDistributionBlock() {
	var options = {}
	options.margin = 6 * settings.width/1000
	options.font_size_title = 56 * settings.width/1000
	options.font_size_number = 20 * settings.width/1000
	options.width = settings.width
	options.height = Math.ceil(options.width/5)
  options.font_weight_title = 500
  options.font_weight_number = 300
  options.font_family = settings.font_family
	options.background_color = settings.block_background_color
	options.background_opacity = settings.block_background_opacity
	options.text_color_title = settings.text_color
	options.text_color_number = settings.text_color_alt

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
	
  // Sort modalities
	var modalities = d3.values(settings.node_clusters.modalities)
  if (options.alphabetical_order) {
  	modalities.sort(function(a,b){
  		if (a.label<b.label) {
  			return -1
  		} else return 1
  	})
  }

  // Title
  ctx.lineWidth = 0
  ctx.font = options.font_weight_title + " " + options.font_size_title+"px "+options.font_family
  ctx.fillStyle = options.text_color_title
  ctx.fillText(
    'Nodes distribution'
  , options.margin
  , options.margin + 1.05 * options.font_size_title
  )
  var yOffset = options.margin * 2 + 1.05 * options.font_size_title

	// Paint modalities
	var represented_nodes = d3.sum(modalities, function(m){
		return m.count
	})
	if (represented_nodes < g.order) {
		modalities.push({
			"label": 'Others',
      "count": g.order-represented_nodes,
      "color": settings.node_clusters.default_color
		})
	}
	var xOffset = options.margin
	modalities.forEach(function(mod){
		// Rectangle
		var share = mod.count/g.order
		var w = share * (options.width - 2*options.margin)
    ctx.lineWidth = 0
    ctx.fillStyle = mod.color
    ctx.shadowColor = 'transparent'
		ctx.fillRect(xOffset, yOffset, w, options.height - options.margin - yOffset)
    
    // Text settings
		ctx.lineWidth = 0
	  ctx.fillStyle = options.text_color

    // Number label width
	  ctx.font = options.font_weight_number + " " + options.font_size_number+"px "+options.font_family
	  var numLabel = Math.round(share*100) + '%'
	  var numLabelW = ctx.measureText(numLabel).width

	  // Draw label if possible
	  ctx.fillStyle = options.text_color_number
    ctx.textAlign = "center"
	  if (numLabelW < w) {
	  	ctx.fillText(
		    numLabel
		  , xOffset + 0.5 * w
		  , yOffset + 0.5 * (options.height - options.margin - yOffset) + 0.6*options.font_size_number
		  )
	  }

    xOffset += w
	})
}

function showChordDiagramBlock() {
	var options = {}
	options.margin = 6 * settings.width/1000
	options.font_size = 56 * settings.width/1000
	options.width = settings.width
	options.height = settings.width
  options.font_weight = 500
  options.font_family = settings.font_family
	options.background_color = settings.block_background_color
	options.background_opacity = settings.block_background_opacity
	options.text_color = settings.text_color
	options.title = 'Connections'

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
	
  // Sort modalities
	var modalities = d3.values(settings.node_clusters.modalities)
  if (options.alphabetical_order) {
  	modalities.sort(function(a,b){
  		if (a.label<b.label) {
  			return -1
  		} else return 1
  	})
  }

  // Title
  ctx.lineWidth = 0
  ctx.font = options.font_weight + " " + options.font_size+"px "+options.font_family
  ctx.fillStyle = options.text_color
  ctx.fillText(
    options.title
  , options.margin
  , options.margin + 1.05 * options.font_size
  )
  var yOffset = options.margin * 2 + 1.05 * options.font_size

  // "Others" modality
  var represented_nodes = d3.sum(modalities, function(m){
		return m.count
	})
	if (represented_nodes < g.order) {
		modalities.push({
			"label": false,
      "count": g.order-represented_nodes,
      "color": settings.node_clusters.default_color
		})
	}

  // Build connections matrix
  var idToMod = {}
  var modToId = {}
  var matrix = []
  modalities.forEach(function(mod,i){
  	var m = mod.label
  	idToMod[i] = m
  	modToId[m] = i
  	matrix[i] = []
  })
  matrix.forEach(function(row){
	  modalities.forEach(function(m,i){
	  	row[i] = 0
	  })  	
  })
  g.edges().forEach(function(eid){
  	var sid = g.source(eid)
  	var tid = g.target(eid)
  	var smod = settings.node_clusters.modalities[g.getNodeAttribute(sid, settings.node_clusters.attribute_id)]
  	var tmod = settings.node_clusters.modalities[g.getNodeAttribute(tid, settings.node_clusters.attribute_id)]
  	if (smod) {
  		smod = smod.label
  	} else {
  		smod = false
  	}
  	if (tmod) {
  		tmod = tmod.label
  	} else {
  		tmod = false
  	}
  	matrix[modToId[smod]][modToId[tmod]]++
  })

  console.log(matrix)
}

// Helpers
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}