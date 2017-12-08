module.exports = function parallel(fns, callback) {
  var len = fns.length;
  var count = len;
  var result = new Array(len);

  var loop = function loop(i) {
    var check = function checkParallel(data) {
      count--;
      result[i] = data;

      if (count === 0) {
        callback(result);
      }
    };

    fns[i](check);
  };

  for (var i = 0; i < len; i++) {
    loop(i);
  }
};
