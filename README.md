
# Installation #
## import data by ##
`mongoimport --db ats --collection products --file products.json --jsonArray`
 
 or
 
`mongoimport --db ats --collection products --file "http://internal.ats-digital.com:3066/api/products" --jsonArray`

## Data handling ##

`mongo localhost:27017/ats migration.js`

## install the app ##

`npm install`

finally 

`node .`


The migration script will create a collection named "categories". Also will calculate rating for each product.
I prefer this way, it cost less than aggregation requests. Updates should be by Delayed execution.

The DataBase should be ready.


1. I cached requests in `server/boot/cache.js`. I overloaded the find function. But I didn't implement cache life time. This is quite simple.
You can see details on the console.

2. Category filter is a drop down component.

3. On the click of a line in the table, a modal popup will show details and charts (as far as i understood ).



## Time to play ##