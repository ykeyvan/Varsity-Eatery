<?php
  // ==========================================================================
  // file: getMenu.han.php
  // ==========================================================================
  // Description:
  //     Handle JavaScript's "fetch()" request to obtain a JSON food menu file
  //     
  // ==========================================================================


  // ==== Main Execution ======================================================
  //
  // ======== Load Include File ===============================================
  //  * Set the handler variable.
  //  * Append the include file for this script that will get the JSON data.
  //
  // ==========================================================================

  try {
    $getMenuHan = TRUE;
    $includeFullPath = realpath($_SERVER['DOCUMENT_ROOT'] . '/../protected_html/VarsitysEatery/php/include/getMenu.inc.php');
    if(file_exists($includeFullPath)){
      include_once($includeFullPath);
    } else {
      throw new Exception('Load Include File: Could not find include file');
    }
  } catch(Exception $e) {
    exit();
  }

  // ==== End of Main Execution ===============================================
  // ==========================================================================
