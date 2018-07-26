let assert = require('chai').assert;
let jsdom = require('mocha-jsdom');
let classListHelper = require('../classlist-helper.js');

describe('classListHelper', function () {
    jsdom();

    it('should be a function', function () {
        assert.equal(typeof classListHelper, 'function');
    });
});