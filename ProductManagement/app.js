(function() {
    var app = angular.module('productManagement', ['common.services',
        'ui.router',
        'productResourceMock'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "welcomeView.html",
                })
                .state("productList", {
                    url: "/products",
                    templateUrl: "productListView.html",
                    controller: "ProductListController as vm"
                })
                .state("productEdit", {
                    url: "/products/edit/:productId",
                    templateUrl: "productEditView.html",
                    controller: "ProductListController as vm"
                })
        }
    ]);

}());