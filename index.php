<?php 
  $page = 'home';
  $titleTag = 'Varsity Eatery | Home';
  $scripts = array();
  $message = 'Welcome to Varsity\'s Eatery Homepage! Feel free to check out our menu or learn more about us!';
  include_once('assets/php/include/header.inc.php');
?>
<main class="chamber">
  <?php include_once('assets/php/include/sidebar.inc.php');?>
  <article class="chamber__focal">
    <section class="showcase">
      <h1 class="showcase__title">Home</h1>
      <div class="content">
        <ul class="grid">
          <li class="tile tile__featured-foods">
            <a class="tile__link" href="menu.php?cat=Charbroiled+Burgers">
              <div class="caption">
                <h4 class="caption__title">Hamburger</h4><br>
                <p class="caption__info">Charbroiled Burger menu</p>
              </div>
              <img class="tile__img" src="images/featured-foods/hamburger.jpg">
            </a>
          </li>
          <li class="tile tile__featured-foods">
            <a class="tile__link" href="menu.php?cat=Mexican+Food">
              <div class="caption">
                <h4 class="caption__title">Quesadilla</h4><br>
                <p class="caption__info">Mexican Food menu</p>
              </div>
              <img class="tile__img" src="images/featured-foods/quesadilla.jpg">
            </a>
          </li>
          <li class="tile tile__featured-foods">
            <a class="tile__link" href="menu.php?cat=Salads">
              <div class="caption">
                <h4 class="caption__title">Vegetable Salad</h4><br>
                <p class="caption__info">Salad menu</p>
              </div>
              <img class="tile__img" src="images/featured-foods/vegetable-salad.jpg">
            </a>
          </li>
          <li class="tile tile__featured-foods">
            <a class="tile__link" href="menu.php?cat=Sides">
              <div class="caption">
                <h4 class="caption__title">French Fries</h4><br>
                <p class="caption__info">Sides menu</p>
              </div>
              <img class="tile__img" src="images/featured-foods/french-fries.jpg">
            </a>
          </li>
          <li class="tile tile__featured-foods">
            <a class="tile__link" href="menu.php?cat=Breakfast">
              <div class="caption">
                <h4 class="caption__title">Pancakes</h4><br>
                <p class="caption__info">Breakfast menu</p>
              </div>
              <img class="tile__img" src="images/featured-foods/pancakes.jpg">
            </a>
          </li>
          <li class="tile tile__featured-foods">
            <a class="tile__link" href="menu.php?cat=Other+Foods">
              <div class="caption">
                <h4 class="caption__title">Pasta</h4><br>
                <p class="caption__info">Other Foods menu</p>
              </div>
              <img class="tile__img" src="images/featured-foods/pasta.jpg">
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="showcase">
      <h2 class="showcase__title">Come by our eatery!</h2>
      <div class="content">
        <ul class="grid">
          <li class="tile"><img class="tile__img" src="images/eatery/eatery8.jpg"></li>
          <li class="tile"><img class="tile__img" src="images/eatery/eatery2.jpg"></li>
          <li class="tile"><img class="tile__img" src="images/eatery/eatery3.jpg"></li>
          <li class="tile"><img class="tile__img" src="images/eatery/eatery4.jpg"></li>
          <li class="tile"><img class="tile__img" src="images/eatery/eatery5.jpg"></li>
          <li class="tile"><img class="tile__img" src="images/eatery/eatery6.jpg"></li>
        </ul>
      </div>
    </section>
  </article>
</main>
<?php include_once('assets/php/include/footer.inc.php');?>