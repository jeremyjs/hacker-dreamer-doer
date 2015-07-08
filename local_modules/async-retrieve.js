var _ = require('lodash');

module.exports = function asyncRetrieve (collection, retrieve, done) {
  var result = [];
  var waiting = collection.length;
  collection.forEach(function (item) {
    retrieve(item, function (item) {
      result.push(item);
      waiting--;
      if(waiting <= 0) {
        result = _.compact(result);
        done(result);
      }
    });
  });
}
