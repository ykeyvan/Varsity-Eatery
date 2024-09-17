<?php
  // ==========================================================================
  // file: getSecretArt.han.php
  // ==========================================================================
  // Description: Handle Javascript's data request to get an image.
  // ==========================================================================

  // ==== Main Execution ======================================================
  // ==========================================================================

  try {
    $getSecretArtHan = TRUE;
    // Production
    // include_once(realpath($_SERVER['DOCUMENT_ROOT'] . '/../protected_html/VarsitysEatery/php/include/getSecretArt.inc.php'));
 
    // Development
    include_once(realpath('protected_html/VarsitysEatery/php/include/getSecretArt.inc.php'));
  } catch (Exception $e) {
    exit();
  }
  
  // ==== End of Execution ====================================================
  // ==========================================================================
?>
