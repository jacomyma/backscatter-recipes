'use strict';

var isNumeric = require('../utils.js').isNumeric;

angular.module('graphrecipes.view_board', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/board', {
    templateUrl: 'view_board/board.html',
    controller: 'BoardCtrl'
  });
}])

.controller('BoardCtrl', ['$scope', '$timeout',  'store', '$location', 'recipesList', '$http'
  ,function(               $scope ,  $timeout ,   store ,  $location,   recipesList ,  $http) {

  var gexf = graphology.library.gexf;

  // Scope variables
  $scope.filename
  $scope.originalGraph
  $scope.nodesCount
  $scope.edgesCount
  $scope.recipes = recipesList
  $scope.recipe = undefined
  $scope.status = 'list' // list | edit | run | end

  // Scope functions
  $scope.refreshGraph = function () {
    window.g = $scope.originalGraph
    if (window.g) {
      var format = d3.format(',')

      $scope.nodesCount = format(g.order)
      $scope.edgesCount = format(g.size)

      $scope.description = g.multi ? 'Multi ' : 'Simple '
      $scope.description += g.type + ' graph'
    } else {
      $timeout(function(){
        $location.url('/upload')
      }, 0)
    }
  }

  $scope.downloadOutput = function () {
    var xml = gexf.write(g);

    var blob = new Blob([xml], {'type':'text/gexf+xml;charset=utf-8'});
    saveAs(blob, store.get('graphname') + " via Graph Recipes.gexf");
  }

  $scope.$watch('panelTab', function(_new,_old) {
    if (_new == 0 && _old !=0) {
      $scope.closeRecipe()
    }
  })

  $scope.pickRecipe = function(r) {
    $scope.recipe = r
    $scope.status = 'edit'
    $scope.remindRecipe = false
    $scope.panelTab = 1
  }

   $scope.backToRecipe = function() {
    $scope.status = 'edit'
    $scope.remindRecipe = true
    $scope.panelTab = 1
  }

  $scope.closeRecipe = function() {
    $scope.recipe = undefined
    $scope.status = 'list'
    $scope.panelTab = 0
  }

  $scope.executeScript = function() {
    $scope.status = 'run'
    $scope.panelTab = 2
    $timeout(function(){
      document.querySelector('#playground').innerHTML = '<div style="padding:12px">⌛ Please wait...</div>'
      $timeout(function(){
        var code = window.editor.getValue()
        try {
          eval(';(function(){'+code+'})();')
          $scope.status = 'end'
        } catch(e) {
          console.error('[Script error]', e)
          $timeout(function(){
            alert('Oops :(\nThere is an issue with this script:\n\n' + e)
            $scope.backToRecipe()
          })
        }
      }, 1000)
      })
  }

  // Init
  $scope.filename = store.get('graphname')
  $scope.originalGraph = store.get('graph')
  $scope.refreshGraph()

  // Processing

}]);
