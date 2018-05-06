module.exports = function(app) {
    var Product = app.models.Product;
    var find = Product.find;
    var cache = {};

    Product.find = function(filter, err, cb) {

        var key = '';
        if(filter) {
            key = JSON.stringify(filter);
        }
        var cachedResults = cache[key];
        if(cachedResults) {
            console.log('serving from cache');
            process.nextTick(function() {
                cb(null, cachedResults);
            });
        } else {
            console.log('serving from db');
            find.call(Product, filter, function(err, results) {
                if(!err) {
                    cache[key] = results;
                }
                cb(err, results);
            });
        }
    }
};