// PREPARE
//
//  Provides info about all node attributes and their modalities,
//  and outputs editable color palette settings,
//  to be used in other scripts.

//   .d8888b.           888    888    d8b                            
//  d88P  Y88b          888    888    Y8P                            
//  Y88b.               888    888                                   
//   "Y888b.    .d88b.  888888 888888 888 88888b.   .d88b.  .d8888b  
//      "Y88b. d8P  Y8b 888    888    888 888 "88b d88P"88b 88K      
//        "888 88888888 888    888    888 888  888 888  888 "Y8888b. 
//  Y88b  d88P Y8b.     Y88b.  Y88b.  888 888  888 Y88b 888      X88 
//   "Y8888P"   "Y8888   "Y888  "Y888 888 888  888  "Y88888  88888P' 
//                                                    888          
//                                               Y8b d88P          
//                                                "Y88P"           
/// EDIT SETTINGS BELOW

var settings = {}

// Modalities the less represented will be omitted
// Note: "Infinity" is a valid number here
settings.maximum_modalities = 10

// Backscatter palette
// You will be able to modify colors afterwards
// Note: the order matters:
//       - from biggest to smallest cluster
//       - the last color is the default for small/other clusters

settings.default_palette = [
  "#6BDEB6", // MINT GREEN
  "#5B5FFF", // INDIGO BLUE
  "#F8686D", // RED
  "#AAAEFB", // VIOLET
  "#FEBBCF", // PINK
  "#A067D4", // PURPLE
  "#FAEC7E", // YELLOW
  "#3C9E8A", // GREEN
  "#FC8550", // ORANGE
  "#9F9F9F", // GREY
  "#C6C5C7"  // LIGHT GREY
]

/// END OF SETTINGS






//  
//  888b     d888                   888      d8b                                    
//  8888b   d8888                   888      Y8P                                    
//  88888b.d88888                   888                                             
//  888Y88888P888  8888b.   .d8888b 88888b.  888 88888b.   .d88b.  888d888 888  888 
//  888 Y888P 888     "88b d88P"    888 "88b 888 888 "88b d8P  Y8b 888P"   888  888 
//  888  Y8P  888 .d888888 888      888  888 888 888  888 88888888 888     888  888 
//  888   "   888 888  888 Y88b.    888  888 888 888  888 Y8b.     888     Y88b 888 
//  888       888 "Y888888  "Y8888P 888  888 888 888  888  "Y8888  888      "Y88888 
//                                                                              888 
//                                                                         Y8b d88P 
//                                                                          "Y88P"  
/// Script
// Get a list of nodes attributes
var nAttributes = {}
var attr
g.nodes().forEach(function(nid){
  var n = g.getNodeAttributes(nid)
  for (attr in n) {
    if (nAttributes[attr] === undefined) {
      nAttributes[attr] = {
        nodesCount: 1
      }
    } else {
      nAttributes[attr].nodesCount++
    }
  }
})

// Look at the modalities
for (attr in nAttributes) {
  var attData = nAttributes[attr]
  attData.types = {}
  g.nodes().forEach(function(nid){
    var t = getType(g.getNodeAttribute(nid, attr))
    attData.types[t] = (attData.types[t] || 0) + 1
  })
}

// Guess type of the attributes
for (attr in nAttributes) {
  var types = nAttributes[attr].types
  if (types.string !== undefined) {
    nAttributes[attr].type = 'string'
  } else if (types.float !== undefined) {
    nAttributes[attr].type = 'float'
  } else if (types.integer !== undefined) {
    nAttributes[attr].type = 'integer'
  } else {
    nAttributes[attr].type = 'error'
  }
}

// Aggregate distribution of values
for (attr in nAttributes) {
  nAttributes[attr].values = {}
}
g.nodes().forEach(function(nid){
  var n = g.getNodeAttributes(nid)
  for (attr in nAttributes) {
    nAttributes[attr].values[n[attr]] = (nAttributes[attr].values[n[attr]] || 0) + 1
  }
})
for (attr in nAttributes) {
  var stats = {}
  var valuesArray = d3.values(nAttributes[attr].values)
  stats.differentValues = valuesArray.length
  stats.sizeOfSmallestValue = d3.min(valuesArray)
  stats.sizeOfBiggestValue = d3.max(valuesArray)
  stats.medianSize = d3.median(valuesArray)
  stats.deviation = d3.deviation(valuesArray)
  stats.valuesUnitary = valuesArray.filter(function(d){return d==1}).length
  stats.valuesAbove1Percent = valuesArray.filter(function(d){return d>=g.order*0.01}).length
  stats.valuesAbove10Percent = valuesArray.filter(function(d){return d>=g.order*0.1}).length
  nAttributes[attr].valuesStats = stats
}

console.log('Node attributes', nAttributes)

// Get a list of edges attributes
var eAttributes = {}
g.edges().forEach(function(eid){
  var e = g.getEdgeAttributes(eid)
  for (attr in e) {
    if (eAttributes[attr] === undefined) {
      eAttributes[attr] = {
        edgesCount: 1
      }
    } else {
      eAttributes[attr].edgesCount++
    }
  }
})

// Look at the types of values
for (attr in eAttributes) {
  var attData = eAttributes[attr]
  attData.types = {}
  g.edges().forEach(function(eid){
    var t = getType(g.getEdgeAttribute(eid, attr))
    attData.types[t] = (attData.types[t] || 0) + 1
  })
}

// Guess type of the attributes
for (attr in eAttributes) {
  var types = eAttributes[attr].types
  if (types.string !== undefined) {
    eAttributes[attr].type = 'string'
  } else if (types.float !== undefined) {
    eAttributes[attr].type = 'float'
  } else if (types.integer !== undefined) {
    eAttributes[attr].type = 'integer'
  } else {
    eAttributes[attr].type = 'error'
  }
}

// Aggregate distribution of values
for (attr in eAttributes) {
  eAttributes[attr].values = {}
}
g.edges().forEach(function(eid){
  var e = g.getEdgeAttributes(eid)
  for (attr in eAttributes) {
    eAttributes[attr].values[e[attr]] = (eAttributes[attr].values[e[attr]] || 0) + 1
  }
})
for (attr in eAttributes) {
  var stats = {}
  var valuesArray = d3.values(eAttributes[attr].values)
  stats.differentValues = valuesArray.length
  stats.sizeOfSmallestValue = d3.min(valuesArray)
  stats.sizeOfBiggestValue = d3.max(valuesArray)
  stats.medianSize = d3.median(valuesArray)
  stats.deviation = d3.deviation(valuesArray)
  stats.valuesUnitary = valuesArray.filter(function(d){return d==1}).length
  stats.valuesAbove1Percent = valuesArray.filter(function(d){return d>=g.size*0.01}).length
  stats.valuesAbove10Percent = valuesArray.filter(function(d){return d>=g.size*0.1}).length
  eAttributes[attr].valuesStats = stats
}

console.log('Edge attributes', eAttributes)

// Write the compte-rendu
document.querySelector('#playground').innerHTML = '<md-content id="content" style="padding: 12px;"></md-content>'
var content = document.querySelector('#content')

var h1 = document.createElement("h1")
h1.textContent = '' + d3.keys(nAttributes).length + ' NODE ATTRIBUTES'
content.append(h1)

var pre, h5
for (attr in nAttributes) {
  var h3 = document.createElement("h3")
  h3.textContent = attr
  content.append(h3)

  pre = document.createElement("pre")
  content.append(pre)

  // Node attribute
  pre.textContent += 'Attribute ID: ' + attr
  var attData = nAttributes[attr]

  // Missing values
  if (attData.nodesCount != g.order) {
    pre.textContent += '\nOnly ' + attData.nodesCount + '/' + g.order + ' nodes have this attribute. ('
      + Math.round(100*attData.nodesCount/g.order) + '%, '
      + (g.order-attData.nodesCount) + ' missing values)'
  }

  // Type
  pre.textContent += '\nType: ' + attData.type
  switch (attData.type) {
    case 'string':
      pre.textContent += ' (text)'
      break
    case 'integer':
      pre.textContent += ' (1, 2, 3...)'
      break
    case 'float':
      pre.textContent += ' (any number)'
      break
  }
  if (d3.keys(attData.types).length > 1) {
    var textarray = []
    var t
    for (t in attData.types) {
      textarray.push(attData.types[t] + ' nodes recognized as ' + t)
    }
    pre.textContent += '\nNote: ' + textarray.join(', ') + '.'
  }

  // Values summary
  h5 = document.createElement("h5")
  h5.textContent = 'Values summary'
  content.append(h5)
  
  pre = document.createElement("pre")
  content.append(pre)
  
  if (attData.valuesStats.differentValues == 1) {
    pre.textContent += 'All nodes have the same ' + attr + '. '
  } else if (attData.valuesStats.differentValues == g.order) {
    pre.textContent += 'Every single node has a different ' + attr + '. '
  } else if (attData.valuesStats.differentValues > 0.9 * g.order) {
    pre.textContent += 'Nodes take ' + attData.valuesStats.differentValues + ' different values for this attribute. '
    pre.textContent += '\nIn other terms, almost every node (' + percent(attData.valuesStats.differentValues/g.order) + ') has a different ' + attr + '. '
    pre.textContent += '\nThe biggest group of nodes with the shame value has ' + attData.valuesStats.sizeOfBiggestValue + ' nodes. '
    pre.textContent += '\n' + attData.valuesStats.valuesUnitary + ' nodes have a specific (non shared) value. '
  } else {
    pre.textContent += 'Nodes take ' + attData.valuesStats.differentValues + ' different values for this attribute. '
    pre.textContent += '\nThe biggest group with the same value has ' + attData.valuesStats.sizeOfBiggestValue + ' nodes (' + percent(attData.valuesStats.sizeOfBiggestValue/g.order) + '). '
    pre.textContent += '\nThe smallest group has ' + attData.valuesStats.sizeOfSmallestValue + ' nodes. '
    pre.textContent += '\n' + attData.valuesStats.valuesUnitary + ' nodes have a specific (non shared) value. '
  }

  // Values
  if (attData.valuesStats.differentValues <= 10) {
    h5 = document.createElement("h5")
    h5.textContent = 'Values'
    content.append(h5)
    
    pre = document.createElement("pre")
    content.append(pre)

    pre.textContent += d3.keys(attData.values)
        .sort(function(a, b){ return attData.values[b] - attData.values[a] })
        .map(function(v){
          return '- ' + v + ': ' + attData.values[v] + ' nodes'
        })
        .join('\n')
  } else if (attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary >= 1 && attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary <= 10) {
    h5 = document.createElement("h5")
    h5.textContent = 'Values taken by more than one node'
    content.append(h5)
    
    pre = document.createElement("pre")
    content.append(pre)

    pre.textContent += d3.keys(attData.values)
        .sort(function(a, b){ return attData.values[b] - attData.values[a] })
        .filter(function(v, i){
          return attData.values[v] > 1
        })
        .map(function(v){
          return '- ' + v + ': ' + attData.values[v] + ' nodes'
        })
        .join('\n')
  } else if (attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary > 10) {
    h5 = document.createElement("h5")
    h5.textContent = 'Values taken by the most nodes (top 10)'
    content.append(h5)
    
    pre = document.createElement("pre")
    content.append(pre)

    pre.textContent += d3.keys(attData.values)
        .sort(function(a, b){ return attData.values[b] - attData.values[a] })
        .filter(function(v, i){
          return attData.values[v] > 1 && i < 10
        })
        .map(function(v){
          return '- ' + v + ': ' + attData.values[v] + ' nodes'
        })
        .join('\n')
  }

  // Color settings bundle
  h5 = document.createElement("h5")
  h5.textContent = 'Color settings bundle (COPY-PASTABLE JSON)'
  content.append(h5)
  
  var ta = document.createElement("textarea")
  ta.cols = "30"
  ta.rows = "10"
  ta.style.minHeight = "150px"
  ta.style.fontFamily = "monospace"
  content.append(ta)

  ta.textContent += 'settings.node_clusters = '
  if (attData.valuesStats.differentValues < settings.maximum_modalities) {
    var obj = {}
    obj.attribute_id = attr
    obj.modalities = {}
    d3.keys(attData.values)
      .sort(function(a, b){ return attData.values[b] - attData.values[a] })
      .forEach(function(v,i){
        obj.modalities[v] = {
          label: v,
          count: attData.values[v],
          color: settings.default_palette[i] || settings.default_palette[settings.default_palette.length-1]
        }
      })
    obj.default_color = settings.default_palette[settings.default_palette.length-1]
    ta.textContent += JSON.stringify(obj, null, 2)
  } else if (attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary >= 1 && attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary <= settings.maximum_modalities) {
    var obj = {}
    obj.attribute_id = attr
    obj.modalities = {}
    d3.keys(attData.values)
      .sort(function(a, b){ return attData.values[b] - attData.values[a] })
      .filter(function(v, i){
        return attData.values[v] > 1
      })
      .forEach(function(v,i){
        obj.modalities[v] = {
          label: v,
          count: attData.values[v],
          color: settings.default_palette[i] || settings.default_palette[settings.default_palette.length-1]
        }
      })
    obj.default_color = settings.default_palette[settings.default_palette.length-1]
    ta.textContent += JSON.stringify(obj, null, 2)
  } else if (attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary > settings.maximum_modalities) {
    var obj = {}
    obj.attribute_id = attr
    obj.modalities = {}
    d3.keys(attData.values)
      .sort(function(a, b){ return attData.values[b] - attData.values[a] })
      .filter(function(v, i){
        return attData.values[v] > 1 && i < settings.maximum_modalities
      })
      .forEach(function(v,i){
        obj.modalities[v] = {
          label: v,
          count: attData.values[v],
          color: settings.default_palette[i] || settings.default_palette[settings.default_palette.length-1]
        }
      })
    obj.default_color = settings.default_palette[settings.default_palette.length-1]
    ta.textContent += JSON.stringify(obj, null, 2)
  } else {
    var obj = {}
    obj.attribute_id = attr
    obj.modalities = {}
    obj.default_color = settings.default_palette[settings.default_palette.length-1]
    ta.textContent += JSON.stringify(obj, null, 2)
  }
}

h1 = document.createElement("h1")
h1.textContent = '' + d3.keys(eAttributes).length + ' EDGE ATTRIBUTES'
content.append(h1)

var pre, h5
for (attr in eAttributes) {
  var h3 = document.createElement("h3")
  h3.textContent = attr
  content.append(h3)

  pre = document.createElement("pre")
  content.append(pre)

  // Edge attribute
  pre.textContent += 'Attribute ID: ' + attr
  var attData = eAttributes[attr]

  // Missing values
  if (attData.edgesCount != g.size) {
    pre.textContent += '\nOnly ' + attData.edgesCount + '/' + g.size + ' edges have this attribute. ('
      + Math.round(100*attData.edgesCount/g.size) + '%, '
      + (g.size-attData.edgesCount) + ' missing values)'
  }

  // Type
  pre.textContent += '\nType: ' + attData.type
  switch (attData.type) {
    case 'string':
      pre.textContent += ' (text)'
      break
    case 'integer':
      pre.textContent += ' (1, 2, 3...)'
      break
    case 'float':
      pre.textContent += ' (any number)'
      break
  }
  if (d3.keys(attData.types).length > 1) {
    var textarray = []
    var t
    for (t in attData.types) {
      textarray.push(attData.types[t] + ' edges recognized as ' + t)
    }
    pre.textContent += '\nNote: ' + textarray.join(', ') + '.'
  }

  // Values summary
  h5 = document.createElement("h5")
  h5.textContent = 'Values summary'
  content.append(h5)
  
  pre = document.createElement("pre")
  content.append(pre)
  
  if (attData.valuesStats.differentValues == 1) {
    pre.textContent += 'All edges have the same ' + attr + '. '
  } else if (attData.valuesStats.differentValues == g.size) {
    pre.textContent += 'Every single edge has a different ' + attr + '. '
  } else if (attData.valuesStats.differentValues > 0.9 * g.size) {
    pre.textContent += 'Edges take ' + attData.valuesStats.differentValues + ' different values for this attribute. '
    pre.textContent += '\nIn other terms, almost every edge (' + percent(attData.valuesStats.differentValues/g.size) + ') has a different ' + attr + '. '
    pre.textContent += '\nThe biggest group of edges with the shame value has ' + attData.valuesStats.sizeOfBiggestValue + ' edges. '
    pre.textContent += '\n' + attData.valuesStats.valuesUnitary + ' edges have a specific (non shared) value. '
  } else {
    pre.textContent += 'Edges take ' + attData.valuesStats.differentValues + ' different values for this attribute. '
    pre.textContent += '\nThe biggest group with the same value has ' + attData.valuesStats.sizeOfBiggestValue + ' edges (' + percent(attData.valuesStats.sizeOfBiggestValue/g.size) + '). '
    pre.textContent += '\nThe smallest group has ' + attData.valuesStats.sizeOfSmallestValue + ' edges. '
    pre.textContent += '\n' + attData.valuesStats.valuesUnitary + ' edges have a specific (non shared) value. '
  }

  // Values
  if (attData.valuesStats.differentValues <= 10) {
    h5 = document.createElement("h5")
    h5.textContent = 'Values'
    content.append(h5)
    
    pre = document.createElement("pre")
    content.append(pre)

    pre.textContent += d3.keys(attData.values)
        .sort(function(a, b){ return attData.values[b] - attData.values[a] })
        .map(function(v){
          return '- ' + v + ': ' + attData.values[v] + ' edges'
        })
        .join('\n')
  } else if (attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary >= 1 && attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary <= 10) {
    h5 = document.createElement("h5")
    h5.textContent = 'Values taken by more than one edge'
    content.append(h5)
    
    pre = document.createElement("pre")
    content.append(pre)
    
    pre.textContent += d3.keys(attData.values)
        .sort(function(a, b){ return attData.values[b] - attData.values[a] })
        .filter(function(v, i){
          return attData.values[v] > 1
        })
        .map(function(v){
          return '- ' + v + ': ' + attData.values[v] + ' edges'
        })
        .join('\n')
  } else if (attData.valuesStats.differentValues - attData.valuesStats.valuesUnitary > 10) {
    h5 = document.createElement("h5")
    h5.textContent = 'Values taken by the most edges (top 10)'
    content.append(h5)
    
    pre = document.createElement("pre")
    content.append(pre)

    pre.textContent += d3.keys(attData.values)
        .sort(function(a, b){ return attData.values[b] - attData.values[a] })
        .filter(function(v, i){
          return attData.values[v] > 1 && i < 10
        })
        .map(function(v){
          return '- ' + v + ': ' + attData.values[v] + ' edges'
        })
        .join('\n')
  }
}


// ---
// Functions

function getType(str){
  // Adapted from http://stackoverflow.com/questions/16775547/javascript-guess-data-type-from-string
  if(str === undefined) str = 'undefined';
  if (typeof str !== 'string') str = str.toString();
  var nan = isNaN(Number(str));
  var isfloat = /^\d*(\.|,)\d*$/;
  var commaFloat = /^(\d{0,3}(,)?)+\.\d*$/;
  var dotFloat = /^(\d{0,3}(\.)?)+,\d*$/;
  if (!nan){
      if (parseFloat(str) === parseInt(str)) return "integer";
      else return "float";
  }
  else if (isfloat.test(str) || commaFloat.test(str) || dotFloat.test(str)) return "float";
  else return "string";
}

function percent(d) {
  return Math.round(100 * d) + '%'
}