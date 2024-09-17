// ============================================================================
// File: SendContactForm.mod.js
// ============================================================================
// Description:
//    Module for contact form submissions. Validates form inputs, informs users
//    of good or bad inputs or if the form is out of service. Ultimatly submits
//    the contact form to the backend for its evaluation and upload.
// ============================================================================

// ==== Function Declarations =================================================
// ============================================================================

// ==== disableSubmitBtn() ====================================================
//
// Find and disable the submit button.
//
// Parameters:
//   formEl    -- contact form element
//
// Return:
//   none
//
// ============================================================================
export function disableSubmitBtn(formEl){
  formEl.querySelector('input[name="submit"]').disabled = true;
} // end of disableSubmitBtn()

// ==== enableSubmitBtn() =====================================================
//
// Find and change the submit button to not be disabled.
//
// Parameters:
//   formEl    -- contact form element
//
// Return:
//   none
//
// ============================================================================
export function enableSubmitBtn(formEl){
  formEl.querySelector('input[name="submit"]').disabled = false;
} // end of enableSubmitBtn()

// ==== validateURL() =========================================================
//
// Get the current url input value and check if it contains a value. This input
// value is an attempt to stop form automation.
// 
// Parameters:
//   none
//
// Return:
//   true    -- url value does not contain a value
//   false   -- url value has been declared a value
//
// ============================================================================
export function validateURL(){
  let url = urlInput.value;
  if(url){
    return false;
  }
  return true;
}  // end of validateURL()

// ==== chkStaticInputValues() ================================================
//
// Call validation functions for all static inputs, such as the range, radio
// buttons, and checkbox inputs, to verify thier values to be accurate.
//
// Parameters:
//   formEl       -- contact form element
//   categories   -- array of JSON defined food categories
//
// Return:
//   true         -- all static input values are valid
//   false        -- altered static input values found
//
// ============================================================================
export function chkStaticInputValues(formEl, categories){
  if(!validateRating() || !validateCustRet(formEl) || !validateFavCat(formEl, categories)){
    return false;
  }
  return true;
} // end of chkStaticInputValues()

// ==== validateRating() ======================================================
//
// Get the current rating input value and make sure it is a number within a
// certain range.
//
// Parameters:
//   none
//
// Return:
//   true    -- rating value is valid
//   false   -- rating value did not fit the criteria
//
// ============================================================================
function validateRating(){
  try {
    let rating = parseInt(ratingInput.value);
    if(typeof rating !== 'number' || rating < 1 || rating > 10){
      return false;
    }
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
} // end of validateRating()

// ==== validateCustRet() =====================================================
//
// Get all radio button inputs with name="retCut". Find which input has been
// "checked" and make sure the value is either "yes", "maybe", or "no".
//
// Parameters:
//   formEl  -- form element
//
// Return:
//   true    -- radio button input value is valid
//   false   -- radio button input value did not fit the criteria
//
// ============================================================================
function validateCustRet(formEl){
  try {
    let retCustInput = formEl.querySelectorAll('input[name="retCust"]');
    if(!retCustInput){
      return false;
    }

    for(let i = 0; i < retCustInput.length; ++i){
      if(retCustInput[i].checked){
        if(retCustInput[i].value === 'yes' || retCustInput[i].value === 'maybe' || retCustInput[i].value === 'no'){
          return true;
        }
        if(i === retCustInput.length - 1){
          return false;
        }
      } // end of if()
    } // end of for()
  } catch(e){
    console.log(e);
    return false;
  }
} // end of validateCustRet()

// ==== validateFavCat() ======================================================
//
// Get all favorite food categories and compare the values of the inputs with 
// the "checked" attribute to the JSON defined categories to make sure they are 
// valid. If valid, store all inputs with "checked" attribute into 
// "userSelectedCat" array, 
//
// Parameters:
//   formEl       -- form element
//   categories   -- array of JSON defined food categories
//
// Return:
//   true         -- radio button input value is valid
//   false        -- radio button input value did not fit the criteria
//
// ============================================================================
function validateFavCat(formEl, categories){
  try {
    // Clear the checkbox categories and check if the new "checked" categories match
    // the onces in the food menu JSON file's categories
    userSelectedCat = [];
    let chkboxInputs = formEl.querySelectorAll('input[name="favCat[]"]');
    if(!chkboxInputs){
      return false;
    }
    if(chkboxInputs){
      for(let i = 0; i < chkboxInputs.length; ++i){
        if(chkboxInputs[i].checked){
          if(!categories.includes(chkboxInputs[i].value)){
            return false;
          } else {
            userSelectedCat.push(chkboxInputs[i].value);
          }
        } // end of if()
      } // end of for()
      // console.log(userSelectedCat);
      return true;
    } else {
      return false;
    }
  } catch(e) {
    console.log(e);
    return false;
  }
} // end of validateFavCat()

// ==== validateTextInputs() ==================================================
//
// Get the values of each text inputs and validate each of them individually.
// An array object is created with the name of the text input and a code that 
// represents the result of its validation. This code dictates if the text
// input is valid or has a specific bad input.
// 
// Parameters:
//   none
//
// Return:
//   false      -- if an unexpected issue is found
//   res        -- an array object with the name of the text input and a 
//                 corresponding code assigned as its value
//
// ============================================================================
export function validateTextInputs(){
  try {
    // Text inputs with thier codes
    let res = {
      'name': null,
      'email': null,
      'telNum': null,
      'persFavFood': null,
      'msg': null
    };

    // Obtain text input values
    let name = nameInput.value;
    let email = emailInput.value;
    let telNum = telNumInput.value;
    let persFavFood = persFavFoodInput.value;
    let msg = msgInput.value;

    // Validate name
    if(name === ""){
      res['name'] = 'noName';
    } else if(name.length < 2 || name.length > 20){
      res['name'] = 'lenName';
    } else if(!regExName.test(name)){
      res['name'] = 'notName';
    } else {
      res['name'] = 'validName';
    }

    // Validate email
    if(email === ""){
      res['email'] = 'noEmail';
    } else if(email.length > 254){
      res['email'] = 'lenEmail';
    } else if(!regExEmail.test(email)){
      res['email'] = 'notEmail';
    } else {
      res['email'] = 'validEmail';
    }

    // Validate telephone number
    if(telNum === ""){
      res['telNum'] = 'defaultTelNum';
    } else if(telNum.length !== 10){
      res['telNum'] = 'lenTelNum';
    } else if(!regExTelNum.test(telNum)){
      res['telNum'] = 'notTelNum';
    } else {
      res['telNum'] = 'validTelNum';
    }

    // Validate personal favorite food
    if(persFavFood === ""){
      res['persFavFood'] = 'defaultPersFavFood';
    } else if(persFavFood.length < 2 || persFavFood.length > 20){
      res['persFavFood'] = 'lenPersFavFood';
    } else if(!regExPersFavFood.test(persFavFood)){
      res['persFavFood'] = 'notPersFavFood';
    } else {
      res['persFavFood'] = 'validPersFavFood';
    }

    // Validate customer message
    if(msg === ""){
      res['msg'] = 'noMsg';
    } else if(msg.length < 2 && msg.length > 256){
      res['msg'] = 'lenMsg';
    } else {
      res['msg'] = 'validMsg';
    }
    
    return res;
  } catch(e) {
    console.log(e);
    return false
  }
} // end of validateTextInputs()

// ==== chkTextInput() ========================================================
//
// For each "inputRes" element check if the code is valid and invalid.
// Update the form interface by changing the "innerHTML" to reflect if 
// the input was good or bad. A main variable "res" keeps track of the
// overall result of all inputs checked.
// 
// Parameters:
//   validationResults    -- an array object with the name of the input and a
//                           code assigned as its value  
//
// Return:
//   true        -- if the inputRes codes all have valid codes
//   false       -- if at least one input is found with an invalid code
//
// ============================================================================
export function chkTextInput(validationResults){
  let validForm = true;

  for(let key in validationResults){
    if(key === 'form'){
      continue;
    }

    let capKey = key.charAt(0).toUpperCase() + key.slice(1)
    let res = getTextInputEl(key);

    if(!res){
      return false;
    }

    if(validationResults[key] === 'valid' + capKey){
      res["elText"].innerHTML = getCodeMsg(validationResults[key]);
      res["elInput"].style.setProperty("--" + key + "InputBorder", colorPalette["green"]);
      res["elText"].style.setProperty("--" + key + "TextColor", colorPalette["green"]);
    } else if(validationResults[key] === 'default' + capKey){
      res["elText"].innerHTML = getCodeMsg(validationResults[key]);
      res["elInput"].style.setProperty("--" + key + "InputBorder", colorPalette["black"]);
      res["elText"].style.setProperty("--" + key + "TextColor", colorPalette["black"]);
    } else {
      validForm = false;
      res["elText"].innerHTML = getCodeMsg(validationResults[key]);
      res["elInput"].style.setProperty("--" + key + "InputBorder", colorPalette["red"]);
      res["elText"].style.setProperty("--" + key + "TextColor", colorPalette["red"]);
    }
  } // end of for(in)
  return validForm;
} // end of chkTextInput()

// ==== getTextInputEl() ======================================================
//
// Set text and input color in the form to represent the current status of
// the attempted form submission.
// 
// Parameters:
//   elName       -- name of the input element
//
// Return:
//   res        -- object of cached input elements
//   false      -- cached input elements not found
//
// ============================================================================
function getTextInputEl(elName){
  let res = {
    "elInput": null,
    "elText": null,
  }

  switch(elName){
    case 'name':
      res["elInput"] = nameInput;
      res["elText"] = nameText;
      break;
    case 'email':
      res["elInput"] = emailInput;
      res["elText"] = emailText;
      break;
    case 'telNum':
      res["elInput"] = telNumInput;
      res["elText"] = telNumText;
      break;
    case 'persFavFood':
      res["elInput"] = persFavFoodInput;
      res["elText"] = persFavFoodText;
      break;
    case 'msg':
      res["elInput"] = msgInput;
      res["elText"] = msgText;
      break;
    default:
      return false;
  }

  return res;
} // end of getTextInputEl()

// ==== getCodeMsg() ==========================================================
//
// Using a passed in code, use an array object called "codeMsg" to
// determine what its corresponding message is.
// 
// Parameters:
//   code        -- a code that helps identify a message
//
// Return:
//   return      -- if the code if found in "codeMsg" return its string
//                  message or a default message if not found
//
// ===========================================================================
function getCodeMsg(code){
  for(let key in codeMsg){
    if(key === code){
      return codeMsg[key];
    }
  }
  return codeMsg['unkVal'];;
} // end of getCodeMsg()

// ==== dispFormResults() =====================================================
//
// This function changes the header text and color of certain areas in the
// form to represent the current status of the attempted form submission.
// 
// Parameters:
//   code        -- a code that helps identify a message
//
// Return:
//   undefined     -- no return statement
//
// ============================================================================
export function dispFormResults(code){
  // Form message/color results
  if(code === 'processForm') {
    fyiHeader.innerHTML = getCodeMsg('processForm');
    fyiHeader.style.setProperty("--fyiHeaderTextColor", colorPalette["yellow"]);
    btnFieldset.style.setProperty("--btnFieldsetBorder", colorPalette["yellow"]);
  } else if(code === 'rejectedForm') {
    fyiHeader.innerHTML = getCodeMsg('rejectedForm');
    fyiHeader.style.setProperty("--fyiHeaderTextColor", colorPalette["red"]);
    btnFieldset.style.setProperty("--btnFieldsetBorder", colorPalette["red"]);
  } else if(code === 'acceptedForm') {
    fyiHeader.innerHTML = getCodeMsg('acceptedForm');
    fyiHeader.style.setProperty("--fyiHeaderTextColor", colorPalette["green"]);
    btnFieldset.style.setProperty("--btnFieldsetBorder", colorPalette["green"]);
  } else if(code === 'noService') {
    fyiHeader.innerHTML = getCodeMsg('noService');
    fyiHeader.style.setProperty("--fyiHeaderTextColor", colorPalette["yellow"]);
    btnFieldset.style.setProperty("--btnFieldsetBorder", colorPalette["yellow"]);
  }
} // end of dispFormResults()

// ==== formatFormData() ======================================================
//
// Create a new form data object using data provided from the contact form.
// Add and update certain data and return the results.
//
// Parameters:
//   formEl               -- form element
//
// Return:
//   formattedFormData    -- a form data object with contact form values
//
// ============================================================================
export function formatFormData(formEl){
  let formattedFormData = new FormData(formEl);
  formattedFormData.append('jsSendValid', true);
  formattedFormData.delete('favCat[]');
  if(userSelectedCat.length > 0){
    for(let i = 0; i < userSelectedCat.length; ++i){
      formattedFormData.append('favCat[]', userSelectedCat[i]);
    }
  } else {
    formattedFormData.append('favCat', null);
  }
  return formattedFormData;
} // end of formatFormData()

// ==== submitForm() ==========================================================
//
// Attempt to send the form object (contact form) to the backend for further
// validation and upload to database. This function also calls other
// functions that will update the form user interface to represent the
// current status of the form submission.
//
// Parameters:
//   formattedFormData    -- a form data object with contact form values
//
// Return:
//   res.json()           -- response data in json format 
//   undefined            -- no return statement
//
// ============================================================================
export async function submitForm(formattedFormData){
  try {
    let res = await fetch('/assets/php/handle/VarsitysEatery/sendContactForm.han.php', {
      method: 'POST',
      body: formattedFormData,
      headers: {
        "Accept": "application/json"
      },
    });
  
    if(res.status !== 200){
      throw new Error("Server response error");
    }

    // console.log(res.text());
    return res.json();

  } catch(err) {
    dispFormResults('noService');
    console.log(err);
  }
} // end of submitForm()

// ==== init() ================================================================
//
// Cache form element input's and other relevent elements. Set event listeners.
//
// Parameters:
//   formEl    -- form element's id
//
// Return:
//   true      -- if successfully executed function
//
// ============================================================================
export function init(formEl){
  // Cache form input and text elements
  contactFormContainer = document.getElementById("sendContactFormContainer");
  fyiHeader = document.getElementById("fyiSendContactForm");
  btnFieldset = formEl.querySelector("#sendBtnFieldset");
  nameText = formEl.querySelector("#nameText");
  nameInput = formEl.querySelector('input[name="name"]');
  emailText = formEl.querySelector("#emailText");
  emailInput = formEl.querySelector('input[name="email"]');
  telNumText = formEl.querySelector("#telNumText");
  telNumInput = formEl.querySelector('input[name="telNum"]');
  persFavFoodText = formEl.querySelector("#persFavFoodText");
  persFavFoodInput = formEl.querySelector('input[name="persFavFood"]');
  urlInput = formEl.querySelector('input[name="url"]');
  msgText = formEl.querySelector("#msgText");
  msgInput = formEl.querySelector('textarea[name="msg"]');
  ratingInput = formEl.querySelector('input[name="rating"]');

  // console.log('Cached DOM elements');

  return true;
} // end of init()

// ==== dispSubmittedForm() ===================================================
//
// Remove the form element to prevent the user from resubmitting the same form.
// This function also creates a final message to tell the user that the form
// was successfully submitted.
//
// Parameters:
//   formEl       -- form element's id
//
// Return:
//   undefined    -- no return statement
//
// ============================================================================
export function dispSubmittedForm(formEl){
  dispFormResults('acceptedForm');

  let divEl = document.createElement('DIV');
  divEl.setAttribute('class', 'form');

  let pEl = document.createElement('P');
  pEl.setAttribute('class', 'form__sent-message');
  let text = document.createTextNode('Thank you ' + nameInput.value + '!');

  pEl.appendChild(text);
  divEl.appendChild(pEl);

  formEl.remove();
  contactFormContainer.append(divEl);
} // end of dispSubmittedForm()

// ==== End of Function Declarations ==========================================
// ============================================================================

// ==== Variable Declarations =================================================
// ============================================================================

// Variables to hold element inputs and thier element text
let contactFormContainer
let fyiHeader;
let btnFieldset;
let nameText;
let nameInput;
let emailText;
let emailInput;
let telNumText;
let telNumInput;
let persFavFoodText;
let persFavFoodInput;
let urlInput;
let msgText;
let msgInput;
let ratingInput;
// User selected categories
let userSelectedCat = [];
// Regular Expresion for "validateText()"
let regExName = /^[a-zA-Z]{2,}[\s]{0,1}[a-zA-Z]{0,}[\s]{0,1}[a-zA-Z]{0,}$/;
let regExEmail = /\S+@\S+\.\S+/;
let regExTelNum = /^[0-9]+/;
let regExPersFavFood = /^[a-zA-Z]{2,}[\s]{0,1}[a-zA-Z]{0,}[\s]{0,1}[a-zA-Z]{0,}$/;

// Colors for text/input changes
let colorPalette = {
  "black": "#000",
  "red": "#9b1515",
  "green": "#00b300",
  "yellow": "#fffb00"
}

// List that translates a code to a text message
let codeMsg = {
  "defaultName": "Name*",
  "noName": "Please enter your name",
  "lenName": "Name must be 2 to 20 characters long",
  "notName": "Enter a name without numbers or special characters",
  "validName": "Name was entered corretly",
  "defaultEmail": "Email*",
  "noEmail": "Please enter your email",
  "lenEmail": "Email is too long",
  "notEmail": "Incorrect email format",
  "validEmail": "Email was entered corretly",
  "defaultMsg": "Your Message*",
  "noMsg": "Please enter your message",
  "lenMsg": "Message is too long (limit: 128 characters)",
  "notMsg": "Invalid message",
  "validMsg": "Message was entered corretly",
  "defaultTelNum": "Phone number",
  "lenTelNum": "Phone number too is too long (limit: 10 characters)",
  "notTelNum": "Invalid phone number (Only enter a 10 digit number)",
  "validTelNum": "Phone number was entered corretly",
  "defaultPersFavFood": "Personal favorite food",
  "lenPersFavFood": "Personal favorite food is too long (limit: 12 characters)",
  "notPersFavFood": "Enter a personal favorite food without numbers or special characters",
  "validPersFavFood": "Personal favorite food was entered corretly",
  "unkVal": "Invalid input found",
  "rejectedForm": "Could not send contact form! Check information below.",
  "processForm": "Processing form...",
  "acceptedForm": "Contact form sent!",
  "noService": "Service is currently down. Sorry for the inconvenience."
}

// ==== End of Variable Declarations ==========================================
// ============================================================================
