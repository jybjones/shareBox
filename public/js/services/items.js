//Articles service used for articles REST endpoint
angular.module('sharebox.items').factory("Items", ['$http', function($http) {
    var urlBase = '/api/items';
    var itemsFactory = {};

    itemsFactory.getItems = function(){
        return $http.get(urlBase);
    };
    itemsFactory.getMyItems = function(){
        return $http.get(urlBase+"/mine");
    };
    itemsFactory.getItem = function(itemId){
        return $http.get(urlBase+"/"+itemId);
    };
    itemsFactory.createItem = function(item){
        return $http.post(urlBase, item);
    };
    itemsFactory.updateItem = function(item){
        return $http.put(urlBase+"/"+item.id, item);
    };
    itemsFactory.deleteItem = function(itemId){
        return $http.delete(urlBase+"/"+itemId);
    };
    itemsFactory.deleteImage = function(imageId){
        return $http.delete(urlBase+"/photo/"+imageId);
    };
    itemsFactory.bookItem = function(request){
        return $http.post(urlBase+"/request", request);
    };
    return itemsFactory;
}]);
