var request = require('request');
var helpers = require('./helpers');

function PhlPacComplaints(opts) {
  this.defaultSettings = {
    apiHost: "http://gis.phila.gov",
    apiPathBase: "/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query",
    fields: ['objectid', 'age', 'race', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat']
  };

  this.settings = opts ? helpers.applyDefaults(opts, this.defaultSettings) : this.defaultSettings;
}

PhlPacComplaints.prototype.getData = function (params, callback) {
  var url = this.settings.apiHost + this.settings.apiPathBase + '?where=' + helpers.constructWhereField(params, this.settings.fields) + '&f=json',
      parameters = helpers.constructReqParams(params);

  request(url, function (err, response, body) {
    if (err) return callback(err);
    callback(null, JSON.parse(body));
  });
};

module.exports = function(opts) {
  return new PhlPacComplaints(opts);
};
