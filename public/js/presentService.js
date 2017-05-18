angular.module('enthrall').service('presentService', function($http, $q) {

  // CATFACTS API
  this.getFacts = function() {
    var defer = $q.defer();
    $http.get('http://catfacts-api.appspot.com/api/facts').then(function(resp) {
      console.log(resp);
      var catFacts = resp.facts;
      defer.resolve(catFacts);
    })
    return defer.promise;
  }

})
