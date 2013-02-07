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
      expect(phlPacComplaints.settings.fields).to.eql(['objectid', 'age', 'race', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat']);
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

  describe("#getData", function () {
    it("exists as a method on a PhlPacComplaints instance", function () {
      expect(typeof phlPacComplaints.getData).to.eql('function');
    });

    describe("when it is passed a query object whose properties are not allowed", function () {
      it("makes an API call to the proper endpoint, without appending the irrelevant params object properties to the where field", function (done) {
        nock('http://gis.phila.gov')
          .get("/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query?where=&f=json")
          .reply(200, {resp: 'fakeResponse'});

        phlPacComplaints.getData({foo: 'bar'}, function(err, data) {
          expect(data).to.eql({resp: 'fakeResponse'});
          done();
        });
      });
    });   

    describe("when it is passed a query object whose properties are allowed", function () {
      it("makes an API call to the proper endpoint, appending the relevant params object properties to the where field", function (done) {
        nock('http://gis.phila.gov')
          .get("/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query?where=RACE=%27White%27&f=json")
          .reply(200, {resp: 'fakeResponse'});

        phlPacComplaints.getData({race: 'white'}, function(err, data) {
          expect(data).to.eql({resp: 'fakeResponse'});
          done();
        });
      });

      it("continues to work as designed, even if the API responds with an error code of 500", function (done) {
        nock("http://gis.phila.gov")
          .get("/ArcGIS/rest/services/PhilaGov/PAC_Complaints_2009_2012/MapServer/0/query?where=RACE=%27White%27&f=json")
          .reply(500, {resp: 'fake500Response'});

        phlPacComplaints.getData({race: 'white'}, function(err, data) {
          expect(data).to.eql({resp: 'fake500Response'});
          done();
        });
      });
    });
  });
});
