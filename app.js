var WOI, delay, start, stop, stopfun, wait, words;

WOI = delay = wait = stop = null;

words = [];

stopfun = function() {
  return inTimer.prototype.stopping(timerId);
};

start = function() {
  var color;
  $('#woitxt').html('');
  words = $('#words input').val();
  if (words === '') {
    words = ["Words with '|' between"];
  } else {
    words = words.split('|');
  }
  delay = [[parseInt($('#delay div:first-child input').val()), parseInt($('#delay div:last-child input').val())]];
  wait = [[parseInt($('#wait div:first-child input').val()), parseInt($('#wait div:last-child input').val())]];
  color = [[$('#color div:first-child input').val(), $('#color div:last-child input').val()]];
  stop = $('#stop input').is(':checked');
  return WOI = new WordsOutIn(document.getElementById("woitxt"), words, delay, wait, color, stop);
};

$(document).ready(function() {
  $('#delay div:first-child p:last-child').html($('#delay div:first-child input').val());
  $('#delay div:last-child p:last-child').html($('#delay div:last-child input').val());
  $('#wait div:first-child p:last-child').html($('#wait div:first-child input').val());
  $('#wait div:last-child p:last-child').html($('#wait div:last-child input').val());
  return start();
});

$('#stopbtn').click(function() {
  return stopfun();
});

$('#startbtn').click(function() {
  stopfun();
  return start();
});

$('#delay input').change(function() {
  return $(this).parent().find('p:last-child').html($(this).val());
});

$('#wait input').change(function() {
  return $(this).parent().find('p:last-child').html($(this).val());
});
