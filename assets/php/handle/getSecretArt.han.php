<?php
  // ==========================================================================
  // file: getSecretArt.inc.php
  // ==========================================================================
  // Date: 1/4/2021
  // Description: 
  // ==========================================================================

  // ==== Main Execution ======================================================
  // ==========================================================================
  try{
    header('Content-Type: image/png');
    $pic = file_get_contents('/var/www/html/images/misc/secretArt.png');
    if($pic){
      echo($pic);
    } else {
      throw new Exception('PHP Exception: No secret found');
    }
  } catch(Exception $e) {
    http_response_code(422);
    echo json_encode(array("error" => $e->getMessage()));
  }
  // ==== End of Main Execution ===============================================
  // ==========================================================================
?>