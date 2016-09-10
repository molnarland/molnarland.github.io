import {LanguageModel, LabelModel} from '../src/imports';

export default class DatabaseController
{
    /**
     * @param {string} from
     * @param {function} callback
     * @return {function(LanguageModel[]|LabelModel[]|boolean)}
     */
    select (from, callback, clauses = {})
    {
        require('../src/helpers').checkSomeTypes(
            ['string', 'function'], [from, callback]
        );

        const model = this.getModelByFrom(from);

        if (!model)
        {
            return callback(false);
        }

        this.loadJSON(from, (response) =>
        {
            let array = [];

            for (let object of response)
            {
                this.runClauses(clauses, object, function (add)
                {
                    // if all ok, add to result this object
                    if (add)
                    {
                        array.push(new model(object));
                    }
                });

            }

            return callback(array);
        });
    }

    runClauses (clauses = {}, from, callback)
    {
        let okay = true;
        const that = this;

        this.runJoins(clauses.join, from, okay, function (okay, from)
        {
            that.runWhere(clauses.where, from, okay, callback);
        });
    }

    runJoins (joins, from, okay, callback)
    {
        if (joins && okay)
        {
            for (let join of joins)
            {
                const json = join.json || null;
                const opt1 = join.opt1 || null;
                const opt2 = join.opt2 || null;

                if (!json || !opt1 || !opt2)
                {
                    throw ReferenceError('json or opt1 or opt2 are null');
                }

                const getModel = this.getModelByFrom;

                this.loadJSON(json, function (result)
                {
                    result = result.find(function (object)
                    {
                        return object[opt1] === from[opt2]
                            || object[opt2] === from[opt1];
                    });

                    if (result)
                    {
                        if (!(model = getModel(from)))
                        {
                            from.language = new model(result);
                            return callback(okay, from);
                        }
                    }

                    return callback(false, from);
                });
            }
        }

        return callback(okay, from);
    }

    runWhere (wheres, from, okay, callback)
    {
        if (wheres && okay)
        {
            for (where of wheres)
            {
                const operator = where.operator || null;
                let opt1 = where.opt1 || null;
                let opt2 = where.opt2 || null;

                if (!operator || !opt1 || !opt2)
                {
                    throw ReferenceError('json or opt1 or opt2 are null');
                }



                // return callback(
                //     //TODO opt1, opt2 from other json
                //     this.getIfResult(operator, from[opt1], from[opt2]),
                //     from
                // );
            }
        }

        return callback(okay, from);
    }


    /**
     * @author https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
     * @param {string} filename
     * @param {function(*[])} callback
     */
    loadJSON (filename, callback)
    {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', `json/${filename}.json`, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                callback(JSON.parse(xobj.responseText)[filename]);
            }
        };
        xobj.send(null);
    }

    /**
     *
     * @param {string} from
     * @return {*}
     */
    getModelByFrom (from)
    {
        switch (from)
        {
            case 'languages':
                return LanguageModel;
                break;
            case 'labels':
                return LabelModel;
                break;
            default:
                return false;
                break;
        }
    }

    getIfResult (operator, number1, number2)
    {
        switch (operator)
        {
            case '=':
                return number1 === number2;
                break;
            case '>':
                return number1 > number2;
                break;
            case '>=':
                return number1 >= number2;
                break;
            case '<':
                return number1 < number2;
                break;
            case '<=':
                return number1 <= number2;
                break;
            case '<>':
                return number1 !== number2;
                break;
            default:
                return false;
                break;
        }
    }
};