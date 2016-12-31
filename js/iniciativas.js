//Controlador para las iniciativas

civicsApp.controller("IniciativasMapController", ['$scope', '$filter', '$http', 'leafletData', 'leafletMarkerEvents','leafletLogger', "$window",'$location', 'ciudadesService', 'menusService', 'iniciativasService', 'myObjectFilter', function($scope, $filter , $http, leafletData, leafletMarkerEvents, leafletLogger, $window, $location, ciudadesService, menusService, iniciativasService, myObjectFilter) {

//Carga INICIATIVAS dadas de alta en sistema

    var justpath = $location.path();
    var ciudadseleccionada = justpath.split('/')[2];
    $scope.setSelectedCity = ciudadseleccionada;
    ciudadseleccionada.replace("%20"," ");
    console.log(ciudadseleccionada);
    
   //Carga CIUDADES dadas de alta en el sistema para asignar coordenadas de centro de mapa
    var self=this;
    self.citylist = function(){
    return ciudadesService.list();
        };
        
    /*
        self.inilist = function(city){
            return iniciativasService.list(city);
        };
        var inis= self.inilist(ciudadseleccionada);
        console.log(inis);

    */
    var Ciud = self.citylist();
    console.log(Ciud)
    $scope.world=[];   
    var i;
    for (i=0; i< Ciud.length; i++){
        console.log('Buscando coordenadas');
        if ($scope.setSelectedCity == Ciud[i].properties.label){
            console.log('Match!!');
            $scope.world.lat= Ciud[i].geometry.coordinates[1];
            $scope.world.lng= Ciud[i].geometry.coordinates[0];
            $scope.world.zoom= Ciud[i].properties.zoom;
            break;
        }                                             
    }                
        

    

    //var iniciativasciudad= iniciativasService.list(ciudadseleccionada);
    /*
    angular.extend($scope, {
        geojsonIniciativas: {
            data: iniciativasciudad,
            message: "I'm a draggable marker"
            }
        });
    console.log('intento: '+iniciativasciudad);
*/

    $scope.definedLayers = {
        civics: {
            name: 'civics',
            url: 'https://api.mapbox.com/styles/v1/civics/cir1q2kud001icmm9tmh4s9lt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2l2aWNzIiwiYSI6ImNpcXpmZ2toZTAwNmFpOG1nc2swdG5kZ28ifQ.P6-IjrcLcdnPqQvkn0GWKQ',
            type: 'xyz'           
        },
        osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'            
        }
    };
    angular.extend($scope, {                
        layers: {
            baselayers: {
                civics: $scope.definedLayers.civics,
                osm: $scope.definedLayers.osm
            },                
            overlays: {
                iniciativas: {
                    name: "iniciativas",
                    type: "group",
                    visible: true
                },
            }
        },
        events: {
            markers:{
                enable:['click'],
                logic: 'emit'
            }
        }
    });

    angular.extend($scope, {
        filterbyMarker: function(){
            console.log('fireme');
            $scope.filteredMarkers = $filter('markerfilter')($scope.markers, $scope.filterTerm);
        }
    });

    angular.extend($scope, {
        filteredMarkers: angular.copy($scope.markers)
    });

    //Alterna mapa base
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
    

/*
        angular.extend($scope.controls, {
            search: {
                layer: $scope.layers.overlays.iniciativas
            }
        });
*/  

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
/*
    leafletData.getDirectiveControls().then(function (controls) {
     controls.markers.create({} ,$scope.markers);
     var markers = $scope.redMarkers;
     controls.markers.create(markers ,$scope.markers);
     $scope.markers = markers;
});
*/
    $scope.moon={};
    var addressPointsToMarkers = function(points) {
        return points.map(function(ap) {
            return {
                layer: 'iniciativas',
                //group: 'world',
                todo: ap,
                ident: ap.cartodb_id,
                title: ap.name,
                name: ap.name,
                descript: ap.descript,
                lat: ap.lat,
                lng: ap.lon,
                address: ap.address,
                city: ap.city,
                country: ap.country,
                //message: ap.cartodb_id + ' '+ ap.name,
                facebook: ap.facebook,
                twitter: ap.twitter,
                youtube: ap.youtube,
                web: ap.web,
                email: ap.email,
                topic: ap.topic,
                space: ap.space,
                agent: ap.agent,
                /*
                label: {
                       message: ap.name
                   },
                   */
                icon: {
                    type: 'div',
                    iconSize: [0, 0],
                    iconAnchor: [0,15],
                    color: '#fff',
                    popupAnchor:  [0, -45],                    
                    html: "<div class='iconoMontado'><div class='peluca' style='color:"+$scope.asignaColor(ap.topic)+"'><i class='" + $scope.asignaPeluca(ap.agent) +"'></i></div><div class= 'circ'></div><div class='icono'><i class='"+$scope.asignaIcono(ap.space)+"'></i></div></div>"
                },
            };
        });
    };


// Asigna simbología en los menús

    var self=this;
    self.categList = function(){            
        return menusService.categList();
        };
    $scope.categ= self.categList();


    var disponibilidadTema = function(){
        var i;
        for (i=0;i< $scope.categ.length; i++){
        //    console.log('Compruebo Tema: ' + $scope.categ[i].label);
        //    console.log('a ver')
            for (j=0;j<$scope.markers.length;j++){
                if ($scope.categ[i].label === $scope.markers[j].topic){
            //        console.log('Match!');
                    $scope.categ[i].disponible="disp";
                    break;
                }
            }
        }
    };
    var disponibilidadEspacio = function(){
        var i;
        for (i=0;i< $scope.categ.length; i++){
       //     console.log('Compruebo Espacio: ' + $scope.categ[i].label);
        //    console.log('a ver')
            for (j=0;j<$scope.markers.length;j++){
                //console.log($scope.geojsonIniciativas.data[j].topic);

                if ($scope.categ[i].label === $scope.markers[j].space){
          //          console.log('Match!');
                    $scope.categ[i].disponible="disp";
                    break;
                }
            }
        }
    };
    $scope.asignaIconoMenu = function(espacio){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){
            if (espacio == $scope.categ[i].label){
                return $scope.categ[i].menuicon;
            }                
        }
    };
    var disponibilidadAgente = function(){
        var i;
        for (i=0;i< $scope.categ.length; i++){
            //console.log('Compruebo Agente: ' + $scope.categ[i].label);
            //console.log('a ver')
            for (j=0;j<$scope.markers.length;j++){
                //console.log($scope.geojsonIniciativas.data[j].topic);

                if ($scope.categ[i].label === $scope.markers[j].agent){
                    //console.log('Match!');
                    $scope.categ[i].disponible="disp";
                    break;
                }
            }
        }
    };

    //asigna peluca menu Agente

    $scope.asignaPelucaMenu = function(agente){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (agente == $scope.categ[i].label){                
                return $scope.categ[i].menuicon;
            }                
        }
    };

    $scope.desactivarOpcion = function(prop){
        if (prop.disponible=="disp"){
            return prop.disponible;
        }
    };



/* iniciar el mapa */

    $scope.activeMap="act";

//Datos sidebar iniciativas

//Datos sidebar desde mapa:

    $scope.setSelectedIniMap = function(id){
        var i;
        for (i=0;i< $scope.markers.length;i++){
            if (id==$scope.markers[i].ident){
                console.log($scope.markers[i]);
                $scope.setSelectedIni($scope.markers[i]);
                $scope.openSidebar(); 
            }
        }
    }

    $scope.setSelectedIni = function(prop){        
        if (prop.facebook!==null && prop.facebook!==''){
            $scope.iconfacebook ='act';
        } else {
            $scope.iconfacebook="inact"
        };
        if (prop.twitter!==null && prop.twitter!==''){
            $scope.icontwitter ='act';
        } else {
            $scope.icontwitter="inact"
        };
        if (prop.youtube!==null && prop.youtube!==''){
            $scope.iconyoutube ='act';
        } else {
            $scope.iconyoutube="inact"
        };
        if (prop.web!==null && prop.web!==''){
            $scope.iconweb ='act';
        } else {
            $scope.iconweb="inact"
        };
        if (prop.email!==null && prop.email!==''){
            $scope.iconmail ='act';
        } else {
            $scope.iconmail="inact"
        };
        $scope.selectedIni = prop;
        //console.log('elemento seleccionado: ' + prop.name);
    };

/*   
//coordenadas en la URL
    $scope.$on("centerUrlHash", function(event, centerHash) {
                console.log("url", centerHash);
                $location.search({ c: centerHash });
            });

            $scope.changeLocation = function(centerHash) {
                $location.search({ c: centerHash });
            };
*/

    var city_query = "SELECT * FROM iniciativas_copy_copy WHERE city LIKE '"+ $scope.setSelectedCity+ "'";

    $http.get("https://mappemad.cartodb.com/api/v2/sql?q="+ city_query).success(function(data, status){
        $scope.markers ={};
        $scope.markers = addressPointsToMarkers(data.rows);    
        disponibilidadTema();
        disponibilidadEspacio();
        disponibilidadAgente();
    });

//Filtro de prueba
/*
 $scope.filterTags = function (tag) {
        //console.log(tag, $scope.catSort);
        return !$scope.selectedIni ? 
                   tag : (tag.topic == $scope.selectedIni.label);
    };

*/

$scope.customFilter = function(data, searchFor) {
  if (angular.isUndefined(data) || angular.isUndefined(searchFor)) return data;
  var output ={};
  angular.forEach(data, function(item) {
    if(angular.equals(item, searchFor)) {
        output.push(item);
    }
  });
  return output;
}


   //Despliega sidebar al hacer click sobre icono en el mapa

    $scope.$on('leafletDirectiveMarker.click', function(e, args){
        console.log(args);
        console.log(e);
            $scope.setSelectedIniMap(args.model.ident);
               
    });
   


    $scope.activarSeleccionMenu = function(){
        if ($scope.activeSelection==="act"){
            $scope.activeSelection="inact";
        }else{
            $scope.activeSelection="act";
        }
    };
    var temas=[];
   
    $scope.setSelectedTopic = function(tema){
        if (tema.disponible=="disp"){
            $scope.selectedtopic=tema;
        }
        var i;
        for (i=0;temas.lenght;i++){
            if (temas[i]!==tema.label) {
            }
            temas.push(tema.label);
        }
       
        console.log('Temas: '+ temas);
    };

    $scope.unsetSelectedTopic = function(){
        $scope.selectedtopic="";
    }
    
    $scope.setSelectedSpace = function(espacio){
        if (espacio.disponible=="disp"){
            $scope.selectedspace = espacio;
            console.log('espacio seleccionado: '+ espacio.label)
        }
    };

    $scope.unsetSelectedSpace = function(){
        $scope.selectedspace = "";
    };
   
    $scope.setSelectedAgent = function(agente){
        if (agente.disponible=="disp"){
            $scope.selectedagent = agente;
            console.log('agente seleccionado: '+ agente.label)

        }
    };

    $scope.unsetSelectedAgent = function(){
        $scope.selectedagent="";
    };

    $scope.cuenta = function(prop){
        $scope.sumas = prop.lenght();         
    };

    $scope.openCloseSidebar = function(){
        if ($scope.activeSidebar === "act"){
                $scope.activeSidebar = "";
                console.log('Sidebar desactivado');
        }
        else {
            $scope.activeSidebar = "act";
            console.log('Sidebar activado');
        }        
    };
    $scope.openSidebar = function(){
        if ($scope.activeSidebar !== "act"){
            $scope.activeSidebar = "act";                
        }        
    };
    $scope.alternateMap = function(){
        if ($scope.activeMap !== "act"){
            $scope.activeList = "inact";
            $scope.activeMap = "act";
            console.log('Mapa activado');
            }        
    };
    $scope.alternateList = function(){
        if ($scope.activeList !== "act"){
            $scope.activeMap = "inact";
            $scope.activeList = "act";
            console.log('Lista activada');
            }        
    };
    $scope.unsetMapList = function(){
        $scope.activeList ="inact";
        $scope.activeMap ="inact";
    };   
     
}]);