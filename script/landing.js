

window.onscroll = function ()
{
	var scroll = scrollTop();

	setElementOpacity('#navbar .molnarland-text', scroll / 200);
	setElementOpacity('#welcome .molnarland-text', 1 - (scroll / 200));
	//TODO #welcome .molnarland-text move to bottom when scrolling

	if (scroll > 100) 
	{
		addString('#navbar', ' top-fix')
	}
	else
	{
		replaceString('#navbar', 'top-fix');
	}
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

function replaceString(selector, string)
{
	var cssClassName = document.querySelector(selector).className;
	if (substring(cssClassName, string)) 
	{
		document.querySelector(selector).className = cssClassName.replace(string, '');
	}
}

function addString(selector, string)
{
	if (!substring(document.querySelector(selector).className, string)) 
	{
		document.querySelector(selector).className += string;
	}
}

function checkSelector(selector)
{
	if (!document.querySelector(selector))
	{
		throw new Error(selector + ' selector isn\'t exist');
	}

	return true;
}

function setElementOpacity(selector, opacity) 
{
	if (checkSelector(selector)) 
	{
		document.querySelector(selector).style.opacity = opacity;
	}
}