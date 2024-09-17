<?php 
  $page = 'about';
  $titleTag = 'Varsity Eatery | About';
  $scripts = array();
  $message = 'Get to know us a little here on our about page!';
  include_once('assets/php/include/header.inc.php');
?>
<main class="chamber">
  <?php include_once('assets/php/include/sidebar.inc.php');?>
  <article class="chamber__focal">
    <section class="showcase">
      <h1 class="showcase__title">About us</h1>
      <div class="content">
        <div class="about-us">
          <p class="about-us__info">Charbroiled burgers, sandwiches, soups, salads, mexican food, breakfast and more! In Anaheim since 2015, our eatery's goal is to offer the most satisfying foods with our inexpensive menu. We provide a variety of foods so we hope you come eat at our place!</p>
        </div>
      </div>
    </section>
    <section class="showcase">
      <h2 class="showcase__title">Our achievements</h2>
      <div class="content">
        <div class="about-us">
          <figure class="awards">
            <img class="awards__img" src="images/about-page/oc-award-excellence-2017.jpg" alt="Orange County's 2017 award of excellence">
            <img class="awards__img" src="images/about-page/oc-award-excellence-2018.jpg" alt="Orange County's 2018 award of excellence">
            <figcaption class="awards__caption">Our Award of Excellence (that we've earned twice!) shows that our eatery meets the expectations of our county and our industry.</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section class="showcase">
      <h2 class="showcase__title">Food professionals</h2>
      <div class="content">
        <div class="about-us">
          <figure class="certificates">
              <img class="certificates__img" src="images/about-page/certificates/food-safety-manager.JPG" alt="First Food Safety Manager certification">
              <img class="certificates__img" src="images/about-page/certificates/food-safety-manager2.JPG" alt="Second Food Safety Manager certification">
              <img class="certificates__img" src="images/about-page/certificates/certified-professional-food-manager.JPG" alt="Certified professional food manager certification">
              <img class="certificates__img" src="images/about-page/certificates/servsafe-certification.JPG" alt="Serv Safe Certification">
              <figcaption class="certificates__caption">Our staff members have more then enough certified professional food managers so that you feel comfortable entering and eating with us.</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section class="showcase">
      <h2 class="showcase__title">Community minded</h2>
      <div class="content">
        <div class="about-us">
          <figure class="community">
            <img class="community__img" src="images/about-page/downtown-anaheim-association-logo.jpg" alt="Downtown Anaheim Association logo">
            <img class="community__img" src="images/about-page/anaheim-community-service.jpg" alt="Anaheim Community Service banner">
            <figcaption class="community__caption">We continually take part of Anaheim's community services because sometimes we feel like we can do much more then provide food, we want to give back to the community to help others and this Anaheim's needs. We are also a proud member of the Downtown Anaheim Association so keep an eye out for us!</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section class="showcase">
      <div class="content">
        <div class="about-us">
          <p class="about-us__info">Thank you for your time towards getting to know us better!</p>
        </div>
      </div>
    </section>
    <section class="showcase">
      <h2 class="showcase__title">Employment</h2>
      <div class="content">
        <div class="employment">
          <p class="employment__info">Would you like to work for a winning team? Come in and fill out an application!<br><br>Our eatery is always looking for great and energetic individuals who love to help others get what they need.<br>We have positions for both part-time and full-time. This is a great way for anyone, including students, to earn extra money.<br>You are welcomed to stop by and pick up an application!</p>
        </div>
      </div>
    </section>
  </article>
</main>
<?php include_once('assets/php/include/footer.inc.php');?>
