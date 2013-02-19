var request = require('request'),
    _ = require('underscore'),
    Arc = require('archaeologist');

module.exports = function(opts) {
  var defaultSettings = {
    apiHost: "http://gis.phila.gov",
    apiPathBase: "/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query",
    whereFields: ['objectid', 'age', 'race', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat', 'shape']
  },
  settings = opts ? _.defaults(opts, defaultSettings) : defaultSettings;

  return new Arc(settings);
};
