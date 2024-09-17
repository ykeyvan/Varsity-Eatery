// ============================================================================
// File: SessionStorage.mod.js
// ============================================================================
// Description: 
//    This module provides a way to interact with browser session storage.
//    NOTE: "seSt" or "SeSt" is short for "SessionStorage".
// ============================================================================

// ==== Function Declarations =================================================
// ============================================================================

// ==== initSessionStorage() ==================================================
//
// Create a session storage object and save it to this module. Test if session
// storage is support on the current browser.
// 
// Parameters:
//   none
//
// Return:
//   true          -- initialization complete; session storage supported
//   false         -- session storage is not supported
// ============================================================================
export function initSessionStorage() {
  try {
    seSt = window.sessionStorage;
    seSt.setItem('t', 1);
    seSt.removeItem('t');    
    return true;
  } catch(e) {
    return false;
  }
} // end of initSessionStorage()

// ==== chkSeSt() =============================================================
//
// Check if the parameter "item" exists in session storage. The value,
// regardless of containing a value, will be stored in this module's "buffer".
// 
// Parameters:
//   item          -- name of the session storage
//
// Return:
//   true          -- the buffer is set
//   false         -- no value was found
// ============================================================================
export function chkSeSt(item){
  buffer = null;
  buffer = seSt.getItem(item);
  if(buffer){
    return true;
  }
  return false;
} // end of chkSeSt()

// ==== getBuffer() ===========================================================
//
// Obtain module's buffer value and return it.
// 
// Parameters:
//   none
//
// Return:
//   buffer        -- session storage value
// ============================================================================
export function getBuffer(){
  return buffer;
} // end of getBuffer()

// ==== setSeSt() =============================================================
//
// Set a session storage item and its value.
// 
// Parameters:
//   key            -- name of the session storage item
//   val            -- value of the session storage item
//
// Return:
//   undefined      -- no return statement
// ============================================================================
export function setSeSt(key, val){
  seSt.setItem(key, val);
} // end of setSeSt()

// ==== End of Function Declarations ==========================================
// ============================================================================

// ==== Variable Declarations =================================================
// ============================================================================

// Session storage object
let seSt;
// Value of a session storage item
let buffer;

// ==== End of Variable Declarations ==========================================
// ============================================================================
