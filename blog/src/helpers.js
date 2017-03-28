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
    const qs = document.querySelector.bind(document),
        node = qs(selector);

    switch (node.nodeName.toLowerCase())
    {
        case 'input':
        case 'textarea':
            node.value = value;
            break;


        case 'select':
            break;


        default:
            return node.innerHTML;
            break;
    }
}

/**
 * @param {string|HTMLElement} selectorOrNode
 * @param {Editor} [editorObject]
 * @return {string|string[]}
 */
function getElementValue(selectorOrNode, editorObject)
{
    let node;

    if (isHtmlElement(selectorOrNode))
    {
        node = selectorOrNode;
    }
    else
    {
        node = document.querySelector(selectorOrNode);
    }


    switch (getNodeName(selectorOrNode))
    {
        case 'input':
            return node.value;
            break;
        case 'textarea':
            if (typeof editorObject == 'undefined')
            {
                return node.value;
            }

            return editorObject.getValueOfEditor() || node.value;
            break;
        case 'select':
            let values = [];

            for(let selectedOption of node.selectedOptions)
            {
                values.push(selectedOption.value);
            }

            return (values.length > 0) ? values : '';
            break;
        default:
            return node.innerHTML;
            break;
    }
}

function l(text)
{
    console.log(text);
}

function ifExistCallbackICall(callback, args)
{
    if (typeof callback === 'function')
    {
        callback(args);
    }
}

/**
 * @description Returns true if it is a DOM node
 * @param object
 * @return {boolean}
 */
function isNode(object)
{
    return (
        typeof Node === "object" ? object instanceof Node :
        object && typeof object === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string"
    );
}

/**
 * @description Returns true if it is a DOM element
 * @param object
 * @return {boolean}
 */
function isHtmlElement(object)
{
    return (
        typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
        object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
    );
}

/**
 * @param {string} selector
 * @param {boolean} selected
 * @return {boolean}
 */
function changeAllOptionInSelect(selector, selected)
{
    if (getNodeName(selector) === 'select')
    {
        let node = document.querySelector(selector);
        for(let option of node)
        {
            option.selected = selected;
        }

        return true;
    }

    return false;
}

/**
 * @param {string|HTMLElement} selectorOrNode
 * @return {string}
 */
function getNodeName(selectorOrNode)
{
    if (isHtmlElement(selectorOrNode))
    {
        return selectorOrNode.nodeName.toLowerCase();
    }
    else
    {
        return document.querySelector(selectorOrNode).nodeName.toLowerCase();
    }
}

/**
 * @param {Array} notNumberArray
 * @return {Array}
 */
function arrayElementsConvertToNumber(notNumberArray)
{
    let numberArray = [];
    for (let notNumberElem of notNumberArray)
    {
        const numberElem = Number(notNumberElem);
        numberArray.push(numberElem);
    }

    return numberArray;
}

/**
 * @param {string} selector
 * @param {string} eventName
 * @param {function({section: HTMLElement, button: HTMLElement})} callback
 */
function addEventToAllElement (selector, eventName, callback)
{
    let elements = document.querySelectorAll(selector);
    for (let element of elements)
    {
        element.addEventListener(eventName, (event) =>
        {
            let section = event.target.parentNode;

            ifExistCallbackICall(callback, {section: section, button: element});
        });
    }
}

/**
 * @param {string} string
 * @param {string} separator
 * @param {object} object
 * @param {*} data
 */
function stringSplitAndCreateObject(string, separator, object, data, callback)
{
    const splittedString = string.split(separator),
        lengthOfSplittedString = splittedString.length;

    let pieceOfObjectWhereITakeThePieceOfString = object;
    for (let index = 0; index < lengthOfSplittedString; index++)
    {
        const currentPieceOfString = splittedString[index];

        // console.log(index);
        // console.log(pieceOfObjectWhereITakeThePieceOfString, object, currentPieceOfString, string);

        if (!pieceOfObjectWhereITakeThePieceOfString[currentPieceOfString])
        {
            if (index !== lengthOfSplittedString - 1)
            {
                pieceOfObjectWhereITakeThePieceOfString[currentPieceOfString] = {};
            }
            else
            {
                pieceOfObjectWhereITakeThePieceOfString[currentPieceOfString] = data;
            }
        }

        pieceOfObjectWhereITakeThePieceOfString = pieceOfObjectWhereITakeThePieceOfString[currentPieceOfString];
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
    setElementValue: setElementValue,
    ifExistCallbackICall: ifExistCallbackICall,
    isNode: isNode,
    isHtmlElement: isHtmlElement,
    changeAllOptionInSelect: changeAllOptionInSelect,
    arrayElementsConvertToNumber: arrayElementsConvertToNumber,
    addEventToAllElement: addEventToAllElement,
    stringSplitAndCreateObject: stringSplitAndCreateObject
};