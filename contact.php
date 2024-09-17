<?php
  session_start();
  $page = 'contact';
  $titleTag = 'Varsity Eatery | Contact';
  $scripts = array(
    array(
      'src' => 'assets/js/main.js',
      'type' => 'module',
      'exeType' => FALSE
    )
  );
  $message = 'Questions, compliments, or concerns? Contact us by filling out the form below.';
  include_once('assets/php/include/header.inc.php');
?>
<main class="chamber">
  <?php include_once('assets/php/include/sidebar.inc.php');?>
  <article class="chamber__focal chamber__focal--contact">
    <section class="showcase">
      <h1 class="showcase__title">Contact Us</h1>
      <div id="sendContactFormContainer" class="content">
        <header class="fyi">
          <h3 id="fyiSendContactForm" class="fyi__title">Please fill out the form below</h3>
        </header>
        <form id="sendContactForm" class="form" method="POST">
          <fieldset class="form__fieldset form__fieldset--personal">
            <legend class="form__legend">Personal Information</legend>
            <label class="form__label">
              <span id="nameText" class="form__question">Name*</span>
              <input class="form__input" type="text" name="name" minlength="2" maxlength="20" size="18" placeholder=" John Doe" value="">
            </label>
            <label class="form__label">
              <span id="emailText" class="form__question">Email*</span>
              <input class="form__input" type="email" name="email" id="email" maxlength="254" size="18" placeholder=" JohnDoe@gmail.com" value="">
            </label>
            <label class="form__label">
              <span id="telNumText" class="form__question">Phone number</span>
              <input class="form__input" type="tel" name="telNum" maxlength="10" size="18" placeholder=" 7141234567">
            </label>
            <label class="form__label">
              <span id="persFavFoodText" class="form__question">Personal favorite food</span>
              <input class="form__input" type="text" name="persFavFood" minlength="2" maxlength="12" size="18" placeholder=" Lobster">
            </label>
            <label class="form__label dne">
              <span class="form__question">Please don't enter anything here</span>
              <input class="form__input" type="text" name="url" placeholder="URL" maxlength="80" value="">
            </label>
          </fieldset>
          <fieldset class="form__fieldset form__fieldset--feedback">
            <legend class="form__legend">Feedback</legend>
            <label class="form__label">
              <span id="msgText" class="form__question">Your message*</span>
              <textarea class="form__input form__input--textarea" name="msg" minlength="2" maxlength="256" placeholder="Tell us about your experience at our eatery and/or about our website"></textarea>
            </label>
            <label class="form__label form__label--rating">
              <span class="form__question">Rate our eatery</span>
              <div class="form__rating">
                <input class="form__slider" name="rating" type="range" value="5" min="1" max="10">
                <div class="form__values">
                  <span class="form__one-rating">1</span>
                  <span id="sliderVal" class="form__value" >5</span>
                  <span class="form__ten-rating">10</span>
                </div>
              </div>
            </label>
            <div class="form__label form__radio-inputs">
              <span class="form__question">Would you come back here again?</span>
              <label class="form__label">
                <input id="rdoRetCustYes" class="form__rdo" type="radio" name="retCust" value="yes">Yes!
              </label>
              <label class="form__label">
                <input id="rdoRetCustMaybe" class="form__rdo" type="radio" name="retCust" value="maybe" checked>I would filp a coin...
              </label>
              <label class="form__label">
                <input id="rdoRetCustNo" class="form__rdo" type="radio" name="retCust" value="no">No!
              </label>
            </div>
          </fieldset>
          <fieldset id="chkboxFieldset" class="form__fieldset form__fieldset--additional">
            <legend class="form__legend">Additional</legend>
            <span class="form__question">Favorite food category from our eatery</span>
          </fieldset>
          <fieldset id="sendBtnFieldset" class="form__fieldset form__fieldset--btn">
            <input class="form__clear" name="reset" type="reset" value="Clear">
            <input class="form__submit" name="submit" type="submit" value="Submit">
          </fieldset>
        </form>
      </div>
    </section>
    <section class="showcase">
      <h1 class="showcase__title">View Submitted Forms</h1>
      <div id="getContactFormContainer" class="content">
        <header class="fyi">
          <h3 id="fyiGetContactForm" class="fyi__title">Fill out the form below to retrieve your previous submitted forms</h3>
        </header>
        <form id="getContactForm" class="form" method="POST">
          <fieldset class="form__fieldset form__fieldset--personal">
            <legend class="form__legend">Personal Information</legend>
            <label class="form__label">
              <span id="nameText" class="form__question">Name*</span>
              <input class="form__input" type="text" name="name" minlength="2" maxlength="20" size="18" placeholder=" John Doe" value="">
            </label>
            <label class="form__label">
              <span id="emailText" class="form__question">Email*</span>
              <input class="form__input" type="email" name="email" maxlength="254" size="18" placeholder=" JohnDoe@gmail.com" value="">
            </label>
            <label class="form__label dne">
              <span class="form__question">Please don't enter anything here</span>
              <input class="form__input" type="text" name="url" placeholder="URL" maxlength="80" value="">
            </label>
          </fieldset>
          <fieldset id="getBtnFieldset" class="form__fieldset form__fieldset--btn">
            <input class="form__clear" name="reset" type="reset" value="Clear">
            <input class="form__submit" name="submit" type="submit" value="Submit">
            <input class="form__retry" name="retry" type="button" value="Retry" disabled>
          </fieldset>
        </form>
        <div id="getRes" class="res dne"></div>
      </div>
    </section>
    <section id="marco" class="showcase dne"></section>
  </article>
</main>
<?php include_once('assets/php/include/footer.inc.php');?>