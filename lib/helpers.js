var _ = require('underscore');

exports.applyDefaults = function (obj, defaults) {
  var mergedObj = obj || {};
  var setting;

  for (setting in defaults) {
    if (defaults.hasOwnProperty(setting) && !obj[setting]) {
      obj[setting] = defaults[setting];
    }
  }

  return mergedObj;
};

exports.initialCap = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.constructWhereField = function (obj) {
  var properties = ['objectid', 'age', 'race', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat'],
      params = _.map(obj, function (value, key) {
        if (_.contains(properties, key.toLowerCase())) {
          return key.toUpperCase() + "='" + exports.initialCap(value) + "'";
        }
      }).filter(function (item) {
        return (item !== undefined);
      }).join('+and+');

  return params;
};

exports.constructReqParams = function (obj) {
  return {
    where: exports.constructWhereField(obj),
    f: 'json'
  };
};
