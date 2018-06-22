var app = angular.module('myApp', []);
app.controller('orderCtrl', function($scope, $http) {
    $scope.infoMessage = "test";
    $scope.updateData = function() {
        $http({
            method : "GET",
            url : "http://localhost:3000/orders"
        }).then(function (response) {
            $scope.myData = response.data;
        });
    }
    $scope.updateData(); // Initial data load


    $scope.deleteData = function(itemId) {
        $http({
            method : "DELETE",
            url : "http://localhost:3000/orders/" + itemId
        }).then(function(response) {
            console.log(response.data);
            $scope.updateData();
        });
    }
    $scope.orderid = "";
    $scope.cname = "";
    $scope.caddress= "ehu";
    $scope.oitem = "hue";
    $scope.ocost = "";
    $scope.odate = "";

    $scope.createData = function() {
        var newData = {
            orderId: $scope.orderid,
            companyName: $scope.cname,
            customerAddress: $scope.caddress,
            orderedItem: $scope.oitem,
            orderCost: $scope.ocost,
            orderDate: $scope.odate
        }

        $http({
            method: "POST",
            url: "http://localhost:3000/orders/",
            data: newData
        }).then(function(response) {
            console.log(response.data);
            $scope.updateData();
        });
    }
    $scope.editData = function(active) {
        $scope._orderId = active.orderId;
        $scope._companyName = active.companyName;
        $scope._customerAddress = active.customerAddress;
        $scope._orderedItem = active.orderedItem;
        $scope._orderCost = active.orderCost;
        $scope._orderDate = active.orderDate;
        $scope.uniqueid = active._id;
        $scope.isCreateVisible = false;
        $scope.invisible = true;

    }

    $scope.saveData = function(x) {
        var newData = {
            orderId: $scope._orderId,
            companyName: $scope._companyName,
            customerAddress: $scope._customerAddress,
            orderedItem: $scope._orderedItem,
            orderCost: $scope._orderCost,
            orderDate: $scope._orderDate
        }

        $http({
            method: "PUT",
            url: "http://localhost:3000/orders/" + x,
            data: newData
        }).then(function(response) {
            console.log(response.data);
            $scope.updateData();
            hideForm();
        });

        $scope.invisible = false;
    }
     $scope.createForm = function() {
         $scope.isCreateVisible = true;
         $scope.invisible = false;
     }
     $scope.hideForm = function(){
        $scope.isCreateVisible = false;
     }
});