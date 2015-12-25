var WOI, delay, start, stop, stopfun, wait, words;

WOI = delay = wait = stop = null;

words = [];

stopfun = function() {
  return WOI.stopping();
};

start = function() {
  $('#woitxt').html('');
  words = $('#words input').val();
  if (words === '') {
    words = ["Words with '|' between"];
  } else {
    words = words.split('|');
  }
  delay = $('#delay input').val();
  wait = $('#wait input').val();
  stop = $('#stop input').is(':checked');
  console.log(words);
  return WOI = new WordsOutIn(document.getElementById("woitxt"), words, delay, wait, stop);
};

$(document).ready(function() {
  var inspirate;
  $('#delay p:last-child').html($('#delay input').val());
  $('#wait p:last-child').html($('#wait input').val());
  start();
  return inspirate = new WordsOutIn(document.getElementById('inspirate'), ["Inspitated by my friend and npmjs.org."], 800, 0, true);
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
