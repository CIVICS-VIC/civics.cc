//Define an angular module for our app

//Carga datos de ciudades

civicsApp.factory('ciudadesService', ['$http', 'leafletData', function($http, leafletData){
    //Carga CIUDADES dadas de alta en el sistema
    var Ciud= [];
    var geojson = [];
    $http.get("/json/ciudades.geojson").success(function(data, status) {
        console.log('ciudades cargadas');

        Ciud = data.features;       
        geojson.data = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                
            }
        });           
    });   
    return {
        list: function() {            
            return Ciud;
        },
        lflt: function() {
            return geojson;
        }
    } 
}]);

//Carga datos de Iniciativas
civicsApp.factory('iniciativasService', ['$http', 'leafletData', function($http, leafletData){
    //Carga INICIATIVAS dadas de alta en el sistema       
    return {        
        list: function(city) {
            console.log('ciudad seleccionadaaaaa: '+city);
            $http.get("/data/iniciativas/filter?city="+city).success(function(data, status) { 
                var geojsoniniciativas = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.name);
                    }
                });
           
            return geojsoniniciativas;

            }); 
                             
        }
    } 
}]);


// Carga datos de menús (topics, spaces, agents, acts)

civicsApp.factory('menusService', ['$http', function($http, leafletData){
    //Carga CIUDADES dadas de alta en el sistema
    var categ= [];
    $http.get("/json/categ.json").success(function(data, status) {
        categ = data;           
    });
    return {
        categList: function(){
            return categ;
        }
    } 
}]);

// Carga logos de patrocinadores

civicsApp.factory('logosService', ['$http', function($http, leafletData){
    //Carga CIUDADES dadas de alta en el sistema
    var logos= [];
    $http.get("/json/patrocinadores.json").success(function(data, status) {
        logos = data;           
    });
    return {
        patrocinList: function(){
            return logos;
        }
    } 
}]);


