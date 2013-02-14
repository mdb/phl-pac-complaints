var expect = require('expect.js');
var helpers = require('../lib/helpers');

describe("helpers", function() {
  describe("#getOutFields", function () {
    it("returns the URI-encoded version of the string it is passed if it is passed a string", function () {
      expect(helpers.getOutFields('some string')).to.eql('outFields=some%20string');
    });

    it("returns the properly formatted and encoded outFields string if it is passed an array", function () {
      expect(helpers.getOutFields(['someField', 'anotherField'])).to.eql('outFields=someField,+anotherField');
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
      })).to.eql("outFields=bar,+baz&f=json");
    });
  });
});
