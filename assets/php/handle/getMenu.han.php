<?php
  // ==========================================================================
  // file: getMenu.han.php
  // ==========================================================================
  // Description:
  //     Handle JavaScript's "fetch()" request to obtain a JSON food menu file
  //     
  // ==========================================================================


  // ==== Main Execution ======================================================
  try {
    header('Content-Type: application/json');
    // Get JSON food menu & echo its contents
    $jsonMenuPath = '/var/www/html/assets/json/menu.json';
    // $menuFullPath = realpath($_SERVER['DOCUMENT_ROOT'] . '/../protected_html/json/menu.json');

    if(file_exists($jsonMenuPath)){
      $jsonMenu = file_get_contents($jsonMenuPath, TRUE);
      http_response_code(200);
      echo($jsonMenu);
    } else {
      throw new Exception('PHP Exception: JSON menu file not found: ' . $jsonMenuPath . ' Current Directory: ' . getcwd());
    }
  } catch(Exception $e) {
    http_response_code(422);
    echo json_encode(array("error" => $e->getMessage()));
  }
  // ==== End of Main Execution ===============================================
  // ==========================================================================