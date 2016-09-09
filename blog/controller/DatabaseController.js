import {LanguageModel} from '../src/imports';

export default class DatabaseController
{
    /**
     * @param {string} from
     */
    select (from, callback)
    {
        require('../src/helpers').checkType('string', from);

        var modelName;

        switch (from)
        {
            case 'languages':
                modelName = LanguageModel;
                break;
            default:
                return false;
                break;
        }

        this.loadJSON(from, (response) =>
        {
            let array = [];

            for (let object of response)
            {
                array.push(new modelName(object));
            }

            return callback(array);
        });
    }

    /**
     * @author https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
     * @param {string} filename
     * @param {function} callback
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
     * @param {string} from
     */
    createClassNameByFrom (from)
    {
        let className = from.substring(0, from.length - 1);
        className = className.charAt(0).toUpperCase() + className.slice(1);
        className += 'Model';

        return className;
    }
};