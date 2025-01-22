<?php
  // ==========================================================================
  // file: sendContactForm.han.php
  // ==========================================================================
  // Description:
  //     Handle JavaScript's "fetch()" request to submit and upload contact
  //     form to database. This script also contains the last "catch(){}" block
  //     that will send back a "noService" response to the calling "fetch()".
  // ==========================================================================

  // ==== Main Execution ======================================================
  //
  // ======== Form Data Check =================================================
  //  * Make sure certain "$_POST[]" data is set/not set before "include()"ing
  //    the code that will validate and download the contact form(s).
  //
  // ======== Load Include File ===============================================
  //  * Set the handler variable.
  //  * Append the include file for this script.
  //
  // ==========================================================================

  try {
    if(isset($_POST['jsSendValid']) && $_POST['url'] === ''){
      $sendContactFormHan = TRUE;

      if(!isset($sendContactFormHan) || !$sendContactFormHan){
        throw new Exception('Script Include Check: Handler variable not found');
      }

      unset($sendContactFormHan);

      $sendContactFormInc = TRUE;
      $validationFullPath = '/var/www/html/private_html/validateSendContactForm.inc.php';
      if(file_exists($validationFullPath)){
        include_once($validationFullPath);
      } else {
        throw new Exception('Load Verificaiton File: Could not find validation file');
      }

      // if(file_exists($includeFullPath)){
      //   include_once($includeFullPath);
      // } else {
      //   throw new Exception('Load Include File: Could not find include file');
      // }
    } else {
      throw new Exception('Form Data Check: Form data match failed');
    }

  } catch(CustomExceptions\FormsException $e) {
    echo(json_encode(
      array(
        'form' => $e->getMessage(),
        'name' => 'defaultName',
        'email' => 'defaultEmail',
        'custMsg' => 'defaultMsg',
        'telNum' => 'defaultTelNum',
        'persFavFood' => 'defaultPersFavFood'
      )
    ));
    exit();
  } catch(Exception $e) {
    echo(json_encode(
      array(
        'form' => 'noService',
        'name' => 'defaultName',
        'email' => 'defaultEmail',
        'custMsg' => 'defaultMsg',
        'telNum' => 'defaultTelNum',
        'persFavFood' => 'defaultPersFavFood'
      )
    ));
    exit();
  }

  // ==== End of Main Execution ===============================================
  // ==========================================================================
