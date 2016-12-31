//Define an angular module for our app
var civicsApp = angular.module('civicsApp', [
    'ui-leaflet',
    'angular.filter',
    'ngRoute'
    ])

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    
    //$locationProvider.html5Mode(true);
   
    //Optional
    //$locationProvider.hashPrefix('!');
   
    $routeProvider.
      when('/', {
        templateUrl: '/html/home.html',
        controller: 'GlobalController'       
      }).      
      when('/iniciativas/:ciudad', {
        templateUrl: 'html/iniciativas.html',
        controller: 'IniciativasMapController'      
      }).
      when('/agenda/:ciudad', {
        templateUrl: '/html/agenda.html'
      }).
      when('/formulario/iniciativas/:ciudad', {        
        templateUrl: '/html/iniciativas-form.html',
        controllerAs: 'forminicntrl'        
      }).
      when('/formulario/agenda/:ciudad', {        
        templateUrl: '/html/agenda-form.html'
      }).
      otherwise({
        redirectTo: '/'
      });

}]);

