(function() {

    var app = angular
        .module('productResourceMock', ['ngMockE2E']);

    app.run(function($httpBackend) {
        var products = [{
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2009",
            "description": "Leaf rake with 48-inch handle.",
            "cost": 9.00,
            "price": 19.95,
            "category": "garden",
            "tags": ["leaf", "tool"],
            "imageUrl": "https://openclipart.org/download/26215/Leaf-Rake.svg"
        }, {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "April 12, 2013",
            "description": "15 gallon capacity rolling garden cart.",
            "cost": 20.00,
            "price": 32.99,
            "category": "garden",
            "tags": ["garden", "cart", "wheelbarrow"],
            "imageUrl": "https://openclipart.org/download/58471/garden-cart.svg"
        }, {
            "productId": 5,
            "productName": "Hammer",
            "productCode": "TBX-0048",
            "releaseDate": "May 9, 2013",
            "description": "Curved claw steel hammer.",
            "cost": 1.00,
            "price": 8.99,
            "category": "toolbox",
            "tags": ["tool"],
            "imageUrl": "https://openclipart.org/download/4793/david-benjamin-Hammer.svg"
        }, {
            "productId": 8,
            "productName": "Saw",
            "productCode": "TBX-0022",
            "releaseDate": "May 15, 2009",
            "description": "15-inch steel blade hand saw.",
            "cost": 6.95,
            "price": 11.60,
            "category": "garden",
            "tags": ["garden", "mower"],
            "imageUrl": "https://openclipart.org/download/34327/sega-per-legno.svg"
        }, {
            "productId": 10,
            "productName": "Video Game Controller",
            "productCode": "GMG-0042",
            "releaseDate": "September 9, 2015",
            "description": "Standart two-button video game controller.",
            "cost": 3.22,
            "price": 35.95,
            "category": "gaming",
            "tags": ["gaming", "controller", "video game"],
            "imageUrl": "https://openclipart.org/download/239403/1454254857.svg"
        }];

        var productUrl = "/api/products";

        $httpBackend.whenGET(productUrl).respond(products);

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            var product = {
                "productId": 0
            };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                }
            }

            return [200, product, {}];
        });

        $httpBackend.whenPOST(productUrl).respond(function(method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                //new product
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            } else {
                //update product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                }
            }

            return [200, product, {}];
        });

        //mine configuration for plunker
        $httpBackend.whenGET('productListView.html').passThrough();
        $httpBackend.whenGET('productEditView.html').passThrough();
        $httpBackend.whenGET('productEditInfoView.html').passThrough();
        $httpBackend.whenGET('productEditPriceView.html').passThrough();
        $httpBackend.whenGET('productEditTagsView.html').passThrough();
        $httpBackend.whenGET('welcomeView.html').passThrough();
        $httpBackend.whenGET('productDetailView.html').passThrough();
    });

}());