// ============================================================================
// File: main.js
// ============================================================================
// Description: Load necessary assets/web services for certain pages.
// ============================================================================

// ==== Get Food Menu =========================================================
// 
// The following Immediately-Invoked Function Expression will load the menu
// food items dynamically onto the page by using the "FoodMenu" module.
// 
// ============================================================================
(async function() {

  // ==== Variable Declarations ===============================================
  // ==========================================================================

  // Find elements in the DOM and import other modules to begin executing
  // this function.
  let menuEl = document.getElementById("menu");
  if(!menuEl){return;}

  let FoodMenu = await import('./modules/food_menu/Menu.mod.js');
  if(!FoodMenu){return;}
  if(!FoodMenu.initMenu(menuEl)){return;}

  let SessionStorage = await import('./modules/session_storage/SessionStorage.mod.js');
  if(!SessionStorage){return;}
  let seStSup = SessionStorage.initSessionStorage();

  // Menu object that holds the "menu.json" data
  let menuObj;

  // ==== End of Variable Declarations ========================================
  // ==========================================================================
  
  // ==== Main Execution ======================================================
  // ==========================================================================

  // Check if session storage has the "menu.json" data
  if(seStSup && SessionStorage.chkSeSt('menu')){
    // Obtain data from session storage and save it in the "FoodMenu" module
    menuObj = await SessionStorage.getBuffer();
    if(!menuObj){return;}
    FoodMenu.modSetMenu(JSON.parse(menuObj));
  } else {
    // Fetch the "menu.json" data from the backend, save it in session storage, 
    // and save it in the "FoodMenu" module
    menuObj = await FoodMenu.fetchMenu();
    if(!menuObj){return;}
    SessionStorage.setSeSt("menu", JSON.stringify(menuObj));
    FoodMenu.modSetMenu(menuObj);
  }

  // Check if session storage has the categories array data
  if(seStSup && SessionStorage.chkSeSt('menuCat')){
    // Obtain data from session storage and save it in the "FoodMenu" module
    let menuCat = await SessionStorage.getBuffer();
    if(!menuCat){return;}
    FoodMenu.modSetMenuCat(menuCat.split(','));
  } else {
    // Create the categories array using "menuObj", save it in session storage,
    // and save it in the "FoodMenu" module
    let menuCat = await FoodMenu.mkMenuCat(menuObj);
    if(!menuCat){return;}
    SessionStorage.setSeSt("menuCat", menuCat);
    FoodMenu.modSetMenuCat(menuCat);
  }

  // If present, obtain URL parameter value for "cat". Example: ("www...com/menu.php?cat=Breakfast").
  // Check if the value is a valid category name.
  // If so, display the category name menu; don't display the default menu.
  // Otherwise, display the default menu.
  let urlCat = FoodMenu.getParamCat();
  if(urlCat){
    FoodMenu.dispMenuNav(urlCat);
  } else {
    FoodMenu.dispMenuNav('Charbroiled Burgers');
  }
  // ==== End of Main Execution ===============================================
  // ==========================================================================

})(); // end of Immediately-Invoked Function Expression

// ==== End of Get Food Menu ==================================================
// ============================================================================

// ==== Send Contact Form =====================================================
// 
// The following Immediately-Invoked Function Expression will handle contact
// form submissions by importing the "SendContactForm" module. The module will
// validate known inputs and send the form data to the backend for further
// evaluation and update the form interface with any errors and/or successions.
// 
// ============================================================================
(async function() {

  // ==== Variable Declarations ===============================================
  // ==========================================================================

  // Find elements in the DOM to begin executing this function.
  let formEl = document.getElementById('sendContactForm');
  if(!formEl){return;}

  let catFieldset = formEl.querySelector('#chkboxFieldset');
  if(!catFieldset){return;}

  // "submitDelay" will help prevent spam submitting multiple forms
  // before the results of the first form is displayed
  let submitDelay = false;

  // Flag that tells us if the initial setup function has been called
  let init = false;

  // Categories read in by the food menu JSON file
  let cat;

  // range input for rating
  let ratingInput;

  // ==== End of Variable Declarations ========================================
  // ==========================================================================

  // ==== Main Execution ======================================================
  // ==========================================================================

  // Import a module that obtains the menu categories and save it as an array
  let FoodMenu = await import('./modules/food_menu/Menu.mod.js');
  if(!FoodMenu){return;}

  // Inport this module to check if the menu categories are already saved in a session storage.
  let SessionStorage = await import('./modules/session_storage/SessionStorage.mod.js');
  if(!SessionStorage){return;}
  let seStSup = SessionStorage.initSessionStorage();

  // Check if session storage has the categories array
  if(seStSup && SessionStorage.chkSeSt('menuCat')){
    // Get the categories array from session storage
    let menuCat = await SessionStorage.getBuffer();
    if(!menuCat){return;}
    cat = menuCat.split(',');
  } else { // Otherwise create the categories array
    // Fetch the menu.json file data from the backend
    let menuObj = await FoodMenu.fetchMenu();
    if(!menuObj){return;}

    // Create menu categories array & session store it
    let menuCat = await FoodMenu.mkMenuCat(menuObj);
    if(!menuCat){return;}
    cat = menuCat;
    SessionStorage.setSeSt("menuCat", cat);
  }
  
  // Display categories as checkboxes in the contact form fieldset element
  FoodMenu.dispCatChkboxes(cat, catFieldset);

  // Obtain range input
  ratingInput = formEl.querySelector('input[name="rating"]');

  // ==== End of Main Execution ===============================================
  // ==========================================================================

  // ==== Set Event Listeners =================================================
  // ==========================================================================

  // Set event listener to range input that will show range value to user
  if(ratingInput){
    let sliderVal = formEl.querySelector('#sliderVal');
    if(sliderVal){
      ratingInput.addEventListener('change', function(ev){
        sliderVal.innerHTML = ev.target.value;
      });
    } // end of if()
  } // end of if()

  // Set the event listener on form submit:
  // 1) Prevent default submit actions
  // 2) Set "submitDelay" & timer to delay next submit attempt
  // 3) Import module not yet cached
  // 4) Check if inital setup function should be called
  // 5) Make sure the text input "url" is empty
  // 6) Check static input values (range, radio button, & categories) 
  //    to make sure thier values were not manipulated in HTML
  // 7) Call the validation function for text inputs
  // 8) Update the form interface based on text inputs
  // 9) Make a new form object using all form inputs
  // 10) Submit the form to the backend for further evaluation & upload
  // 11) Update the form interface based on backend evaluation
  formEl.addEventListener('submit', async function(ev){
    ev.preventDefault();
    
    if(submitDelay){return;}

    // Allow a delay on next form submit
    submitDelay = true;

    let ContactForm = await import('./modules/contact_form/SendContactForm.mod.js');

    // Add the "disabled" attribute to the submit button
    // NOTE: This is the last thing preventing a submit attempt after the "submitDelay" delay.
    ContactForm.disableSubmitBtn(formEl);

    // Allow form submission after a certain amount of time
    setTimeout(() => {
      submitDelay = false;
    }, 3000);

    // Inital module setup
    if(!init){
      init = ContactForm.init(formEl);
    }

    // URL text input check
    // NOTE: This is a hidden input in the form. No interaction is necessary.
    if(!ContactForm.validateURL()){
      ContactForm.enableSubmitBtn(formEl);
      return;
    }

    // The following checks if any of the hard coded input values were altered
    if(!ContactForm.chkStaticInputValues(formEl, cat)){
      ContactForm.enableSubmitBtn(formEl);
      return;
    }

    // Check all text inputs
    let frontEndValidationRes = await ContactForm.validateTextInputs();
    // console.log(frontEndValidationRes);

    if(!frontEndValidationRes){
      ContactForm.enableSubmitBtn(formEl);
      return;
    }

    // Update form interface to display any messages related to the attempted form submission
    let validForm = ContactForm.chkTextInput(frontEndValidationRes);

    // Reject form & update interface if "validForm" is false
    if(!validForm){
      ContactForm.dispFormResults('rejectedForm');
      ContactForm.enableSubmitBtn(formEl);
      return;
    } // Otherwise, proceed to submit form to the backend

    // Update form interface to show a processing status
    ContactForm.dispFormResults('processForm');

    // Create a new form object using current form data
    // and filtered/validated form data
    let formattedFormData = await ContactForm.formatFormData(formEl);

    // Send form object to backend for further evaluation
    // before uploading to database
    let backEndValidationRes = await ContactForm.submitForm(formattedFormData);
    // console.log(backEndValidationRes);

    // Check backend validation results & update form interface status
    if(backEndValidationRes['form'] === 'acceptedForm'){ // Accepted form
      ContactForm.dispSubmittedForm(formEl);
    } else { // Rejected form
      ContactForm.dispFormResults(backEndValidationRes['form']);
      // Update text inputs interface
      ContactForm.chkTextInput(backEndValidationRes);
      ContactForm.enableSubmitBtn(formEl);
    }
  }); // end of addEventListener()

  // ==== End of Set Event Listeners ==========================================
  // ==========================================================================

})(); // end of Immediately-Invoked Function Expression

// ==== End of Send Contact Form ==============================================
// ============================================================================

// ==== Get Contact Form ======================================================
// 
// The following Immediately-Invoked Function Expression will handle the
// retrieval of previous form submissions by using the "GetContactForm" module.
// Both a name and an email are required to retrieve the desired contact form.
// 
// ============================================================================
(async function() {

  // ==== Variable Declarations ===============================================
  // ==========================================================================

  // Find elements in the DOM to begin executing this function.
  let formEl = document.getElementById('getContactForm');
  if(!formEl){return;}

  // "submitDelay" will help prevent spam submitting multiple forms
  // before the results of the first form is displayed
  let submitDelay = false;

  // Flag that tells us if the initial setup function has been called
  let init = false;

  // ==== End of Variable Declarations ========================================
  // ==========================================================================

  // ==== Set Event Listeners =================================================
  // ==========================================================================

  // Set the event listener on form submit:
  // 1) Prevent default submit actions
  // 2) Set "submitDelay" & timer to delay next submit attempt
  // 3) Import module not yet cached
  // 4) Check if inital setup function should be called
  // 5) Make sure the text input "url" is empty
  // 6) Check static input values (range, radio button, & categories) 
  //    to make sure thier values were not manipulated in HTML
  // 7) Call the validation function for text inputs
  // 8) Update the form interface based on text inputs
  // 9) Make a new form object using all form inputs
  // 10) Submit the form to the backend for further evaluation & upload
  // 11) Update the form interface based on backend evaluation
  formEl.addEventListener('submit', async function(ev){
    ev.preventDefault();

    if(submitDelay){return;}

    // Allow a delay on next form submit
    submitDelay = true;

    let ContactForm = await import('./modules/contact_form/GetContactForm.mod.js');

    // Add the "disabled" attribute to the submit button
    // NOTE: This is the last thing preventing a submit attempt after the "submitDelay" delay.
    ContactForm.disableSubmitBtn(formEl);

    // Allow form submission after a certain amount of time
    setTimeout(() => {
      submitDelay = false;
    }, 3000);

    // Inital module setup
    if(!init){
      init = ContactForm.initContact(formEl);
    }

    // URL text input check
    // NOTE: This is a hidden input in the form. No interaction is necessary.
    if(!ContactForm.validateURL()){
      ContactForm.enableSubmitBtn(formEl);
      return;
    }

    // Check all text inputs
    let frontEndValidationRes = await ContactForm.validateTextInputs();
    // console.log(frontEndValidationRes);

    if(!frontEndValidationRes){
      ContactForm.enableSubmitBtn(formEl);
      return;
    }

    // Update form interface to display any messages related to the attempted form retrieval
    let validForm = ContactForm.chkTextInput(frontEndValidationRes);

    // // Reject form & update interface if "validForm" is false
    if(!validForm){
      ContactForm.dispFormResults('rejectedForm');
      ContactForm.enableSubmitBtn(formEl);
      return;
    }

    // Update form interface to show a processing status
    ContactForm.dispFormResults('processForm');

    // Create a new form object using current form data
    let formattedFormData = await ContactForm.formatFormData(formEl);

    // Send form object to the backend for further evaluation & upload
    let backEndValidationRes = await ContactForm.submitForm(formattedFormData);
    // console.log(backEndValidationRes);

    // Check backend validation results & update form interface status
    if(backEndValidationRes['form'] === 'acceptedForm'){ // Accepted form
      if(backEndValidationRes['data']){
        ContactForm.dispSubmittedForm(backEndValidationRes['data']);
        ContactForm.enableRetry(formEl);
      }
    } else { // Rejected formfrontEndValidationRes
      ContactForm.dispFormResults(backEndValidationRes['form']);
      ContactForm.enableSubmitBtn(formEl);
    }
  }); // end of addEventListener()

  // ==== End of Set Event Listeners ==========================================
  // ==========================================================================

})(); // end of Immediately-Invoked Function Expression

// ==== End of Get Contact Form ===============================================
// ============================================================================

// ==== Secret Art Handling ===================================================
// 
// The following Immediately-Invoked Function Expression can display a secret
// art activated by the user.
// 
// ============================================================================
(function() {

  // Find elements in the DOM to begin executing this function.
  let pollo = document.getElementById('marco');
  if(!pollo){return;}
  
  import('./modules/misc/SecretArt.mod.js').then((SecretArt) => {
    document.addEventListener('keydown', async function(ev){
      if(SecretArt.isResFlag()){return}

      if(!SecretArt.chkCmd(ev)){ return}

      let content = await SecretArt.getSecretArt();

      if(content){
        SecretArt.dispSecretArt(pollo, content);
      }
    });
  });

})(); // end of Immediately-Invoked Function Expression

// ==== End of Secret Art Handling ============================================
// ============================================================================
