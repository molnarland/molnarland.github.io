import {LanguageModel, LabelModel, PostModel} from '../src/imports';
import * as Cookies from '../../libs/js.cookie';

export default class DatabaseController
{
    /**
     * @param {string} from
     * @param {function} end
     * @param {object} clauses
     * @param {function} modelCallback
     * @return {function(LanguageModel[]|LabelModel[]|boolean)}
     */
    select (from, end, clauses = {}, modelCallback = null)
    {
        require('../src/helpers').checkSomeTypes(
            ['string', 'function'], [from, end]
        );

        const model = this.getModelByFrom(from);

        if (!model)
        {
            return end(false);
        }

        this.loadJSON(from, (response) =>
        {
            // console.log(response);

            let array = [];
            const that = this;

            for (let index in response)
            {
                this.runClauses(clauses, response[index], function (add, result)
                {
                    // if all ok, add to result this object
                    if (add)
                    {
                        //only once add a modelCallback
                        if (clauses.once && index < response.length - 1)
                        {
                            array.push(new model(result));
                        }
                        else
                        {
                            array.push(new model(result, modelCallback));
                        }
                    }

                });
            }

            return end(array);
        });
    }

    runClauses (clauses = {}, from, callback)
    {
        let okay = true;
        const that = this;

        this.runJoins(clauses.join, from, okay, (okay, from) =>
        {
            that.runWhere(clauses.where, from, okay, (okay, from) =>
            {
                return callback(okay, from);
            });
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

                this.loadJSON(json, (result) =>
                {
                    result = result.find(
                        (object) => object[opt1] === from[opt2] || object[opt2] === from[opt1]
                    );


                    if (result)
                    {
                        let model = getModel(from);
                        if (!model)
                        {
                            from.content = new model(result);
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
            for (let where of wheres)
            {
                const operator = where.operator || null;
                let opt1 = where.opt1 || null;
                let opt2 = where.opt2 || null;

                if (!operator || !opt1 || !opt2)
                {
                    throw ReferenceError('json or opt1 or opt2 are null');
                }

                //TODO opt1, opt2 from other json
                opt1 = (where.opt1Avail) ? opt1 : from[opt1];
                opt2 = (where.opt2Avail) ? opt2 : from[opt2];

                return callback(
                    this.getIfResult(operator, opt1, opt2),
                    from
                );
            }
        }

        return callback(okay, from);
    }

    /**
     * @param {string} filename
     * @param {function(object)} callback
     */
    loadJSON (filename, callback)
    {
        try
        {
            return callback(require(`../json/${filename}.json`)[filename]);
        }
        catch (e)
        {
            let result = this.JSONSession(filename).get();
            if (!result)
            {
                result = this.JSONCookie(filename).get();
                if (!result)
                {
                    this.JSONSession(filename).set(result);

                    this.loadJSONFromFile(filename, (result) =>
                    {
                        this.JSONSession(filename).set(result);
                        this.JSONCookie(filename).set(result);

                        return callback(result);
                    });
                }
            }

            return callback(result);
        }

    }

    /**
     * @author https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
     * @param {string} filename
     * @param {function(object)} callback
     */
    loadJSONFromFile (filename, callback)
    {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', `/blog/json/${filename}.json`, true);
        xobj.onreadystatechange = () =>
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                callback(JSON.parse(xobj.responseText)[filename]);
            }
        };
        xobj.send(null);
    }


    /**
     * @param {object} datas
     * @param {string} filename
     */
    static saveJSONToFile (datas, filename)
    {
        datas = `{"${filename}": ${JSON.stringify(datas)}}`;

        require('../../libs/FileSaver').saveAs(
            new Blob([datas], {type: 'application/json;charset=utf8'}),
            `${filename}.json`
        );

    }

    /**
     * @param {string} name
     * @return {object}
     */
    JSONSession (name)
    {
        return {
            /**
             * @return {object|null}
             */
            get: () =>
            {
                if (typeof sessionStorage !== 'undefined')
                {
                    return JSON.parse(sessionStorage.getItem(name));
                }
                return null;
            },
            /**
             * @param {object} datas
             */
            set: (datas) =>
            {
                if (typeof sessionStorage !== 'undefined')
                {
                    sessionStorage.setItem(name, JSON.stringify(datas));
                }
            }
        }
    }

    /**
     * @param {string} name
     * @return {object}
     */
    JSONCookie (name)
    {
        return {
            /**
             * @return {object}
             */
            get: () =>
            {
                return Cookies.getJSON(name);
            },
            /**
             * @param {object} datas
             */
            set: (datas) =>
            {
                Cookies.set(name, datas, {expires: 3});
            }
        }
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
            case 'posts':
                return PostModel;
                break;
            default:
                return false;
                break;
        }
    }

    getIfResult (operator, var1, var2)
    {
        switch (operator)
        {
            case '=':
                return var1 === var2;
                break;
            case '>':
                return var1 > var2;
                break;
            case '>=':
                return var1 >= var2;
                break;
            case '<':
                return var1 < var2;
                break;
            case '<=':
                return var1 <= var2;
                break;
            case '<>':
                return var1 !== var2;
                break;
            default:
                return false;
                break;
        }
    }
};