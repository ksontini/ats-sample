//var db = connect("localhost:27020/ats");
db.products.find({}).forEach(function(element){
    db.categories.update(
        { name: element.category },
        { name: element.category },
        { upsert: true}
    );
    var cat = db.categories.findOne({name: element.category});
    element.categoryId =  cat._id;

    /*
        Calculate Total reviews
    */
    var total = 0;
    element.reviews.forEach(function(elm) {
        total += elm.rating;
    });
    element.rating = total / element.reviews.length;
    db.products.update({_id: element._id},  element);
});