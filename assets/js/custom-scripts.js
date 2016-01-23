/* global $ */
/* eshint no-console:1 */
if ($.support.pjax) {
  $(document).on('pjax:send', function() {
    var path = window.location.pathname;
    if(path === '/'){
      setSelected('.nav-home');
    }
    else if(path === '/featured/'){
      setSelected('.nav-featured');
    }else{
      setSelected(null);
    }
  });
  $(document).on('pjax:success', function() {
    resizePostImage();
  });
  var setSelected = function(selector){
    if(selector === null){
      $('.nav-current').removeClass('nav-current');
      return;
    }
    $('.nav-current').removeClass('nav-current');
    $(selector).addClass('nav-current');
  };
}
$( document ).ready(function() {
  resizePostImage();

});

/* Bind click for mailing-list */
function mailingListClick() {
  if($('.post-image').length === 0) {
    // No posts found
    return;
  }
  $('#cta-button').click(function () {
    $('#small-cta').fadeOut();
    $('#small-email').fadeIn();
  });
  $('.mailing-submit-btn').click(function() {
    $('#mailing-small').fadeOut();
    $('#mailing-large').fadeOut();
    $('#mailing-success').fadeIn();
  });
}

/* Resize post images */
function resizePostImage() {
  if($('.post-image').length === 0) {
    // No posts found
    return;
  }
  $('.post-image').height($(window).height()*0.75);
}

/* Hide navbar */
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function handleStickyScroll(st) {
  console.log('current pos plus viewport: ' + ($('.post-container').height() + $('.post-image').height()));
  console.log('height of article: ' + (st + $(window).height()));
  return false;
}

function hasScrolled() {
  var st = $(this).scrollTop();
  //Check to see if this was a sticky scroll, so we won't show or hide.
  if(handleStickyScroll(st))
    return;

  if($('.mailing-list-popup').find('input').is(':focus'))
    return;
  
  /* Make sure they scroll more than delta */
  if(Math.abs(lastScrollTop - st) <= delta)
    return;
  
  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight){
    // Scroll Down
    $('.navigation').removeClass('navigation-down').addClass('navigation-up');
    // Control bottom nav
    if($('.mailing-list-popup').length != 0){
      $('.mailing-list-popup').css({
        'top': $(window).height()+1
      });
    }
  } else {
    // Scroll Up
    if(st + $(window).height() < $(document).height()) {
      $('.navigation').removeClass('navigation-up').addClass('navigation-down');
      // Control bottom nav
      if($('.mailing-list-popup').length != 0){
        $('.mailing-list-popup').css({
          'top': $(window).height()-57,
          'width': $('.post').width()+3
        });
        mailingListClick();
      }
    }
  }
  
  lastScrollTop = st;
}
