const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler.getNum()', function() {
        test('Whole Number', function () {
            let input = '4gal';
            assert.equal(convertHandler.getNum(input), 4);
        });

        test('Decimal', function () {
            let input = '12.4L';
            assert.equal(convertHandler.getNum(input), 12.4);
        });

        test('Fraction', function () {
            let input = '1/2km';
            assert.equal(convertHandler.getNum(input), 1/2);
        });

        test('Fraction with Decimal', function () {
            let input = '5.4/3lbs';
            assert.equal(convertHandler.getNum(input), 5.4/3);
        });

        test('Double-Fraction Error', function () {
            let input = '3/2/3lbs';
            assert.equal(convertHandler.getNum(input), undefined);
        });

        test('No Numerical Input ', function () {
            let input = 'kg';
            assert.equal(convertHandler.getNum(input), 1);
        });
    })

    suite('convertHandler.getUnit()', function() {
        test('Valid Units', function () {
            let units = ["gal", "L", "lbs", "kg", "mi", "km"];
            units.forEach(unit => {
                assert.equal(convertHandler.getUnit(unit), unit)
            })
        });

        test('Invalid Units', function () {
            let input = '56kilos';
            assert.equal(convertHandler.getUnit(input), undefined);
        });
    });

    suite('convertHandler.getReturnUnit()', function() {
        test('Return Unit', function () {
            let units = ["gal", "L", "lbs", "kg", "mi", "km"];
            let unitConversions = {
                gal: "L",
                L: "gal",
                lbs: "kg",
                kg: "lbs",
                mi: "km",
                km: "mi"
              };
            
            units.forEach(unit => {
                assert.equal(convertHandler.getReturnUnit(unit), unitConversions[unit]);
            });
        });
        
        test('gal to L', function () {
            let input = 'gal';
            assert.equal(convertHandler.getReturnUnit(input), 'L');
        });

        test('L to gal', function () {
            let input = 'L';
            assert.equal(convertHandler.getReturnUnit(input), 'gal');
        });

        test('mi to km', function () {
            let input = 'mi';
            assert.equal(convertHandler.getReturnUnit(input), 'km');
        });

        test('km to mi', function () {
            let input = 'km';
            assert.equal(convertHandler.getReturnUnit(input), 'mi');
        });

        test('lbs to kg', function () {
            let input = 'lbs';
            assert.equal(convertHandler.getReturnUnit(input), 'kg');
        });

        test('kg to lbs', function () {
            let input = 'kg';
            assert.equal(convertHandler.getReturnUnit(input), 'lbs');
        });
    });

    suite('convertHandler.spellOutUnit()', function() {
        test('Spelled Out Unit', function () {
            let units = ["gal", "L", "lbs", "kg", "mi", "km"];
            let unitSpellings = {
                gal: "gallons",
                L: "liters",
                lbs: "pounds",
                kg: "kilograms",
                mi: "miles",
                km: "kilometers"
              };
            
            units.forEach(unit => {
                assert.equal(convertHandler.spellOutUnit(unit), unitSpellings[unit]);
            });
        });  
    });
});