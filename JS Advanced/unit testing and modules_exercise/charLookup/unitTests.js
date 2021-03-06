let assert = require('chai').assert;
let lookupChar = require('./charLookup');

describe('lookupChar() behavior', () => {

    it('should return undefined with first param number', () => {
        let actulaResult = lookupChar(1, 1);
        assert.isUndefined(actulaResult, 'The result should be undefined');
    });

    it('should return undefined with second param string', () => {
        let actulaResult = lookupChar('string', 'invalidIndex');
        assert.isUndefined(actulaResult, 'The result should be undefined');
    });

    it('should return Incorrect index with negative index', () => {
        let actulaResult = lookupChar('string', -1);
        let expectedResult = 'Incorrect index';
        assert.equal(actulaResult, expectedResult, 'The result should be Incorrect index');
    });

    it('should return Incorrect index with index bigger than length', () => {
        let actulaResult = lookupChar('string', 50);
        let expectedResult = 'Incorrect index';
        assert.equal(actulaResult, expectedResult, 'The result should be Incorrect index');
    });

    it('should return Incorrect index with index same as length', () => {
        let actulaResult = lookupChar('string', 6);
        let expectedResult = 'Incorrect index';
        assert.equal(actulaResult, expectedResult, 'The result should be Incorrect index');
    })

    it('should return undefined with floating point index', () => {
        let actulaResult = lookupChar('string', 2.5);
        assert.isUndefined(actulaResult, 'The result should be undefined');
    })

    it('should return s with index 0', () => {
        let actulaResult = lookupChar('string', 0);
        let expectedResult = 's';
        assert.equal(actulaResult, expectedResult, 'The result should be s');
    });

    it('should return t with index 1', () => {
        let actulaResult = lookupChar('string', 1);
        let expectedResult = 't';
        assert.equal(actulaResult, expectedResult, 'The result should be t');
    });

});