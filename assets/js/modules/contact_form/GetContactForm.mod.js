// ============================================================================
// File: GetContactForm.mod.js
// ============================================================================
// Description:
//    Module for contact form retrieval. Validates form inputs, informs users
//    of good or bad inputs or if the form is out of service. Ultimatly a
//    submited request will be validated using this script and further
//    evaluations will be made in the backend before any results are retrieved.
// ============================================================================

// ==== Function Declarations =================================================
// ============================================================================

// ==== disableSubmitBtn() ====================================================
//
// Find and disable the submit button.
//
// Parameters:
//   formEl       -- contact form element
//
// Return:
//   undefined    -- no return statement
//
// ============================================================================
export function disableSubmitBtn(formEl){
  formEl.querySelector('input[name="submit"]').disabled = true;
} // end of disableSubmitBtn()

// ==== enableRetry() =========================================================
//
// Find and enable the submit button.
//
// Parameters:
//   formEl       -- contact form element
//
// Return:
//   undefined    -- no return statement
//
// ============================================================================
export function enableRetry(formEl){
  formEl.querySelector('input[name="retry"]').disabled = false;
} // end of enableRetry()

// ==== enableSubmitBtn() =====================================================
//
// Find and change the submit button to not be disabled.
//
// Parameters:
//   formEl  -- contact form element
//
// Return:
//   undefined    -- no return statement
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
      'email': null
    };

    // Obtain text input values
    let name = nameInput.value;
    let email = emailInput.value;

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
//   validationResults  -- an array object with the name of the input and a
//                         code assigned as its value  
//
// Return:
//   true        -- if the inputRes codes all have valid codes
//   false       -- if at least one input is found with an invalid code
//
// ============================================================================
export function chkTextInput(validationResults){
  let validForm = true;

  for(let key in validationResults){
    if(key === 'form' || key === 'data'){
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
//   elName     -- name of the input element
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
// ============================================================================
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
  } else if(code === 'noFormsFound') {
    fyiHeader.innerHTML = getCodeMsg('noFormsFound');
    fyiHeader.style.setProperty("--fyiHeaderTextColor", colorPalette["yellow"]);
    btnFieldset.style.setProperty("--btnFieldsetBorder", colorPalette["yellow"]);
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
  formattedFormData.append('jsGetValid', true);
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
    let res = await fetch('/assets/php/handle/getContactForm.han.php', {
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

// ==== initContact() =========================================================
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
export function initContact(formEl){
  // Cache form input and text elements
  contactFormContainer = document.getElementById("contactFormContainer");
  getResDiv = document.getElementById("getRes");
  fyiHeader = document.getElementById("fyiGetContactForm");
  btnFieldset = formEl.querySelector("#getBtnFieldset");
  nameText = formEl.querySelector("#nameText");
  nameInput = formEl.querySelector('input[name="name"]');
  emailText = formEl.querySelector("#emailText");
  emailInput = formEl.querySelector('input[name="email"]');
  urlInput = formEl.querySelector('input[name="url"]');
  retryBtn = formEl.querySelector('input[name="retry"]');

  retryBtn.addEventListener('click', function(ev){
    enableSubmitBtn(formEl);
  });

  return true;
} // end of initContact()

// ==== dispSubmittedForm() ===================================================
//
// Remove the form elements, display container if neccessary, and add the
// contact form(s) data
//
// Parameters:
//   data         -- contact form(s) data
//
// Return:
//   undefined    -- no return statement
//
// ============================================================================
export function dispSubmittedForm(data){
  dispFormResults('acceptedForm');

  // Remove any content in the display element
  while(getResDiv.firstChild) {
    getResDiv.removeChild(getResDiv.lastChild);
  }

  // Display element container
  if(getResDiv.classList.contains('dne')){
    getResDiv.classList.remove('dne');
  }

  // Add the contact forms
  getResDiv.innerHTML = data;
} // end of dispSubmittedForm()

// ==== End of Function Declarations ==========================================
// ============================================================================

// ==== Variable Declarations =================================================
// ============================================================================

// Variables to cache element inputs, element text, etc
let contactFormContainer
let getResDiv;
let fyiHeader;
let btnFieldset;
let nameText;
let nameInput;
let emailText;
let emailInput;
let urlInput;
let retryBtn;

// Regular Expresion for "validateText()"
let regExName = /^[a-zA-Z]{2,}[\s]{0,1}[a-zA-Z]{0,}[\s]{0,1}[a-zA-Z]{0,}$/;
let regExEmail = /\S+@\S+\.\S+/;

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
  "unkVal": "Invalid input found",
  "rejectedForm": "Could not send contact form! Check information below.",
  "processForm": "Processing form...",
  "acceptedForm": "Contact form found!",
  "noFormsFound": "There were no contact form(s) found.",
  "noService": "Service is currently down. Sorry for the inconvenience."
}

// ==== End of Variable Declarations ==========================================
// ============================================================================
