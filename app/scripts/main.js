// --------------- Google Translate Initialization---------------
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

$(document).ready(function() {
  // --------------- Header SLIDER ---------------
  var $slider = $('.slider'),
      $slideBGs = $('.slide__bg'),
      diff = 0,
      curSlide = 0,
      numOfSlides = $('.slide').length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 10000,
      $pagination = $('.slider-pagi');

  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $('<li class=\'slider-pagi__elem\'></li>');
      $li.addClass('slider-pagi__elem-'+i).data('page', i);
      if (!i) $li.addClass('active');
      $pagination.append($li);
    }
  };

  createBullets();

  function manageControls() {
    $('.slider-control').removeClass('inactive');
    if (!curSlide) $('.slider-control.left').addClass('inactive');
    if (curSlide === numOfSlides) $('.slider-control.right').addClass('inactive');
  };

  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };

  autoSlide();

  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass('animating');
      $slider.css('top');
      $('.slide').removeClass('active');
      $('.slide-'+curSlide).addClass('active');
      setTimeout(function() {
        $slider.removeClass('animating');
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $('.slider-pagi__elem').removeClass('active');
    $('.slider-pagi__elem-'+curSlide).addClass('active');
    $slider.css('transform', 'translate3d('+ -curSlide*100 +'%,0,0)');
    $slideBGs.css('transform', 'translate3d('+ curSlide*50 +'%,0,0)');
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on('mousedown touchstart', '.slider', function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;

    $(document).on('mousemove touchmove', function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css('transform', 'translate3d('+ (-curSlide*100 - diff) +'%,0,0)');
      $slideBGs.css('transform', 'translate3d('+ (curSlide*50 + diff/2) +'%,0,0)');
    });
  });

  $(document).on('mouseup touchend', function(e) {
    $(document).off('mousemove touchmove');
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });

  $(document).on('click', '.slider-control', function() {
    if ($(this).hasClass('left')) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });

  $(document).on('click', '.slider-pagi__elem', function() {
    curSlide = $(this).data('page');
    changeSlides();
  });

  // /*=============================================>>>>>
  // = Case Studies Expand Code(for future) =
  // ===============================================>>>>>*/
  // $( '#caseStudies .viewAll' ).on( 'click', function( e ) {
  //   $('#caseStudies .hiddenCaseStudies').toggleClass('open');
  //   if($('#caseStudies .hiddenCaseStudies').hasClass('open')) {
  //     $(this).text('View Few Case Studies');
  //   } else {
  //     $(this).text('View All Case Studies');
  //   }
  // });

  var dialog = new DialogFx($('#dialogContainer').get(0));
  /*=============================================>>>>>
  = Individual Case Studies =
  ===============================================>>>>>*/
  $('.case-study a.link').on('click', function(e) {
    dialog.toggle();
    var caseStudyNumber = $(this).attr('data-casestudy');
    $('#dialogContainer .dialog__content').removeClass('dialog__full-width');
    $('#dialogContainer header .headerInfo').html(caseStudiesData[caseStudyNumber].header);
    $('#dialogContainer section.contentBody').html(caseStudiesData[caseStudyNumber].content);
  });

  /*=============================================>>>>>
  = Our Clients Logo's =
  ===============================================>>>>>*/
  $('#trusted-by a.link').on('click', function(e) {
    dialog.toggle();
    $('#dialogContainer .dialog__content').addClass('dialog__full-width');
    $('#dialogContainer header .headerInfo').html(trustedByData.header);
    $('#dialogContainer section.contentBody').html(trustedByData.content);
  });

  /*=============================================>>>>>
  = Individual Item Modal Products | Softwares | Solutions =
  ===============================================>>>>>*/
  $('.category__container a.link').on('click', function(e) {
    dialog.toggle();
    var page = $(this).attr('data-page');
    var category = $(this).attr('data-category');
    var item = $(this).attr('data-item');
    var hashURL = $(this).attr('data-hash');
    // Push into URL hash history
    if(hashURL) {
      if(history.pushState)
        history.pushState(null, null, hashURL);
      else
        location.hash = hashURL;
    }
    // console.log(allCategoryItems[page][category][item]);
    $('#dialogContainer .dialog__content').addClass(`dialog__${page}`);
    $('#dialogContainer header .headerInfo').html(
      allCategoryItems[page][category][item].header
    );
    $('#dialogContainer section.contentBody').html(
      allCategoryItems[page][category][item].content
    );
  });

  /*=============================================>>>>>
  = Fixed Category Naviation for Products | Softwares | Solutions =
  ===============================================>>>>>*/
  var navpos = $('#allCategories').offset();
  $(window).bind('scroll', function() {
    if (navpos) {
      if ($(window).scrollTop() > navpos.top) {
        $('#allCategories .all-categories__container').addClass('fixed');
      } else {
        $('#allCategories .all-categories__container').removeClass('fixed');
      }
    }
  });

  /*=============================================>>>>>
  = Jquery Smooth Scroll =
  ===============================================>>>>>*/
  $('a[href*="#"]').on('click', function(e) {
    if (/^#/.test($(this).attr('href'))) {
      e.preventDefault();
      if(history.pushState)
        history.pushState(null, null, $(this).attr('href'));
      else
        location.hash = $(this).attr('href');
      $('html, body').animate(
        { scrollTop: $($(this).attr('href')).offset().top - 60 },
        300,
        'linear'
      );
    }
  });

  /*=============================================>>>>>
  = Hamburger Menu =
  ===============================================>>>>>*/
  $('.menu-btn').on('click', function() {
    $('body > header').toggleClass('showMenu');
    $('body').toggleClass('dialogOpen');
  });

  $('header nav > a').on('click', function() {
    $('body > header').removeClass('showMenu');
    $('body').removeClass('dialogOpen');
  });

  /*=============================================>>>>>
  = About US Expand =
  ===============================================>>>>>*/
  $( '#aboutUs .viewAll' ).on( 'click', function( e ) {
    $('#aboutUs .hiddenAboutUs').toggleClass('open');
    if($('#aboutUs .hiddenAboutUs').hasClass('open')) {
      $(this).text('Show Less');
    } else {
      $(this).text('Show More');
    }
  });

  /*=============================================>>>>>
  = Trigger a Click to open the Deatils of a product/solution on PageLoad =
  ===============================================>>>>>*/
  if(location.hash) {
    $(location.hash + ' > div > a.link').trigger( 'click' );
  }

});
