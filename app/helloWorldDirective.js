(function () {

    var app = angular.module('myApp',[]);

    app.directive('helloWorld',function(){
      return {
        template: 'Hello World'
      }

    });

  }());