module.exports = {
        scrollTop: function ()
    {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset)
        {
            return self.pageYOffset;
        }

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
        {
            return document.documentElement.scrollTop
        }

        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop)
        {
            return document.body.scrollTop;
        }

        return 0;
    },

    substring: function (value, string)
    {
        return value.indexOf(string) !== -1;
    },

    removeClass: function (selector, cssClass)
    {
        let cssClassName = document.querySelector(selector).className;
        if (this.substring(cssClassName, cssClass))
        {
            document.querySelector(selector).className = cssClassName.replace(cssClass, '');
        }
    },

    addClass: function (selector, cssClass)
    {
        if (this.checkSelector(selector) && !this.substring(document.querySelector(selector).className, cssClass))
        {
            document.querySelector(selector).className += cssClass;
        }
    },

    checkSelector: function (selector, next)
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
    },

    setElementOpacity: function (selector, opacity)
    {
        this.checkSelector(selector, () =>
        {
            document.querySelector(selector).style.opacity = opacity;
        });
    },

    randomNumber: function (max, min = 0)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    smoothScroll: function (selector)
    {
        let startY = this.scrollTop();

        this.elementTop(selector, (position) =>
        {
            let stopY = position - document.querySelector('#navbar').clientHeight,
                distance = stopY > startY ? stopY - startY : startY - stopY;

            if (distance < 100)
            {
                scrollTo(0, stopY); return;
            }

            let speed = Math.round(distance / 100);
            if (speed >= 20)
            {
                speed = 20;
            }

            let step = Math.round(distance / 200),
                leapY = stopY > startY ? startY + step : startY - step,
                timer = 0;

            if (stopY > startY)
            {
                for (let i = startY; i < stopY; i += step)
                {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);

                    leapY += step;
                    if (leapY > stopY)
                    {
                        leapY = stopY;
                    }

                    timer++;
                }

                return;
            }

            for (let i = startY; i > stopY; i -= step)
            {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);

                leapY -= step;
                if (leapY < stopY)
                {
                    leapY = stopY;
                }

                timer++;
            }
        });
    },

    elementTop: function (selector, next)
    {
        this.checkSelector(selector, () =>
        {
            const element = document.querySelector(selector);
            let y = element.offsetTop,
                node = element;

            while (node.offsetParent && node.offsetParent != document.body)
            {
                node = node.offsetParent;
                y += node.offsetTop;
            }


            if (typeof next === 'function')
            {
                return next(y);
            }

            return y;
        });
    }
};