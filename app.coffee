#declarations
WOI = delay = wait = stop = null
words = []

#functions
stopfun = () ->
	console.log(timerId);
	inTimer.stopping(timerId)

start = () ->
	$('#woitxt').html ''

	# words=$('#words input').val().split '|'

	words=$('#words input').val()
	if words == '' then words = ["Words with '|' between"] else words=words.split('|')

	delay = [[parseInt($('#delay div:first-child input').val()), parseInt($('#delay div:last-child input').val())]]
	wait = [[parseInt($('#wait div:first-child input').val()), parseInt($('#wait div:last-child input').val())]]
	color = [[$('#color div:first-child input').val(), $('#color div:last-child input').val()]]
	stop = $('#stop input').is ':checked'

	WOI = new WordsOutIn document.getElementById("woitxt"), words, delay, wait, color, stop
	# console.log WOI

#start with jquery
$(document).ready ->
	$('#delay div:first-child p:last-child').html $('#delay div:first-child input').val()
	$('#delay div:last-child p:last-child').html $('#delay div:last-child input').val()

	$('#wait div:first-child p:last-child').html $('#wait div:first-child input').val()
	$('#wait div:last-child p:last-child').html $('#wait div:last-child input').val()
	
	start()


$('#stopbtn').click ->
	stopfun()

$('#startbtn').click ->
	stopfun()
	start()

$('#delay input').change ->
	$(this).parent().find('p:last-child').html $(this).val()

$('#wait input').change ->
	$(this).parent().find('p:last-child').html $(this).val()

