var expect = require('expect.js');
var nock = require('nock');
var modulePath = '../lib/phl_pac_complaints';

describe("PhlPacComplaints", function() {
  var PhlPacComplaints = require(modulePath);
  var phlPacComplaints = new PhlPacComplaints();

  it("exists", function () {
    expect(typeof PhlPacComplaints).to.eql('function');
  });

  describe("#settings", function () {
    it("exists as an object on a PhlPacComplaints instance", function () {
      expect(typeof phlPacComplaints.settings).to.eql('object');
    });

    it("houses configuration settings", function () {
      expect(phlPacComplaints.settings.apiHost).to.eql('http://gis.phila.gov');
      expect(phlPacComplaints.settings.apiPathBase).to.eql('/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query');
      expect(phlPacComplaints.settings.whereFields).to.eql(['objectid', 'age', 'race', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat', 'shape']);
    });

    it("can be overridden on instantiation", function () {
      var phlPacInst = new PhlPacComplaints({
        apiHost: 'http://fakehost.com',
        apiPathBase: '/fake/path'
      });

      expect(phlPacInst.settings.apiHost).to.eql('http://fakehost.com');
      expect(phlPacInst.settings.apiPathBase).to.eql('/fake/path');
    });
  });

  describe("#get", function () {
    it("exists as a method on a PhlPacComplaints instance", function () {
      expect(typeof phlPacComplaints.get).to.eql('function');
    });

    it("makes an API call to the proper endpoint, appending the object it's passed as a request params string, and also including default result options if none are specified", function (done) {
      nock('http://gis.phila.gov')
        .get("/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query?foo=bar&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outputSpatialReference=&outFields=*&f=json")
        .reply(200, {resp: 'fakeResponse'});

      phlPacComplaints.get({foo: 'bar'}, function(err, data) {
        expect(data).to.eql({resp: 'fakeResponse'});
        done();
      });
    });

    it("makes an API call to the proper endpoint, appending the object it's passed as a request params string, and also including defaults-overriding result options if they are present in the object", function (done) {
      nock('http://gis.phila.gov')
        .get("/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query?foo=bar&returnCountOnly=true&returnIdsOnly=true&returnGeometry=false&maxAllowableOffset=blah&outputSpatialReference=blah&outFields=foo,+bar&f=json")
        .reply(200, {resp: 'fakeResponse'});

      phlPacComplaints.get({
        foo: 'bar',
        returnCountOnly: true,
        returnIdsOnly: true,
        returnGeometry: false,
        maxAllowableOffset: 'blah',
        outputSpatialReference: 'blah',
        outFields: ['foo', 'bar']
      }, function(err, data) {
        expect(data).to.eql({resp: 'fakeResponse'});
        done();
      });
    });

    it("continues to work as designed, even if the API responds with an error code of 500", function (done) {
      nock("http://gis.phila.gov")
        .get("/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query?foo=bar&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outputSpatialReference=&outFields=*&f=json")
        .reply(500, {resp: 'fake500Response'});

      phlPacComplaints.get({foo: 'bar'}, function(err, data) {
        expect(data).to.eql({resp: 'fake500Response'});
        done();
      });
    });
  });
});
