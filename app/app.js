(function () {
  var app = angular.module('myApp', []);

  app.directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);

  app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);

      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      })
        .success(function () {

        }).error(function () {


        });
    }
  }]);

  app.controller('myAppController', ['$scope', 'fileUpload', function ($scope, fileUpload) {

    this.myFile = null;
    this.myCsv = [];
    var self = this;

    this.upload = function () {
      console.log('file is ');
      console.dir(this.myFile);
      var fr = new FileReader();

      fr.onload = function(){
        var rows = fr.result.split(/\r\n|\r|\n/g);

        rows.forEach(function (currentValue) {
          var cols = currentValue.split(',');
          self.myCsv.push(cols);
          })

        console.log(self.myCsv);
        console.dir(self.myCsv);
        $scope.$apply(); 
      }

        fr.readAsText(this.myFile);



      

      
    }

  }]);
} ());





