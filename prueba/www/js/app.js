// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('HomeCtrl', function($scope, $state) {
        $scope.data = {
            search: ''
        }

        $scope.buscar = function() {
            $state.go('listado', {
                q: $scope.data.search
            })
        }
    })
    .controller('SearchCtrl', function($scope, $stateParams, $http, $state) {
        var search = $stateParams.q;
        $scope.data = {
            listado: []
        }

        var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + search;

        $http.get(url).then(function(response) {
            $scope.data.listado = response.data.results;
            console.log($scope.data.listado)
        })

        $scope.detalle = function(id) {
            $state.go('detail', {
                productId: id
            });
        }

    })

.controller('DetailCtrl', function($scope, $stateParams, $http, $state, $ionicActionSheet,$ionicLoading) {
    $scope.data = {
        detalle: {}
    }
    var id = $stateParams.productId;
    var url = 'https://api.mercadolibre.com/items/' + id;

    $ionicLoading.show({
      template: 'Loading...'
    });


    $http.get(url).then(function(respuesta) {
        $scope.data.detalle = respuesta.data;
        $ionicLoading.hide();
    })

    $scope.mostrarOpciones = function() {
        $ionicActionSheet.show({
            buttons: [{
                text: '<b>Share</b> This'
            }, {
                text: 'Move'
            }],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                console.log(index)
                return true;
            }
        });
    }
})



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state('listado', {
        url: '/search?q',
        templateUrl: 'templates/listado.html',
        controller: 'SearchCtrl'
    });

    $stateProvider.state('detail', {
        url: '/detalle?productId',
        templateUrl: 'templates/detalle.html',
        controller: 'DetailCtrl'
    })

    $urlRouterProvider.otherwise('/');
})