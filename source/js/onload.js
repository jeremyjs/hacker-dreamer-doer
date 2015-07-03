
function isReady (parent) {
  return $(parent).find('input, textarea').toArray().every(function (elem) {
    return $(elem).val() !== '';
  });
}

function checkAndAddSubmit (parent) {
  if(isReady(parent)) $(parent).find('.btn').animate({left: '0'}, "fast");
  else                $(parent).find('.btn').animate({left: '-140px'}, "fast");
}

function validateEmail (email) {
  if(isValidEmail(email)) {
    return true;
  }
  else {
    $('.notice').html('Please enter a valid email address.');
    $('.notice').show();
    return false;
  }
}

function startSpinner () {
  $('.fa-spinner').show();
}

function stopSpinner () {
  $('.fa-spinner').hide();
}

function nextSlide () {
  if(!window.alreadyScrolled && $.fn.fullpage && $.fn.fullpage.moveSectionDown) {
    $.fn.fullpage.moveSectionDown();
  }
}

function activateFullpage () {
  $('.fullpage').fullpage({
    anchors: ['title', 'hacker', 'dreamer', 'doer'],
    onLeave: function (index, nextIndex, direction) {
      if(index === 1) window.alreadyScrolled = true;
    }
  });
}

$(function () {

  var minWidth = window.matchMedia('all and (min-width: 700px)');
  console.log('minWidth, minWidth.matches: ', minWidth, minWidth.matches);
  if(minWidth.matches) activateFullpage();
  minWidth.addListener(function (changed) {
    if(changed.matches) {
      activateFullpage();
    } else if($.fn.fullpage) {
      $.fn.fullpage.destroy('all');
    }
  });

  $('.cover').css('opacity', '0');
  $('.cover').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
    $(this).css('z-index', '0');
    $(this).off(e);
    window.setTimeout(nextSlide, 3000);
    window.setInterval(cycleImages, 7000);
  });

  $('.input-field > input, .input-field > textarea').keyup(function (e) {
    var $target = $(e.target);
    var value   = $target.val();
    var parent  = $target.parent();
    if(value === '') parent.children().removeClass('active');
    else             parent.children().addClass('active');
    checkAndAddSubmit($target.parents('.form'));
    $('.notice').hide();
  });

  $('.form').submit(function (e) {
    e.preventDefault();
    var form    = e.target;
    var name    = $(form).find('input.name').val();
    var email   = $(form).find('input.email').val();
    var message = $(form).find('textarea.message').val();
    if(!validateEmail(email)) return;
    startSpinner();
    sendmail({
      name: name,
      email: email,
      message: message
    }, function (res) {
      stopSpinner();
      if(res.success) {
        $(form).find('input.name').val('');
        $(form).find('input.email').val('');
        $(form).find('textarea.message').val('');
        $(form).find('.input-field').children().removeClass('active');
        checkAndAddSubmit(form);
        $('.notice').html('Message Sent!');
        $('.notice').show();
      } else {
        $('.notice').html(res.message);
        $('.notice').show();
      }
    });
  });

}); // $(function)
