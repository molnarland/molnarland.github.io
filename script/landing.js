'use strict';

window.onscroll = function () {
	var scroll = scrollTop();

	setElementOpacity('#navbar .molnarland-text', scroll / 200);
	setElementOpacity('#welcome .molnarland-text', 1 - scroll / 200);
	//TODO #welcome .molnarland-text move to bottom when scrolling
	//TODO #navbar shadow-bottom bigger when scrolling

	// if (scroll > 60)
	// {
	// 	addString('#navbar', ' top-fix')
	// }
	// else
	// {
	// 	replaceString('#navbar', 'top-fix');
	// }
};

function inBirmingham() {
	var start = new Date(2016, 8, 14, 12, 0, 0),
	    current = new Date();

	var timeDifference = Math.abs(current.getTime() - start.getTime()),
	    minutesDifference = Math.ceil(timeDifference / (1000 * 60));

	var minutesChangerToYear = 60 * 24 * 30.4375 * 12,
	    minutesChangerToMonth = 60 * 24 * 30.4375,
	    minutesChangerToDay = 60 * 24,
	    minutesChangerToHour = 60;

	var calculateTime = function calculateTime(changer, lastValueInMinutes) {
		minutesDifference = lastValueInMinutes ? minutesDifference - lastValueInMinutes : minutesDifference;
		return changer > 0 ? Math.floor(minutesDifference / changer) : minutesDifference;
	};

	var years = calculateTime(minutesChangerToYear),
	    months = calculateTime(minutesChangerToMonth, years * minutesChangerToYear),
	    days = calculateTime(minutesChangerToDay, months * minutesChangerToMonth),
	    hours = calculateTime(minutesChangerToHour, days * minutesChangerToDay),
	    minutes = calculateTime(0, hours * minutesChangerToHour);

	var difference = {
		year: years,
		month: months,
		day: days,
		hour: hours,
		minute: minutes
	};

	var differenceDateInText = '';
	for (var index in difference) {
		if (difference[index] > 0) {
			var unit = difference[index] > 1 ? index + 's' : index;
			differenceDateInText += difference[index] + ' ' + unit + ', ';
		}
	}

	differenceDateInText = differenceDateInText.substring(0, differenceDateInText.length - 2);

	document.querySelector('#inBirmingham time').innerHTML = differenceDateInText;
}

inBirmingham();

setInterval(inBirmingham, 60000);

function scrollTop() {
	return document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop;
}

function substring(value, string) {
	return value.indexOf(string) !== -1;
}

function replaceString(selector, string) {
	var cssClassName = document.querySelector(selector).className;
	if (substring(cssClassName, string)) {
		document.querySelector(selector).className = cssClassName.replace(string, '');
	}
}

function addString(selector, string) {
	if (!substring(document.querySelector(selector).className, string)) {
		document.querySelector(selector).className += string;
	}
}

function checkSelector(selector) {
	if (!document.querySelector(selector)) {
		throw new Error(selector + ' selector isn\'t exist');
	}

	return true;
}

function setElementOpacity(selector, opacity) {
	if (checkSelector(selector)) {
		document.querySelector(selector).style.opacity = opacity;
	}
}