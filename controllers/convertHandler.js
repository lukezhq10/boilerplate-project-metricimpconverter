function ConvertHandler() {
  
  this.getNum = function(input) {
    // This regex pattern matches any fractional input, decimal or fractional with a fraction slash
    const fractionPattern = /^(\d+(\.\d+)?|\d*\/\d+|\d+\s\d*\/\d+)(\s*\w*)$/;
    const match = input.match(fractionPattern);
    if (!match) {
      return 1; // If no valid number is found, return 1 by default
    }
    // Get the number part of the input and return it
    return eval(match[1].replace('/', '+')); // Using eval here to handle fractions and decimals correctly
  };
  
  this.getUnit = function(input) {
    // This regex pattern matches any valid unit input
    const unitPattern = /gal|lbs|mi|km|l|kg$/i;
    const match = input.match(unitPattern);
    let result;
    if (!match) {
      return null;
    } else if (match) { // Get the unit part of the input and return it
      result = match[0].toLowerCase();
      if (result === 'l') { // if unit is l, return as uppercase
        result = 'L';
      }
    }

    return result;
  };

  // The rest of the functions remain unchanged
  this.getReturnUnit = function(initUnit) {
    const unitConversions = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    };

    // Get the corresponding return unit based on the initUnit
    return unitConversions[initUnit];
  };

  this.spellOutUnit = function(unit) {
     // Object to store unit spellings
     const unitSpellings = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };

    // Get the corresponding unit spelling for the given unit
    return unitSpellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    // Object to store conversion factors
    const unitFactors = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    };
    // Convert the initNum to the corresponding output value using the unitFactors
    const result = initNum * unitFactors[initUnit];
    // Round the result to 5 decimal places
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Get the spelled-out input unit and output unit using the spellOutUnit function
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);

    // Construct the output string based on the input and output values
    let result = `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
