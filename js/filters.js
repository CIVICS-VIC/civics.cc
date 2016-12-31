//filter Multiple...
civicsApp.filter('filterMultiple',['$filter',function ($filter) {
    return function (items, keyObj) {
        var filterObj = {
            data:items,
            filteredData:[],
            applyFilter : function(obj,key){
                var fData = [];
                if(this.filteredData.length == 0)
                    this.filteredData = this.data;
                if(obj){
                    var fObj = {}
                    if(!angular.isArray(obj)){
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData,fObj));
                    }else if(angular.isArray(obj)){
                        if(obj.length > 0){ 
                            for(var i=0;i<obj.length;i++){
                                if(angular.isDefined(obj[i])){
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData,fObj));    
                                }
                            }                                            
                        }                                       
                    }                                   
                    if(fData.length > 0){
                        this.filteredData = fData;
                    }
                }
            }
        };

        if(keyObj){
            angular.forEach(keyObj,function(obj,key){
                filterObj.applyFilter(obj,key);
            });         
        }
        
        return filterObj.filteredData;
    }
}]);

civicsApp.filter('myObject', ['$filter', function($filter) {
  return function(items) {
    //if (!input) return input;
    //if (!search) return input;
    var result = {};
    
  console.log(items);
    if (items.topic=='Cultura Libre') {
        result=items;
      }return result;
  }
}]);

/*
civicsApp.filter('topicis', ['$filter', function () {
    return function (input, topic) {
        var markers = [];
        /*
        if (isNaN(topic)) {
            output = input;
        }
      
            if (input.topic && ) {
                output.push(input[topic]);
            }
           
    return output;
    }
}]);
*/


civicsApp.filter('markerFilter',function(){
  return function(input,filterBy){
    var markers = {};
    if(input && filterBy && input[filterBy]){
      markers.push(input[filterBy]);
      return markers;
    }
    return input;
  };
})