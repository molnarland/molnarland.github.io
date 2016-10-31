function start()
{
    const adminController = require('../src/imports').AdminController,
        publicController = require('../src/imports').PublicController;
    let parameters = getUrlParameters();


    if (parameters[0][0] === 'blog' && parameters[0][1] === 'admin')
    {
        const ac = new adminController({
            file: parameters[0][2]
        });
    }
    else if(parameters[0][0] === 'blog')
    {
        const pc = new publicController();
    }
    else
    {
        location.href = '/';
    }
}

/**
 * @param {object} obj
 * @return {boolean}
 */
function isEmptyObject(obj)
{
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * @use http://usejsdoc.org/ type logic
 * @param {string} type
 * @param value
 * @return {boolean|TypeError} - True if not error
 */
function checkType(type, value)
{
    var error = false;

    if (typeof type == 'string')
    {
        //if array this type
        if (type.substring(type.length - 2) === '[]')
        {
            if(Object.prototype.toString.call(value) === '[object Array]')
            {
                const typeOfArray = type.substring(0, type.length - 2);

                if (typeOfArray != '*')
                {
                    const lengthOfValue = value.length;
                    for (let i = 0; i < lengthOfValue; i++)
                    {
                        if (typeof value[i] != typeOfArray)
                        {
                            error = true;
                        }
                    }
                }
            }
            else
            {
                error = true;
            }
        }
        else if (type != '*' && typeof value != type)
        {
            error = true;
        }
    }
    else
    {
        error = true;
    }


    if (error)
    {
        throw new TypeError(`This value ${value} isn't ${type}`);
    }

    return true;
}

/**
 * @param {string[]} types
 * @param {*[]} values
 * @return {boolean} - True if not error
 */
function checkSomeTypes(types, values)
{
    checkType('string[]', types);
    checkType('*[]', values);

    var error = true;

    const lengthOfValues = values.length;
    for (let index = 0; index < lengthOfValues; index++)
    {
        if (checkType(types[index], values[index]))
        {
            error = false;
        }
    }

    return !error;
}

function asyncLoop(iterations, func, callback)
{
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop, index);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };

    loop.next();
    return loop;
}

/**
 * @return {[]}
 */
function getUrlPath()
{
    let path = [];

    const url = window.location.href.replace('http://', ''),
        splittedWithPer = url.split('/'),
        splittedWithPerLength = splittedWithPer.length;

    if (splittedWithPerLength > 1 && splittedWithPer[1] !== "")
    {
        for (let i = 1; i < splittedWithPerLength; i++)
        {
            if (!(i === splittedWithPerLength - 1 && splittedWithPer[i].charAt(0) === '?'))
            {
                path.push(splittedWithPer[i]);
            }
        }
    }
    else
    {
        path = null;
    }

    return path;
}

/**
 * @return {object}
 */
function getUrlQuery()
{
    let query = {};

    let splittedParameters = window.location.href.split('?')[1];

    if (splittedParameters)
    {
        splittedParameters = splittedParameters.split('&');
        for(let parameter of splittedParameters)
        {
            const pair = parameter.split('=');
            query[pair[0]] = pair[1];
        }
    }
    else
    {
        query = null;
    }

    return query;
}

/**
 * @return {[]}
 */
function getUrlHash()
{
    let hashes = [];

    let splittedHashes = window.location.href.split('#');

    if (splittedHashes = splittedHashes[1])
    {
        splittedHashes = splittedHashes.split('/');

        if (splittedHashes)
        {
            for (let path of splittedHashes)
            {
                if (path)
                {
                    hashes.push(path);
                }
            }
        }
    }

    return hashes;
}

/**
 * @return {[[], object]}
 */
function getUrlParameters()
{
    return [getUrlPath(), getUrlQuery(), getUrlHash()];
}

/**
 * @param {number} milliseconds
 * @return {number}
 */
function timeOutRestart(milliseconds = 3000)
{
    return setTimeout(start, milliseconds);
}

/**
 * @param {string} selector
 * @param {string|number|boolean} value
 */
function setElementValue(selector, value)
{
    const qs = document.querySelector.bind(document);

    if (qs(selector).nodeName == 'INPUT')
    {
        qs(selector).value = value;
    }
    else
    {
        qs(selector).innerHTML = value;
    }
}

/**
 * @param {string} selector
 * @return {string}
 */
function getElementValue(selector)
{
    const qs = document.querySelector.bind(document);

    if (qs(selector).nodeName == 'INPUT')
    {
        return qs(selector).value;
    }
    else
    {
        return qs(selector).innerHTML;
    }
}


module.exports = {
    start: start,
    isEmptyObject: isEmptyObject,
    checkType: checkType,
    checkSomeTypes: checkSomeTypes,
    asyncLoop: asyncLoop,
    getUrlPath: getUrlPath,
    getUrlQuery: getUrlQuery,
    getUrlHash: getUrlHash,
    getUrlParameters: getUrlParameters,
    timeOutRestart: timeOutRestart,
    getElementValue: getElementValue,
    setElementValue: setElementValue
};