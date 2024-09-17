// ============================================================================
// File: SecretArt.mod.js
// ============================================================================
// Description: Enter a code to display a secret.
// ============================================================================

// ==== Function Declarations =================================================
// ============================================================================

// ==== chkCmd() ==============================================================
//
// Check keyboard commands.
//
// Parameters:
//   ev            -- keydown event data
//
// Return:
//   true          -- Konami Code has been enter successfully
//   undefined     -- no return statement
// ============================================================================
export function chkCmd(ev){
  let key = keys[ev.keyCode];
  let reqKey = cDirect[cPos];
  if(key == reqKey){
    ++cPos;
    if(cPos == cDirect.length) {
      cPos = 0;
      return true;
    }
  } else {
    cPos = 0;
  }
} // end of chkCmd()

// ==== isResFlag() ===========================================================
// 
// Check if the "resFlag" is true.
//
// Parameters:
//   none
//
// Return:
//   true     -- "resFlag" is true
//   false    -- "resFlag" is false
// ============================================================================
export function isResFlag(){
  if(resFlag){
    return true;
  }
  return false;
} // end of isResFlag()

// ==== getSecretArt() ========================================================
//
// Obtain the secret art by fetching a PHP file handler. If successful, set the
// resFlag to be true.
// 
// Parameters:
//   none
//
// Return:
//   url        -- the secret art
//   false      -- something went wrong
// ============================================================================
export async function getSecretArt(){
  try {
    let res = await fetch("/assets/php/handle/VarsitysEatery/getSecretArt.han.php");

    if(res.status !== 200){
      throw new Error("Server response error");
    }

    let data = await res.blob();
    let url = URL.createObjectURL(data);
    resFlag = true;
    return url;
  } catch(e) {
    console.log(e);
    return false;
  }
} // end of getSecretArt()

// ==== dispSecretArt() =======================================================
// 
// Create the image element and remove the "dne" class to reveal the secret.
// 
// Parameters:
//   pollo            -- destination element to place the secret art
//   content          -- secret art
//
// Return:
//   undefined        -- no return statement
// ============================================================================
export function dispSecretArt(pollo, content){
  let img = document.createElement('IMG');
  img.setAttribute('src', content);
  pollo.appendChild(img);
  pollo.classList.remove('dne');
} // end of dispSecretArt()

// ==== End of Function Declarations ==========================================
// ============================================================================

// ==== Variable Declarations =================================================
// ============================================================================

const cDirect = ['up', 'up', 'down', 'down', 'left', 'right', 'left','right', 'a', 'b'];
let cPos = 0;
let resFlag = false;
const keys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
}

// ==== End of Variable Declarations ==========================================
// ============================================================================
