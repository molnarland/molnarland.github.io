#declarations
WOI = delay = wait = stop = null
words = []

#clipboard.js
clipboard = new Clipboard '#copy-button'

#functions
stopfun = ->
	WOI.stopping()

start = ->
	$('#woitxt').html ''

	# words=$('#words input').val().split '|'

	words=$('#words input').val()
	if words == '' then words = ["Words with '|' between"] else words = words.split('|')

	delay = [[parseInt($('#delay div:first-child input').val()), parseInt($('#delay div:last-child input').val())]]
	wait = [[parseInt($('#wait div:first-child input').val()), parseInt($('#wait div:last-child input').val())]]
	color = [[$('#color div:first-child input').val(), $('#color div:last-child input').val()]]
	stop = $('#stop input').is ':checked'

	WOI = new WordsOutIn document.getElementById("woitxt"), words, delay, wait, color, stop
	codeWrite()

codeWrite = ->
	words = $('#words input').val().split('|')
	startDelay = $('#delay div:first-child input').val()
	endDelay = $('#delay div:last-child input').val()
	startWait = $('#wait div:first-child input').val()
	endWait = $('#wait div:last-child input').val()
	startColor = $('#color div:first-child input').val()
	endColor = $('#color div:last-child input').val()
	stop = $('#stop input').is(':checked')

	str = "<span class='purple'>new</span> WordsOutIn\
			<span class='darkerblue'>(</span>\
			<span class='ligherblue'>document</span>\
			<span class='darkerblue'>.</span>\
			<span class='ligherblue'>getElementById</span>\
			<span class='darkerblue'>('</span>\
			<span class='green'>elem</span>\
			<span class='darkerblue'>'), ["

	if words[0] == ''
		str += "\"</span><span class='green'>Words with '|' between</span><span class='darkerblue'>\","
	else
		$.each words, (index, value) ->
			str += "\"</span><span class='green'>#{value}</span><span class='darkerblue'>\","

	str = str.substring 0, str.length - 1
	str += "], [[</span><span class='brown'>#{startDelay}</span>\
						<span class='darkerblue'>, </span>\
						<span class='brown'>#{endDelay}</span>\
						<span class='darkerblue'>]], [[</span>\
						<span class='brown'>#{startWait}</span>\
						<span class='darkerblue'>, </span>\
						<span class='brown'>#{endWait}</span>\
						<span class='darkerblue'>]], [[\"</span>\
						<span class='green'>#{startColor}</span>\
						<span class='darkerblue'>\", \"</span>\
						<span class='green'>#{endColor}</span>\
						<span class='darkerblue'>\"]], </span>\
						<span class='brown'>#{stop}</span>\
						<span class='darkerblue'>);</span>"

	$('#code').html(str)

#start with jquery
$(document).ready ->
	$('#delay div:first-child p:last-child').html $('#delay div:first-child input').val()
	$('#delay div:last-child p:last-child').html $('#delay div:last-child input').val()

	$('#wait div:first-child p:last-child').html $('#wait div:first-child input').val()
	$('#wait div:last-child p:last-child').html $('#wait div:last-child input').val()
	
	start()

	inpsirated = new WordsOutIn document.getElementById("inspirate"), ['Inspirated my friend and npmjs.org'], 200, 0, 'black', true


$('#stopbtn').click ->
	stopfun()

$('#startbtn').click ->
	stopfun()
	start()

$('#delay input').change ->
	$(this).parent().find('p:last-child').html $(this).val()

$('#wait input').change ->
	$(this).parent().find('p:last-child').html $(this).val()

$('.settings input').change ->
	codeWrite()

$('#words input').keyup ->
	codeWrite()