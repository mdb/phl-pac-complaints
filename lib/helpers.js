var _ = require('underscore');

exports.initialCap = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.constructWhereField = function (obj, permitables) {
  var properties = permitables,
      params = _.map(obj, function (value, key) {
        if (_.contains(properties, key.toLowerCase())) {
          return key.toUpperCase() + "='" + exports.initialCap(value) + "'";
        }
      }).filter(function (item) {
        return (item !== undefined);
      }).join('+and+');

  return params;
};

exports.getOutFields = function (fields) {
  var formattedFields;

  if (typeof fields === 'string') return 'outFields=' + encodeURIComponent(fields);

  formattedFields = _.map(fields, function(item) {
    return item;
  }).join(',+');

  return 'outFields=' + formattedFields;
};

exports.buildReqParamsString = function (paramsObj) {
  var params = _.defaults(paramsObj, {
    f: 'json'
  });
      
  return _.map(params, function(value, key) {
    if (key === 'where') {
      return key + '=' + encodeURIComponent(value);
    } else if (key === 'outFields') {
      return exports.getOutFields(value);
    } else {
      return key + '=' + value;
    }
  }).join('&');
};
