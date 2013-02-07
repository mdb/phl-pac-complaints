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

    describe("when the object it is passed contains relevant and permitted 'where' field properties", function () {
      it("returns the properly formatted string value of the where='' part of an API request", function () {
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
        })).to.eql("OBJECTID='SomeObjectId'+and+RACE='SomeRace'+and+AGE='SomeAge'+and+SEX='SomeSex'+and+TYPE='SomeType'+and+DATE='SomeDate'+and+UNIT='SomeUnit'+and+ACTION='SomeAction'+and+STATUS='SomeStatus'+and+LONG_='SomeLong'+and+LAT='SomeLat'");
      });
    });

    describe("when the object it is passed contains relevant and permitted 'where' field properties, as well as not-permitted where field properties", function () {
      it("returns the properly formatted string value of the where='' part of an API request", function () {
        expect(helpers.constructWhereField({
          objectid: 'someObjectId',
          prohibitedField: 'valueShouldNotAppear'
        })).to.eql("OBJECTID='SomeObjectId'");
      });
    });
  });

  describe("#constructReqParams", function () {
    it("exists", function () {
      expect(typeof helpers.constructReqParams).to.eql('function');
    });

    it("returns the properly formatted request params object", function () {
      expect(helpers.constructReqParams({
        foo: 'bar',
        baz: 'bim'
      }).where).to.eql("");

      expect(helpers.constructReqParams({
        foo: 'bar',
        baz: 'bim'
      }).f).to.eql("json");
    });
  });
});
