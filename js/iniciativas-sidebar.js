//Controlador para sidebar Iniciativas
civicsApp.controller("SidebarIniController", ['$scope',function($scope) {

/*Iconos para fichas y mapa*/

    //Asigna color de tema

  
    $scope.asignaColor = function(tema){
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (tema == $scope.categ[i].label){
                return $scope.categ[i].iconColor;
            }                
        }
    };

    //Asigna peluca

    $scope.asignaPeluca = function(agente){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (agente == $scope.categ[i].label){                
                return $scope.categ[i].icon;
            }                
        }
    }; 


    //Asigna icono espacios iniciativas

    $scope.asignaIcono = function(espacio){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (espacio == $scope.categ[i].label){
                return $scope.categ[i].icon;
            }                
        }
    };

    //Asigna icono actividades

    $scope.asignaIconoAct = function(actividad){        
        var i; 
        for (i=0; i< $scope.categ.length; i++){                
            if (actividad == $scope.categ[i].label){
                return $scope.categ[i].icon;
            }                
        }
    };


//Datos sidebar iniciativas

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
        console.log('elemento seleccionado: ' + prop.name);
    }

}]);
