/* Controlador para formulario de iniciativas*/

civicsApp.controller("FormularioIniciativasController", ['$scope', '$http', 'leafletData', '$location', 'ciudadesService', 'menusService', function($scope, $http, $leafletData, $location, ciudadesService, menusService) {
    
    angular.extend($scope, {
        world: {
            lat: 3.1354,
            lng: -50.0977,
            zoom: 2
        },
        defaults:{
            scrollWheelZoom: false
        },
        centeringCity: "Madrid"
    });       
       //Carga CIUDADES dadas de alta en el sistema


    //Carga CIUDADES dadas de alta en el sistema
        var self=this;
        self.ciudadesList = function(){
            return ciudadesService.list();
        };
        self.lflt = function(){
            return ciudadesService.lflt();
        };
    //Carga categorías
        self.categList = function(){
            return menusService.categList();
        }
}]);

