'use strict';

window.onload = function () {
	inBirmingham();
	setInterval(inBirmingham, 60000);
};

var welcomeTextPositionIsLeft = 'center',
    welcomeTextStartRotate = void 0,
    welcomeTextMaxRotate = void 0;

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
if (msie > 0) {
	document.querySelector('#navbar').style.background = 'pink';
}

var welcomeTextId = '#welcome-text',
    photoOfMeId = '#photo-of-me';

var windowWidth = window.innerWidth;

onloadAndOnresizeFunctions();

document.querySelector('body').onresize = function () {
	windowWidth = window.innerWidth;

	onloadAndOnresizeFunctions();
};

window.onscroll = function () {
	var scroll = scrollTop();

	if (scroll < 500) {
		setElementOpacity('#navbar .molnarland-text', scroll / 200);
		setElementOpacity('#welcome .molnarland-text', 1 - scroll / 200);
		//TODO #welcome .molnarland-text move to bottom when scrolling
		//TODO #navbar shadow-bottom bigger when scrolling

		bridgeToLine('#welcome-text span', scroll / 10);
		if (getElementStyleValue(document.querySelector(welcomeTextId).style.transform) <= 0) {
			var newRotate = welcomeTextStartRotate + scroll / (5 / ((welcomeTextMaxRotate - welcomeTextStartRotate) / 65));

			newRotate = newRotate > 0 ? 0 : newRotate;

			setElementRotate(welcomeTextId, newRotate);
		}
	}

	// if (scroll > 60)
	// {
	// 	addString('#navbar', ' top-fix')
	// }
	// else
	// {
	// 	replaceString('#navbar', 'top-fix');
	// }
};

function onloadAndOnresizeFunctions() {
	welcomeTextPosition(function () {
		photoOfMePosition();
	});
}

function photoOfMePosition() {
	removeClass(photoOfMeId, 'center');
	removeClass(photoOfMeId, 'left');
	removeClass(photoOfMeId, 'right');

	if (welcomeTextPositionIsLeft === 'center') {
		addClass(photoOfMeId, 'center');
	} else if (welcomeTextPositionIsLeft) {
		addClass(photoOfMeId, 'right');
	} else {
		addClass(photoOfMeId, 'left');
	}
}

function welcomeTextPosition(callback) {
	if (windowWidth >= 800) {
		welcomeTextPositionIsLeft = randomNumber(1) === 1;

		if (welcomeTextPositionIsLeft) {
			var max = 20,
			    random = randomNumber(max);

			welcomeTextStartRotate = -((max - random) * 1.5 + 30);
			welcomeTextMaxRotate = 60;

			setElementLeft(welcomeTextId, random, '%');
			setElementRotate(welcomeTextId, welcomeTextStartRotate);
		} else {
			var _max = void 0,
			    min = void 0;

			if (windowWidth >= 1200) {
				_max = 84;
				min = 64;
			} else if (windowWidth < 1200 && windowWidth >= 800) {
				_max = 76;
				min = 56;
			}

			var _random = randomNumber(_max, min);

			welcomeTextStartRotate = -((_max - _random) * 1.5);
			welcomeTextMaxRotate = 30;

			setElementLeft(welcomeTextId, _random, '%');
			setElementRotate(welcomeTextId, welcomeTextStartRotate);
		}
	} else {
		welcomeTextPositionIsLeft = 'center';

		welcomeTextStartRotate = -29;
		welcomeTextMaxRotate = 29;

		setElementRotate(welcomeTextId, -29);

		var ratio = 1;

		if (windowWidth < 800 && windowWidth > 370) {
			ratio = 800 / 35;
		} else if (windowWidth <= 370) {
			ratio = 370 / 18;
		}

		setElementLeft(welcomeTextId, windowWidth / ratio, '%');
	}

	if (typeof callback === 'function') {
		callback();
	}
}

function bridgeToLine(selector, deg) {
	if (checkSelector(selector)) {
		for (var index in document.querySelectorAll(selector)) {
			if (!isNaN(index)) {
				var minRotate = 0,
				    leftMultiplier = 2 * index,
				    maxLeft = leftMultiplier * 20,
				    indexMultiple = index * 10;

				var nextRotate = indexMultiple - deg * 2.5;
				nextRotate = nextRotate < minRotate ? minRotate : nextRotate;

				var nextLeft = (indexMultiple - nextRotate) * 3;
				nextLeft = nextLeft > maxLeft ? maxLeft : nextLeft;

				var customSelector = selector + '.bridge-' + index;
				setElementRotate(customSelector, nextRotate);
				setElementLeft(customSelector, nextLeft);
			}
		}
	}
}

function setElementRotate(selector, degree) {
	checkSelector(selector, function () {
		var _arr = ['transform', 'webkitTransform', 'oTransform', 'msTransform', 'mozTransform'];

		for (var _i = 0; _i < _arr.length; _i++) {
			var value = _arr[_i];
			document.querySelector(selector).style[value] = 'rotate(' + degree + 'deg)';
		}
	});
}

/**
 * @param {string} style
 * @return {number}
 */
function getElementStyleValue(style) {
	var match = style.match(/-?\d.?\d/g);

	return match ? Number(match[0]) : 0;
}

function setElementLeft(selector, value) {
	var unit = arguments.length <= 2 || arguments[2] === undefined ? 'px' : arguments[2];

	checkSelector(selector, function () {
		document.querySelector(selector).style.left = '' + value + unit;
	});
}

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

function scrollTop() {
	return document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop;
}

function substring(value, string) {
	return value.indexOf(string) !== -1;
}

function removeClass(selector, cssClass) {
	var cssClassName = document.querySelector(selector).className;
	if (substring(cssClassName, cssClass)) {
		document.querySelector(selector).className = cssClassName.replace(cssClass, '');
	}
}

function addClass(selector, cssClass) {
	if (checkSelector(selector) && !substring(document.querySelector(selector).className, cssClass)) {
		document.querySelector(selector).className += cssClass;
	}
}

function checkSelector(selector, next) {
	if (!document.querySelector(selector)) {
		throw new Error('\'' + selector + '\' selector isn\'t exist');
	}

	if (typeof next === 'function') {
		return next();
	}

	return true;
}

function setElementOpacity(selector, opacity) {
	checkSelector(selector, function () {
		document.querySelector(selector).style.opacity = opacity;
	});
}

function randomNumber(max) {
	var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	return Math.floor(Math.random() * (max - min + 1)) + min;
}