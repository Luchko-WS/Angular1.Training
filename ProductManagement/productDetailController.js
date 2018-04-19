(function(){
    angular
        .module('productManagement')
        .controller('ProductDetailController', ProductDetailController);
        
    function ProductDetailController(){
        var vm = this;
        
        vm.product = {
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
        };
        //product;
        vm.title = "Product Detail: " + vm.product.productName;
        
        if(vm.product.tags){
            vm.product.tagList = vm.product.tags.toString();
        }
    }
    
}());