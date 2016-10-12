window.onload = () =>
{
	inBirmingham();
	setInterval(inBirmingham, 60000);

	alert(isTouchDevice());
};

function isTouchDevice() {return !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);};

let welcomeTextPositionIsLeft = 'center',
	welcomeTextStartRotate,
	welcomeTextMaxRotate;

const welcomeTextId = '#welcome-text',
    photoOfMeId = '#photo-of-me',
	rastaTextClass = '.rasta-text';

let windowWidth = window.innerWidth;


onloadAndOnresizeFunctions();

document.querySelector('body').onresize = () =>
{
    windowWidth = window.innerWidth;

    onloadAndOnresizeFunctions();
};

window.onscroll = () =>
{
	let scroll = scrollTop();

	if (scroll < 500)
	{
		setElementOpacity(`#navbar ${rastaTextClass}`, scroll / 200);
		setElementOpacity(`#welcome ${rastaTextClass}`, 1 - (scroll / 200));
		//TODO #navbar shadow-bottom bigger when scrolling

		bridgeToLine(`${welcomeTextId} span`, scroll / 10);
		if (getElementStyleValue(document.querySelector(welcomeTextId).style.transform) <= 0)
		{
			let newRotate = welcomeTextStartRotate + scroll
				/ (5 / ((welcomeTextMaxRotate - welcomeTextStartRotate) / 65));

			newRotate = (newRotate > 0) ? 0 : newRotate;

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

function onloadAndOnresizeFunctions()
{
    welcomeTextPosition(() =>
	{
		photoOfMePosition();
	});
}

function photoOfMePosition()
{
	removeClass(photoOfMeId, 'center');
	removeClass(photoOfMeId, 'left');
	removeClass(photoOfMeId, 'right');

	if (welcomeTextPositionIsLeft === 'center')
	{
		addClass(photoOfMeId, 'center');
	}
	else if (welcomeTextPositionIsLeft)
	{
		addClass(photoOfMeId, 'right');
	}
	else
	{
		addClass(photoOfMeId, 'left');
	}
}


function welcomeTextPosition(callback)
{
    if (windowWidth >= 800)
    {
        welcomeTextPositionIsLeft = randomNumber(1) === 1;

        if (welcomeTextPositionIsLeft) {
            const max = 20,
                random = randomNumber(max);

            welcomeTextStartRotate = -((max - random) * 1.5 + 30);
            welcomeTextMaxRotate = 60;

            setElementLeft(welcomeTextId, random, '%');
            setElementRotate(welcomeTextId, welcomeTextStartRotate);
        }
        else
        {
            let max, min;

            if (windowWidth >= 1200)
            {
                max = 84;
                min = 64;
            }
            else if (windowWidth < 1200 && windowWidth >= 800)
            {
                max = 76;
                min = 56;
            }

            const random = randomNumber(max, min);

            welcomeTextStartRotate = -((max - random) * 1.5);
            welcomeTextMaxRotate = 30;

            setElementLeft(welcomeTextId, random, '%');
            setElementRotate(welcomeTextId, welcomeTextStartRotate);
        }
    }
    else
    {
    	welcomeTextPositionIsLeft = 'center';

        welcomeTextStartRotate = -29;
        welcomeTextMaxRotate = 29;

        setElementRotate(welcomeTextId, -29);


        let ratio = 1;

        if (windowWidth < 800 && windowWidth > 370)
        {
            ratio = 800 / 35;
        }
        else if (windowWidth <= 370)
        {
            ratio = 370 / 18;
        }

        setElementLeft(welcomeTextId, windowWidth / ratio, '%');
    }

    if (typeof callback === 'function')
    {
        callback();
    }
}

function bridgeToLine(selector, deg)
{
	if (checkSelector(selector))
	{
		for (let index in document.querySelectorAll(selector))
		{
			if (!isNaN(index))
			{
				const minRotate = 0,
					leftMultiplier = 2 * index,
					maxLeft = leftMultiplier * 20,
					indexMultiple = index * 10;

				let nextRotate = indexMultiple - deg * 2.5;
				nextRotate = (nextRotate < minRotate) ? minRotate : nextRotate;

				let nextLeft = (indexMultiple - nextRotate) * 3;
				nextLeft = (nextLeft > maxLeft) ? maxLeft : nextLeft;

				const customSelector = `${selector}.bridge-${index}`;
				setElementRotate(customSelector, nextRotate);
				setElementLeft(customSelector, nextLeft);
			}
		}
	}
}

function setElementRotate(selector, degree)
{
	checkSelector(selector, () =>
	{
	    for(let value of ['transform', 'webkitTransform', 'oTransform', 'msTransform', 'mozTransform'])
        {
            document.querySelector(selector).style[value] = `rotate(${degree}deg)`;
        }
	});
}

/**
 * @param {string} style
 * @return {number}
 */
function getElementStyleValue(style)
{
	let match = style.match(/-?\d.?\d/g);

	return match ? Number(match[0]) : 0;
}

function setElementLeft(selector, value, unit = 'px')
{
	checkSelector(selector, () =>
	{
		document.querySelector(selector).style.left = `${value}${unit}`;
	})
}

function inBirmingham()
{
	const start = new Date(2016, 8, 14, 12, 0, 0),
		current = new Date();

	let timeDifference = Math.abs(current.getTime() - start.getTime()),
		minutesDifference = Math.ceil(timeDifference / (1000 * 60));

	const minutesChangerToYear = 60 * 24 * 30.4375 * 12,
		minutesChangerToMonth = 60 * 24 * 30.4375,
		minutesChangerToDay = 60 * 24,
		minutesChangerToHour = 60;

	let calculateTime = (changer, lastValueInMinutes) =>
	{
		minutesDifference = (lastValueInMinutes) ? minutesDifference - lastValueInMinutes : minutesDifference;
		return (changer > 0) ? Math.floor(minutesDifference / changer) : minutesDifference;
	};

	const years = calculateTime(minutesChangerToYear),
		months = calculateTime(minutesChangerToMonth, (years * minutesChangerToYear)),
		days = calculateTime(minutesChangerToDay, (months * minutesChangerToMonth)),
		hours = calculateTime(minutesChangerToHour, (days * minutesChangerToDay)),
		minutes = calculateTime(0, (hours * minutesChangerToHour));

	const difference = {
		year: years,
		month: months,
		day: days,
		hour: hours,
		minute: minutes
	};

	let differenceDateInText = '';
	for(let index in difference)
	{
		if (difference[index] > 0)
		{
			const unit = (difference[index] > 1) ? `${index}s` : index;
			differenceDateInText += `${difference[index]} ${unit}, `;
		}
	}

	differenceDateInText = differenceDateInText.substring(0, differenceDateInText.length - 2);

	document.querySelector('#inBirmingham time').innerHTML = differenceDateInText;
}


function scrollTop()
{
	return (document.body.scrollTop > 0)
		? document.body.scrollTop
		: document.documentElement.scrollTop;
}

function substring(value, string) 
{
	return value.indexOf(string) !== -1;
}

function removeClass(selector, cssClass)
{
	let cssClassName = document.querySelector(selector).className;
	if (substring(cssClassName, cssClass))
	{
		document.querySelector(selector).className = cssClassName.replace(cssClass, '');
	}
}

function addClass(selector, cssClass)
{
	if (checkSelector(selector) && !substring(document.querySelector(selector).className, cssClass))
	{
		document.querySelector(selector).className += cssClass;
	}
}

function checkSelector(selector, next)
{
	if (!document.querySelector(selector))
	{
		throw new Error(`'${selector}' selector isn\'t exist`);
	}

	if (typeof next === 'function')
	{
		return next();
	}

	return true;
}

function setElementOpacity(selector, opacity) 
{
	checkSelector(selector, () =>
	{
		document.querySelector(selector).style.opacity = opacity;
	});
}

function randomNumber(max, min = 0)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}