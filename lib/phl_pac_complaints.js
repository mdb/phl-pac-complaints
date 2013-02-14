var request = require('request'),
    _ = require('underscore'),
    helpers = require('./helpers');

function PhlPacComplaints(opts) {
  this.defaultSettings = {
    apiHost: "http://gis.phila.gov",
    apiPathBase: "/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query",
    whereFields: ['objectid', 'age', 'race', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat', 'shape'],
    defaultResultOptions: {
      returnCountOnly: false,
      returnIdsOnly: false,
      returnGeometry: true,
      maxAllowableOffset: '',
      outputSpatialReference: '',
      outFields: '*'
    }
  };

  this.settings = opts ? _.defaults(opts, this.defaultSettings) : this.defaultSettings;
}

PhlPacComplaints.prototype.get = function (params, callback) {
  var paramsWithDefaults = _.defaults(params, this.settings.defaultResultOptions),
      url = this.settings.apiHost + this.settings.apiPathBase + '?' + helpers.buildReqParamsString(paramsWithDefaults);

  request(url, function (err, response, body) {
    if (err) return callback(err);
    callback(null, JSON.parse(body));
  });
};

module.exports = function(opts) {
  return new PhlPacComplaints(opts);
};
