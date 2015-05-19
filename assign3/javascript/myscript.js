    //********************************************************************************//
    //* Name : Larissa de Jesus Voigt                                                *//
    //* Zenit login : int222_151f07                                                  *//
    //********************************************************************************//


    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
     }

} // End of detailPaymentCalculation function


function validationForPayment() {

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, simply update the comments area with the message:     *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//

    var data = {
      propValue: validatePropValue(),
      downPay: validateDownPay(),
      intRate: validateIntRate(),
      amortization: validateAmortization()
    };

    var valid = printErrors(data);

    if (valid) {
      detailPaymentCalculation(data.propValue, data.downPay, data.intRate, data.amortization);
    }

} // End of validationForPayment function



function completeFormValidation() {

    //********************************************************************************//
    //*                                                                              *//
    //* This function calls the different functions to validate all required fields  *//
    //*                                                                              *//
    //* Once you have validated all field,                                           *//
    //* determine if any error(s) have been encountered                              *//
    //*                                                                              *//
    //* If any of the required fields are in error:                                  *//
    //*                                                                              *//
    //*    present the client with a list of all the errors in reserved area         *//
    //*         on the form and                                                      *//
    //*          don't submit the form to the CGI program in order to allow the      *//
    //*          client to correct the fields in error                               *//
    //*                                                                              *//
    //*    Error messages should be meaningful and reflect the exact error condition.*//
    //*                                                                              *//
    //*    Make sure to return false                                                 *//
    //*                                                                              *//
    //* Otherwise (if there are no errors)                                           *//
    //*                                                                              *//
    //*    Change the 1st. character in the field called client to upper case        *//
    //*                                                                              *//
    //*    Change the initial value in the field called jsActive from N to Y         *//
    //*                                                                              *//
    //*    Make sure to return true in order for the form to be submitted to the CGI *//
    //*                                                                              *//
    //********************************************************************************//

    var data = {
      userId: validateUserId(),
      client: validateClient(),
      propValue: validatePropValue(),
      downPay: validateDownPay(),
      propCalc: validatePropValueAndDownPay(),
      income: validateIncome(),
      propDetails: validatePropDetails(),
      propLocation: validatePropLocation(),
      mortYear: validateMortYear(),
      mortMonth: validateMortMonth(),
      intRate: validateIntRate(),
      amortization: validateAmortization()
    };

    var valid = printErrors(data);

    if (valid) {
      document.getElementById("jsActive").value = "Y";
      var nameEl = document.getElementById("client");
      var name = nameEl.value;
      name = name[0].toUpperCase() + name.substr(1);
      nameEl.value = name;
    }

    return valid;

} // End of completeFormValidation

function printErrors (data) {
  var error = document.getElementById("error");
  error.value = "";
  var valid = true;
  for (var prop in data) {
    if (data[prop] && data[prop].error) {
      error.value += data[prop].error + "\n";
      valid = false;
    }
  }
  return valid;
}

function validateUserId() {
  var value = document.getElementById("userId").value;
  if (value.length != 10) {
    return {error:"User ID all 10 positions must be present" };
  }
  if (value[4] != "-") {
    return {error:"User ID Position 5 must be a hyphen (-)" };
  }
  for (var i = 0; i < 4; i++) {
    if (isNaN(value[i]))  {
      return {error:"User ID Position " + i + " must be a number" };
    }
  }
  for (i = 5; i < 10; i++) {
    if (isNaN(value[i]))  {
      return {error:"User ID Position " + i + " must be a number" };
    }
  }
  var lowsum = 0;
  for (i = 0; i < 4; i++) {
    lowsum += parseInt(value[i]);
  }
  if (lowsum <= 0) {
    return {error: "User ID Sum of the first 4 numbers must be greater than 0" };
  }
  var highsum = 0;
  for (i = 5; i < 10; i++) {
    highsum += parseInt(value[i]);
  }
  if (highsum <= 0) {
    return {error:"User ID Sum of the last 5 numbers must be greater than 0" };
  }
  if (highsum != (lowsum * 2) + 1) {
    return {error:"User ID sum of the last 5 numbers must be the double plus of of the first 4 numbers" };
  }
}

var letters = "abcdefghijklmnopqrstuvwxyz";

function validateClient () {
  var value = document.getElementById("client").value;

  if (value.length === 0) {
    return {error: "Client name must be present"};
  }

  if (value.length < 3) {
    return {error: "Client name must be at least 3 characters"};
  }

  for (var i = 0; i < 3; i++) {
    if (letters.indexOf(value[i].toLowerCase()) === -1) {
      return {error: "Client name first 3 characters must be from [a-z][A-Z]"};
    }
  }

  var hyphen = -1;
  var apostrophe = -1;

  for (var i = 0; i < value.length; i++) {
    if (value[i] === "'") {
      if (apostrophe !== -1) {
        return {error: "Client name must contain at most one aprostrophes (')"};
      } else {
        apostrophe = i;
      }

    }
    else if (value[i] === "-") {
      if (hyphen !== -1) {
        return {error: "Client name must contain at most one hyphen (-)"};
      } else {
        hyphen = i;
      }
    }
  }

  var first = value[0];
  var last = value[value.length - 1];

  if (first === "'") {
    return {error: "Client name can't start with an apostrophe (')"};
  }

  if (last === "'") {
    return {error: "Client name can't end with an apostrophe (')"};
  }

  if (first === "-") {
    return {error: "Client name can't start with an hyphen (-)"};
  }

  if (last === "-") {
    return {error: "Client name can't end with an hyphen (-)"};
  }

  if (hyphen !== -1 && apostrophe !== -1) {
    var diff = hyphen - apostrophe;
    if (diff === 1 || diff === -1) {
      return {error: "Client name can't have an apostrophe (') and a hyphen (-) next to each other"};
    }
  }

  return value;

}

function validatePropValue () {
  var value = document.getElementById("propValue").value;
  if (value.length === 0) {
    return {error:"Property Value can't be empty" };
  }

  var num = parseFloat(value);

  if (!Number.isInteger(num)) {
    return {error:"Property Value must be an integer number" };
  }
  if (num <= 0) {
    return {error:"Property Value must be positive" };
  }

  return num;
}

function validateDownPay () {
  var value = document.getElementById("downPay").value;
  if (value.length === 0) {
    return {error:"Down Payment can't be empty" };
  }

  var num = parseFloat(value);

  if (!Number.isInteger(num)) {
    return {error:"Down Payment must be an integer number" };
  }

  if (num <= 0) {
    return {error:"Down Payment must be positive" };
  }

  return num;
}

function validatePropValueAndDownPay () {
  var prop = parseFloat(document.getElementById("propValue").value);
  var down = parseFloat(document.getElementById("downPay").value);

  if (prop <= down + 65000) {
    return {error:"Property Value must be at least $65,000 greater than the down payment" };
  }

  if (down < prop * 0.1) {
    return {error:"Down Payment must be at least 10% of the value of the property" };
  }
}

function validateIncome () {
  var value = document.getElementById("income").value;
  if (!value) {
    return {error:"Income Rent must be selected" };
  }
}

function validatePropDetails () {
  var els = document.getElementsByName("propDetails");
  var checked = false;
  for (var i = 0; i < els.length; i++) {
    if (els[i].checked) {
      checked = true;
      break;
    }
  }
  if (!checked) {
    return {error:"Property Type must be selected" };
  }
}

function validatePropLocation () {
  var value = document.getElementById("propLocation").value;
  if (!value) {
    return {error:"Property Location must be selected" };
  }
}

function validateMortYear () {
  var value = document.getElementById("mortYear").value;
  if (value.length === 0) {
    return {error:"Mortgage Year can't be empty" };
  }

  var num = parseInt(value);

  if (isNaN(num)) {
    return {error:"Mortgage Year must be numeric" };
  }

  var year = (new Date()).getFullYear();

  if (!(num === year || num === year + 1)) {
    return {error:"Mortgage Year must be equal to current year or 1 year greater" };
  }

}

function validateMortMonth () {
  var value = document.getElementById("mortMonth").value;
  if (value.length === 0) {
    return {error:"Mortgage Month can't be empty" };
  }

  var num = parseInt(value);

  if (isNaN(num)) {
    return {error:"Mortgage Month must be numeric" };
  }

  var month = (new Date()).getMonth() + 1;

  if (num < 1 || num > 12) {
    return {error:"Mortgage Month must be between month 1 to 12" };
  }

  if (!(num === month || num === month + 1)) {
    return {error:"Mortgage Month must be equal to current month or 1 month greater" };
  }

}

function validateIntRate () {
  var value = document.getElementById("intRate").value;
  if (value.length === 0) {
    return {error: "Interest Rate can't be empty" };
  }

  var num = parseInt(value);

  if (isNaN(num)) {
    return {error:"Interest Rate must be numeric" };
  }

  if (num < 2 || num > 11) {
    return {error:"Interest Rate must be between 2.000 thru 11.000, both values inclusive" };
  }

  return num;
}

function validateAmortization () {
  var value = document.getElementById("amortization").value;
  if (value.length === 0) {
    return {error:"Amortization can't be empty" };
  }

  var num = parseInt(value);

  if (isNaN(num)) {
    return {error:"Amortization must be numeric" };
  }

  if (num < 5 || num > 20) {
    return {error:"Amortization must be between 5 thru 20, both values inclusive" };
  }

  return num;
}

var btnMonthly = document.getElementById("btn-monthly");
var btnSF = document.getElementById("btn-sf");

btnMonthly.onclick = validationForPayment;
btnSF.onclick = completeFormValidation;
