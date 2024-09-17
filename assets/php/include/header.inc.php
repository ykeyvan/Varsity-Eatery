<?php
  // Toggle this to change the type of environment being used
  define('DEBUG', FALSE);
  error_reporting(E_ALL);

  if(DEBUG) { // Development environment
    ini_set('display_errors', 1);
    ini_set('log_errors', 0);
  } else { // Production environment
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
  }
?>
<!doctype html>
<html>
<head>
  <meta name="robots" content="noindex, nofollow">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/png" href="images/favicon.png">
  <meta name="format-detection" content="telephone=no">
  <link href="assets/css/style.css" type="text/css" rel="stylesheet">
  <title><?php echo $titleTag;?></title>
  <?php
    if(isset($scripts) && is_array($scripts) && count($scripts) > 0){
      foreach($scripts as $script){
        $tag;
        if(isset($script['src'])){
          $tag = '<script src="' . $script['src'] . '"';
        } else {
          continue;
        }

        if(isset($script['type'])){
          $tag .= ' type="' . $script['type'] . '"';
        }

        if(isset($script['exeType'])){
          $tag .= ' ' . $script['exeType'];
        }
        $tag .= '></script>';
        echo $tag;
      } // end of foreach(as)
    }
  ?>
</head>
<body>
<header class="antechamber">
  <div class="antechamber__banner">
    <a class="antechamber__logo-link" href="index.php"><img class="antechamber__img" src="images/ve-web-banner.png" alt="Eatery logo"></a>
  </div>
  <nav class="antechamber__nav">
    <ul class="antechamber__list">
      <li class="antechamber__item">
        <a class="antechamber__link <?php if($page == "home"){echo 'antechamber__link--highlight';}?>" href="index.php">Home</a>
      </li>
      <li class="antechamber__item">
        <a class="antechamber__link <?php if($page == "menu"){echo 'antechamber__link--highlight';}?>" href="menu.php">Menu</a>
      </li>
      <li class="antechamber__item">
        <a class="antechamber__link <?php if($page == "about"){echo 'antechamber__link--highlight';}?>" href="about.php">About</a>
      </li>
      <li class="antechamber__item">
        <a class="antechamber__link <?php if($page == "contact"){echo 'antechamber__link--highlight';}?>" href="contact.php">Contact</a>
      </li>
    </ul>
  </nav>
</header>