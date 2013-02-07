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
  var formattedFields = _.map(fields, function(item) {
    return item.toUpperCase()
  }).join(',+');

  return formattedFields;
};

exports.constructReqParams = function (obj, fields) {
  return {
    where: exports.constructWhereField(obj, fields),
    text: '',
    geometry: '',
    inSR: '',
    spatialRel: '',
    relationParam: '',
    objectIds: '',
    time: '',
    returnCountOnly: false,
    returnIdsOnly: false,
    returnGeometry: false,
    maxAllowableOffset: '',
    outSR: '',
    outFields: exports.getOutFields(fields),
    f: 'json'
  };
};
