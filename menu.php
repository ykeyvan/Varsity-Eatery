<?php 
  $page = 'menu';
  $titleTag = 'Varsity Eatery | Menu';
  $scripts = array(
    array(
      'src' => 'assets/js/main.js',
      'type' => 'module',
      'exeType' => FALSE
    )
  );
  $message = 'This is our current Menu at our eatery! Feel free to check out our menu or learn more about us!';
  include_once('assets/php/include/header.inc.php');
?>
<main class="chamber">
  <?php include_once('assets/php/include/sidebar.inc.php');?>
  <article id="menu" class="chamber__focal">
    <section class="showcase">
      <h1 class="showcase__title">Menu</h1>
      <div class="menu content">
        <nav id="menuNav" class="menu__nav"></nav>
        <p id="menuInfo" class="menu__info"></p>
        <p class="menu__disclaimer">Prices do not include tax and are subject to change.</p>
      </div>
    </section>
    <section class="showcase">
      <h2 id="menuTitle" class="showcase__title"></h2>
      <div id="menuItems" class="content category"></div>
    </section>
    <section class="showcase">
      <div class="content">
        <p class="menu__disclaimer">Prices do not include tax and are subject to change.</p>
      </div>
    </section>
  </article>
</main>
<?php include_once('assets/php/include/footer.inc.php');?>