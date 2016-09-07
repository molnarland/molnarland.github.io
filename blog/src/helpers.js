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

module.exports = {
    isEmptyObject: isEmptyObject,
    checkType: checkType,
    checkSomeTypes: checkSomeTypes
};