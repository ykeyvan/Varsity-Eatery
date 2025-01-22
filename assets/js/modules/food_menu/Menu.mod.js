// ============================================================================
// File: Menu.mod.js
// ============================================================================
// Description: 
//    Provides the ability to dynamically display the "menu.json" data.
// ============================================================================

// ==== Function Declarations =================================================
// ============================================================================

// ==== initMenu() ============================================================
//
// Initial menu setup for a specific web page.
// 
// Parameters:
//   initEL        -- main contianer of the food menu element
//
// Return:
//   true          -- initialization complete
//   false         -- could not complete initialization
// ============================================================================
export async function initMenu(initEL){
  try {
    // Cache DOM elements
    menuEl = initEL;
    if(!menuEl){return false;}
  
    navEl = menuEl.querySelector('#menuNav');
    if(!navEl){return false;}
  
    infoEl = menuEl.querySelector('#menuInfo');
    if(!infoEl){return false;}
  
    titleEl = menuEl.querySelector('#menuTitle');
    if(!titleEl){return false;}
  
    itemsEl = menuEl.querySelector('#menuItems');
    if(!itemsEl){return false;}
  
    return true;
  } catch(e){
    console.log(e)
    return false;
  } // end of try/catch
} // end of initMenu()

// ==== fetchMenu() ===========================================================
//
// Obtain the "menu.json" data by calling the back-end.
// 
// Parameters:
//   none
//
// Return:
//   res.json()       -- fetch response data in json format 
//   false            -- an error was found
// ============================================================================
export async function fetchMenu() {
  try {
    let res = await fetch("/assets/php/handle/getMenu.han.php", {
      method: 'GET',
      headers: {
        "Accept": "application/json"
      },
    });
    let data = await res.json();
    if(res.status !== 200){
      console.log(data['error']);
      throw new Error("Server Responded with Status Code Error: " + res.status);
    }
    return data;
  } catch(e) {
    console.error(e);
    return false;
  } // end of try/catch
} // end of fetchMenu()

// ==== modSetMenu() ==========================================================
//
// Set the module's "menu" with the food menu data.
// 
// Parameters:
//   menuObj          -- the food menu data as an object
//
// Return:
//   undefined       -- no return statement
// ============================================================================
export function modSetMenu(menuObj){
  menu = menuObj;
} // end of modSetMenu()

// ==== modSetMenuCat() =======================================================
//
// Set the module's "cat" with the food menu categories.
// 
// Parameters:
//   catArr          -- an array of food menu categories
//
// Return:
//   undefined       -- no return statement
// ============================================================================
export function modSetMenuCat(catArr){
  cat = catArr;
} // end of modSetMenuCat()

// ==== mkMenuCat() ===========================================================
//
// Using the parameter, create an array of all categories in "menuObj".
// 
// Parameters:
//   menuObj        -- object of food menu
//
// Return:
//   catArr         -- array of food menu categories
//   false          -- an issue was encountered
// ============================================================================
export function mkMenuCat(menuObj){
  try {
    let catArr = [];
    for(let catName in menuObj){
      catArr.push(catName);
    }
    if(catArr.length === 0){return false;}
    return catArr;
  } catch(e) {
    console.log(e);
    return false;
  } // end of try/catch
} // end of mkMenuCat()

// ==== getParamCat() =========================================================
//
// Check if URL contains a category value and validate it. If it is valid
// return that value.
// 
// Parameters:
//   none
//
// Return:
//   catArr         -- the category in the URL parameter
//   false          -- the category was not valid
// ============================================================================
export function getParamCat(){
  let urlParam = new URLSearchParams(location.search);
  if(urlParam.has('cat')){
    let urlCat = urlParam.get('cat');
    if(isModCat(urlCat)){
      return urlCat;
    }
  }
  return false;
} // end of getParamCat()

// ==== isModCat() ============================================================
//
// Is the parameter a valid category if compared this module's "cat" variable.
// 
// Parameters:
//   catName        -- the name of a category
//
// Return:
//   true           -- the "catName" was valid
//   false          -- the "catName" was invalid
// ============================================================================
export function isModCat(catName){
  if(cat.includes(catName)){
    return true;
  }
  return false;
} // end of isModCat()

// ==== mkEl() ================================================================
//
// Create and return an element.
//
// Parameters:
//   elName       -- HTML tag name
//   atr          -- object of attributes names and thier values
//   txt          -- text to be inserted in the element as a text node
//
// Return:
//   el            -- desired element
// ============================================================================
function mkEl(elName, atr = false, txt = false){
  let el = document.createElement(elName);
  if(atr){
    let atrObj = Object.entries(atr);
    for(let [atrKey, atrVal] of atrObj){
      el.setAttribute(atrKey, atrVal);
    }
  }
  if(txt){
    let txtNode = document.createTextNode(txt);
    el.appendChild(txtNode);
  }
  return el;
} // end of mkEl()

// ==== dispMenuNav() =========================================================
//
// Display the food menu categories as a navigation menu.
//
// Parameters:
//   onLoadCat       -- name of a category to be used to initially display
//                      a category menu
//
// Return:
//   undefined       -- no return statement
// ============================================================================
export function dispMenuNav(onLoadCat){
  let ulEl = mkEl('UL', {'class':'menu__list'});
  for(let catName of cat) {
    let liEl = mkEl('LI', {'class':'menu__cat'}, catName);
    liEl.onclick = (ev) => {
      dispCatItems(ev.target);
    }
    if(onLoadCat === catName){
      dispCatItems(liEl);
    }
    ulEl.appendChild(liEl);
  } // end of for(of)
  navEl.appendChild(ulEl);
} // end of dispMenuNav()

// ==== dispCatItems() ========================================================
//
// Using "dispCat" validate that it is a valid category. Proceed to create the
// the menu of the desired "dispCat" category and insert it to a cached DOM 
// element "itemsEl". Update misc. data such as the title and category info.
//
// Parameters:
//   dispCat         -- name of a category
//
// Return:
//   undefined       -- no return statement
// ============================================================================
export function dispCatItems(dispCat){
  // Add active class to element
  if(isModCat(dispCat.innerText)){
    if(activeLi && activeLi.classList.contains('menu__cat--active')){
      activeLi.classList.remove('menu__cat--active');
    }
    dispCat.classList.add('menu__cat--active');
    activeLi = dispCat;
  }

  // Add category information
  infoEl.innerText = menu[dispCat.innerText]['info'];

  // Add category title
  titleEl.innerText = dispCat.innerText;

  // Display each food item
  let items = menu[dispCat.innerText]['items'];
  let ulEl = mkEl('UL', {'class':'cat__list'});

  for(let foodObj of items){
    let imgAtr = {
      'class':'cat__img',
      'src': foodObj['imgPath'],
      'alt': foodObj['imgAlt']
    }
    let liEl = mkEl('LI', {'class':'cat__item'});
    let imgEl = mkEl('IMG', imgAtr);
    let detailsEl = mkEl('DIV', {'class':'cat__details'});
    let nameEl = mkEl('H3', {'class':'cat__title'}, foodObj['name']);
    let descEl = mkEl('P', {'class':'cat__desc'}, foodObj['desc']);
    let priceEl = mkEl('SPAN', {'class':'cat__price'}, foodObj['price'].toFixed(2));

    detailsEl.appendChild(nameEl);
    detailsEl.appendChild(descEl);
    detailsEl.appendChild(priceEl);

    liEl.appendChild(imgEl);
    liEl.appendChild(detailsEl);

    ulEl.appendChild(liEl);
  } // end of for(of)

  // Remove all food menu items
  while(itemsEl.firstChild) {
    itemsEl.removeChild(itemsEl.lastChild);
  }

  // Display food menu items
  itemsEl.appendChild(ulEl);
} // end of dispCatItems()

// ==== dispCatChkboxes =======================================================
//
// Using the categories array, for each category display a checkbox with its 
// corresponding category name at the destination element.
// 
// Parameters:
//   catArr        -- array of food menu categories
//   destEl        -- the destination to insert the checkboxes
//
// Return:
//   false         -- an issue was encountered
// ============================================================================
export function dispCatChkboxes(catArr, destEl){
  let counter = 1;
  let divEl;

  try {
    for(let catName of catArr) {
      if(counter === 1){
        divEl = document.createElement('DIV');
        divEl.setAttribute('class', 'form__checkboxes');
      }

      let labelEl = document.createElement('LABEL');
      labelEl.setAttribute('class', 'form__label');

      let inputEl = document.createElement('INPUT');
      inputEl.setAttribute('class', 'form__chkbox');
      inputEl.setAttribute('type', 'checkbox');
      inputEl.setAttribute('name', 'favCat[]');
      inputEl.setAttribute('value', catName);
      let text = document.createTextNode(catName);

      labelEl.appendChild(inputEl);
      labelEl.appendChild(text);
      divEl.appendChild(labelEl);

      if(counter === 4){
        destEl.appendChild(divEl);
        divEl = null;
        counter = 1;
        continue;
      }

      ++counter;
    } // end of for(of)
  } catch(e) {
    console.log(e);
    return false;
  } // end of try/catch
} // end of dispCatChkboxes()

// ==== End of Function Declarations ==========================================
// ============================================================================

// ==== Variable Declarations =================================================
// ============================================================================

// Variables to cache DOM elements
let menuEl;
let navEl;
let infoEl;
let titleEl;
let itemsEl;
let activeLi = false;

// JSON data of food menu
let menu;
let cat;

// ==== End of Variable Declarations ==========================================
// ============================================================================
