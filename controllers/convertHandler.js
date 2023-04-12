function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}

function checkDiv(possibleFraction) {
  // returns false for double fractions ex. 1/4/3
  // 1/4 would return ["1", "4"]
  // 14 would return ["14"]
  let nums = possibleFraction.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
};

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);

    if (!nums){
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1"; // if only num1 exists, return 1 so result = (num1)/1

    result = parseFloat(num1) / parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) { // check if num1 or num2 are not real numbers (Ex. 1.1.1)
      return undefined;
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    const units = ["gal", "l", "lbs", "kg", "mi", "km"];
    if (!(units.includes(result))) {
      return undefined;
    } else {
      if (result === "l") {
        result = "L"
      }

      return result
    }
  };

  
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
    let result = initNum * unitFactors[initUnit];
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
