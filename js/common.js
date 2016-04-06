$(document).ready(function() {  
  //provide smooth scrool to anchor on page
  $('.smoothScroll').click(function() {
    if($(window).width() < 768) {
      $('.navbar-toggle').click();
    };

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    };
  });

  //animated
  $('.animate-me').mouseenter(function() {
    $(this).addClass('animated shake');
  }).mouseleave(function() {
    $(this).removeClass('animated shake');
  })
});