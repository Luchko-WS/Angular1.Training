(function() {
    var app = angular.module('productManagement', ['common.services',
        'ui.router',
        'ui.bootstrap',
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
                    abstract: true,
                    url: "/products/edit/:productId",
                    templateUrl: "productEditView.html",
                    controller: "ProductEditController as vm",
                    resolve: {
                        productResource: "productResource",
                        product: function(productResource, $stateParams){
                            var productId = $stateParams.productId;
                            return productResource.get({productId: productId}).$promise;
                        }
                    }
                })
                 .state("productEdit.info", {
                    url: "/info",
                    templateUrl: "productEditInfoView.html"
                })
                 .state("productEdit.price", {
                    url: "/price",
                    templateUrl: "productEditPriceView.html"
                })
                 .state("productEdit.tags", {
                    url: "/tags",
                    templateUrl: "productEditTagsView.html"
                })
                
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "productDetailView.html",
                    controller: "ProductDetailController as vm",
                    resolve: {
                        productResource: "productResource",
                        product: function(productResource, $stateParams){
                            var productId = $stateParams.productId;
                            return productResource.get({productId: productId}).$promise;
                        }
                    }
                })
        }
    ]);

}());