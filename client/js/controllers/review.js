// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .controller('AllReviewsController', ['$scope', 'Product', 'Category', function($scope,
                                                                                   Product, Category) {
        $scope.page = 1;
        $scope.count = 0;
        $scope.categories = Category.find();

        $scope.openModal = function(product){
            $scope.currentProduct = product;
            $scope.currentProduct.vals=[];
            $scope.currentProduct.labels=[];
            $scope.currentProduct.colors=[];

            Product.find({filter: {where :{categoryId: product.categoryId},  order: 'rating DESC'}}, function(data) {
                $scope.related = data;

                console.log(data);
                data.forEach(function(i, index) {
                    $scope.currentProduct.vals.push(i.rating);
                    $scope.currentProduct.labels.push(i.productName);
                    if(i.id == $scope.currentProduct.id){
                        var position = (index/data.length)*100;
                        if (position < 33)
                            $scope.currentProduct.pos = "Top < 66-100%";
                        else if(position >=33 && position < 66)
                            $scope.currentProduct.pos = "Top < 33-66%";
                        else
                            $scope.currentProduct.pos = "Top 0-33%";
                        $scope.currentProduct.colors.push('#45b7cd');
                    }
                    else
                        $scope.currentProduct.colors.push('#ff6384');

                });
            });
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
        };

        $scope.closeModal = function() {
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
            $scope.currentProduct = null;
        };

        $scope.loadDatafn = function(page, term) {
            var sk = (page-1) * 20;
            var  filter = {limit: 20, skip: sk};
            if (term != null){
                filter.where = {categoryId: term.id};
            }

            Product.count(filter).$promise
                .then(function(data) {
                    $scope.count =  Math.floor(data.count/20);
                    if ( data.count % 20>0)  $scope.count++;
                });

            this.page = page;
            Product.find({
                filter : filter
            }, function(data) {
                $scope.products = data;
                console.log("data:" , data.length);
            });
        };

        $scope.loadDatafn($scope.page);
    }]);
