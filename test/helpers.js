var expect = require('expect.js');
var helpers = require('../lib/helpers');

describe("helpers", function() {
  describe("#applyDefaults", function () {
    it("it applies default properties to an object", function () {
      expect(helpers.applyDefaults({}, {
        a: 1,
        b: 2
      })).to.eql({a: 1, b: 2});
    });

    it("overrides default properties with specified new values", function () {
      expect(helpers.applyDefaults({
        a: 'a',
        b: 'b'
      }, {
        a: 1,
        b: 2,
        c: 3
      })).to.eql({a: 'a', b: 'b', c: 3});
    });
  });

  describe("#initalCap", function () {
    it("exists", function () {
      expect(typeof helpers.initialCap).to.eql('function');
    });

    it("returns the string it is passed with the first letter capitalized", function () {
      expect(helpers.initialCap('string')).to.eql('String');
    });
  });

  describe("#constructWhereField", function () {
    it("exists", function () {
      expect(typeof helpers.constructWhereField).to.eql('function');
    });

    describe("when the object it is passed contain property attributes specified in the 'permitables' array", function () {
      it("returns the properly formatted string value of the where='' part of an API request", function () {
        var permitables = ['objectid', 'race', 'age', 'sex', 'type', 'date', 'unit', 'action', 'status', 'long_', 'lat'];

        expect(helpers.constructWhereField({
          objectid: 'someObjectId',
          race: 'someRace',
          age: 'someAge',
          sex: 'someSex',
          type: 'someType',
          date: 'someDate',
          unit: 'someUnit',
          action: 'someAction',
          status: 'someStatus',
          long_: 'someLong',
          lat: 'someLat'
        }, permitables)).to.eql("OBJECTID='SomeObjectId'+and+RACE='SomeRace'+and+AGE='SomeAge'+and+SEX='SomeSex'+and+TYPE='SomeType'+and+DATE='SomeDate'+and+UNIT='SomeUnit'+and+ACTION='SomeAction'+and+STATUS='SomeStatus'+and+LONG_='SomeLong'+and+LAT='SomeLat'");
      });
    });

    describe("when the object it is passed does not contain property attributes contained in the 'permitables' array", function () {
      it("returns the properly formatted string value of the where='' part of an API request", function () {
        var permitables = ['foo'];

        expect(helpers.constructWhereField({
          objectid: 'someObjectId',
          prohibitedField: 'valueShouldNotAppear'
        }, permitables)).to.eql("");
      });
    });

    describe("when the object it is passed contains contains both permitted and not-permitted property attributes, as specified by the 'permitables' array", function () {
      it("returns the properly formatted string value of the where='' part of an API request", function () {
        var permitables = ['foo', 'bar'];

        expect(helpers.constructWhereField({
          foo: 'fooValue',
          unPermitted: 'unPermittedValue'
        }, permitables)).to.eql("FOO='FooValue'");
      });
    });
  });

  describe("#getOutFields", function () {
    it("returns the URI-encoded version of the string it is passed if it is passed a string", function () {
      expect(helpers.getOutFields('some string')).to.eql('outFields=some%20string');
    });

    it("returns the properly formatted and encoded outFields string if it is passed an array", function () {
      expect(helpers.getOutFields(['someField', 'anotherField'])).to.eql('outFields=SOMEFIELD%2C%20ANOTHERFIELD');
    });
  });

  describe("#buildReqParamsString", function () {
    it("exists", function () {
      expect(typeof helpers.buildReqParamsString).to.eql('function');
    });

    it("adds an 'f=json' paramater", function () {
      expect(helpers.buildReqParamsString({
        foo: 'bar',
        baz: 'bim'
      })).to.contain("f=json");
    });

    it("returns the properly formatted request params object", function () {
      expect(helpers.buildReqParamsString({
        foo: 'bar',
        baz: 'bim'
      })).to.eql("foo=bar&baz=bim&f=json");
    });

    it("builds the proper outFields query string if an outFields property is present on the params object", function () {
      expect(helpers.buildReqParamsString({
        outFields: 'bar'
      })).to.eql("outFields=bar&f=json");      

      expect(helpers.buildReqParamsString({
        outFields: ['bar', 'baz']
      })).to.eql("outFields=BAR%2C%20BAZ&f=json");
    });
  });
});
