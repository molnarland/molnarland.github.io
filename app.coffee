#declarations
WOI=delay=wait=stop=null
words=[]

#functions
stopfun = () ->
	WOI.stopping()
	# WOI=null

start = () ->
	$('#woitxt').html ''

	# words=$('#words input').val().split '|'

	words=$('#words input').val()
	if words == '' then words=["Words with '|' between"] else words=words.split('|')

	delay=$('#delay input').val()
	wait=$('#wait input').val()
	stop=$('#stop input').is ':checked'

	# if words==[""] then words=["Words with '|' between"]

	console.log words

	WOI = new WordsOutIn document.getElementById("woitxt"), words, delay, wait, stop

#start with jquery
$(document).ready ->
	$('#delay p:last-child').html $('#delay input').val()
	$('#wait p:last-child').html $('#wait input').val()
	
	start()

	inspirate = new WordsOutIn document.getElementById('inspirate'), ["Inspitated by my friend and npmjs.org."], 800, 0, true


$('#stopbtn').click ->
	stopfun()

$('#startbtn').click ->
	stopfun()
	start()

$('#delay input').change ->
	$(this).parent().find('p:last-child').html $(this).val()

$('#wait input').change ->
	$(this).parent().find('p:last-child').html $(this).val()

