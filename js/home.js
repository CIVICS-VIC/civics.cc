// Controlador  para variables globales

civicsApp.controller("GlobalController", ['$scope', '$http', 'menusService', 'logosService',function($scope, $http, menusService, logosService){


/* iniciar el mapa */

    $scope.activeMap="act";

    
//elegir ciudad a mostrar
    $scope.setSelected = function(prop){$scope.selectedprop = prop; };    
    $scope.setSelectedCity = function(prop){
        this.selectedcity = prop.properties.city;
        this.world = prop.geometry.coordinates;
        $scope.unsetInfoLeyenda();
        console.log('Ciudad escogida: '+ this.selectedcity);
        console.log('Ciudad escogida: '+ prop.geometry.coordinates);
       // $scope.centeringCity = prop.properties.city.geometry.coordinates;
    };

//Desplegables de información

    $scope.setActiveLeyenda = function() {
        if (this.activeLeyenda !=="act") {
            this.activeLeyenda = "act";
            this.activeInfo ="inact";
        } else {
            this.activeLeyenda ="inact";
        }
    };
    $scope.setActiveInfo = function() {
        if (this.activeInfo !=="act") {
            this.activeInfo = "act";
            this.activeLeyenda ="inact";
        } else {
            this.activeInfo ="inact";
        }
    };
    $scope.unsetInfoLeyenda = function(){
        $scope.activeLeyenda="inact";
        $scope.activeInfo="inact";
    }


// Toma los datos de las categorías llamando al servicio
   
    var self=this;
        self.categList = function(){            
            return menusService.categList();
        };
    $scope.categ= self.categList();

//Asigna simbología a la leyenda

    //********Asigna peluca


    $scope.asignaColor = function(tema){
        var i; 
        for (i=0; i< $scope.categ.length; i++){
            if (tema == $scope.categ[i].label){
                return $scope.categ[i].iconColor;
            }           
        }
    };

    $scope.asignaPeluca = function(agente){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (agente == $scope.categ[i].label){                
                return $scope.categ[i].icon;
            }                
        }
    };

    $scope.asignaIcono = function(espacio){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (espacio == $scope.categ[i].label){                
                return $scope.categ[i].icon;
            }                
        }
    };

    $scope.asignaIconoAct = function(actividad){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (actividad == $scope.categ[i].label){                
                return $scope.categ[i].icon;
            }                
        }
    };

//carga las fotos de los logos de los patrocinadores

    self.patrocinList = function(){
        return logosService.patrocinList()
    }

}]);

// Controlador para listado de Iniciativas seleccionadas

civicsApp.controller("iniciativasCuradasController", ['$scope', '$http', 'ciudadesService',
    function($scope, $http, ciudadesService){
        var curated_query = "SELECT * FROM iniciativas_copy_copy WHERE curated=true";
       
        $http.get("https://mappemad.cartodb.com/api/v2/sql?format=GeoJSON&q="+curated_query).success(function(data, status) {

        var curatedini = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.name);
                }
            });
            angular.extend($scope, {
                curatedini: {
                    data:data.features
                }
            });                      
        });
        
    }]);



//Controlador para menú home

civicsApp.controller("MenuHomeController", ['$scope','ciudadesService',
    function($scope, ciudadesService){
    //Carga CIUDADES dadas de alta en el sistema
        var self=this;
        self.list = function(){
            return ciudadesService.list();
        };
        self.lflt = function(){
            return ciudadesService.lflt();
        };
    }]);

//controlador para el mapa de home

civicsApp.controller("MapController", ['ciudadesService', 'leafletMarkerEvents', '$scope', '$http', 'leafletData',
    function(ciudadesService,  leafletMarkerEvents, $scope, $http, leafletData){        
    
    angular.extend($scope, {
        world: {
        lat: 3.1354,
        lng: -50.0977,
        zoom: 3
        },
        defaults:{
            scrollWheelZoom: false
        },
        centeringCity: "world",            

    });
    $scope.events = {
        markers: {
            enable: leafletMarkerEvents.getAvailableEvents(),
        }
    };
    var self=this;
    self.lflt = function(){
        return ciudadesService.lflt();
    };
        
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors - '+'<a href="http://opendatacommons.org/licenses/odbl/">ODbl</a>, '+'Imagery © <a href="http://mapbox.com">Mapbox</a>'+' Powered by <a href="http://overpass-api.de/">overpass-api.de</a>';
    $scope.definedLayers = {
        civics: {
            name: 'civics',
            url: 'https://api.mapbox.com/styles/v1/civics/cir1q2kud001icmm9tmh4s9lt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2l2aWNzIiwiYSI6ImNpcXpmZ2toZTAwNmFpOG1nc2swdG5kZ28ifQ.P6-IjrcLcdnPqQvkn0GWKQ',
            type: 'xyz',
            layerOptions: {
                showOnSelector: false
            }
        },
        osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz',
            layerOptions: {
                showOnSelector: false
            }
        }
    };
    angular.extend($scope, {
        layers: {
            baselayers: {
                civics: $scope.definedLayers.civics,
                osm: $scope.definedLayers.osm
            },
            overlays: {
                ciudades: {
                    name: "ciudades",
                    type: "group",
                    visible: true
                }
            }
        }
    });
    $scope.toggleLayer = function() {
        var baselayers = $scope.layers.baselayers;
        if (baselayers.hasOwnProperty('civics')) {
            delete baselayers['civics'];
            baselayers['osm'] = $scope.definedLayers['osm'];
        } else {
            delete baselayers['osm'];
            baselayers['civics'] = $scope.definedLayers['civics'];
        }
    };

    var addressPointsToMarkers = function(points) {
        console.log(points[1]);
        return points.map(function(ap) {
            return {
                layer: 'ciudades',
                title: ap.properties.label,
                name: ap.properties.label,
                lat: ap.geometry.coordinates[1],
                lng: ap.geometry.coordinates[0],
                label: {
                    message: ap.properties.label + '<br />' +ap.properties.country + '<br />' +ap.properties.initiatives + ' iniciativas'
                },               
                icon: {
                    type: 'div',
                    iconSize: [0, 0],
                    iconAnchor: [0,10],
                    background: '#333',
                    popupAnchor:  [0, 0],                    
                    html: "<div class='iconciudad'><a href='/#/iniciativas/"+ ap.properties.label  +"'><i class='icon-agent-sin'></i></a></div>"
                },
            };
        });
    };
    $http.get("/json/ciudades.geojson").success(function(data, status) {
        $scope.markers = addressPointsToMarkers(data.features);           
    });           
}]);
