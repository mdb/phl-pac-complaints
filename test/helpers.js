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

    it("returns the properly formatted string value of the where='' part of an API request", function () {
      expect(helpers.constructWhereField({
        foo: 'bar',
        baz: 'bim'
      })).to.eql("FOO='Bar'+and+BAZ='Bim'");
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
      }).where).to.eql("FOO='Bar'+and+BAZ='Bim'");

      expect(helpers.constructReqParams({
        foo: 'bar',
        baz: 'bim'
      }).f).to.eql("json");
    });
  });
});
