export default class DatabaseController
{
    select (from)
    {
        this.loadJSON(from, (response) =>
        {
            console.log(response);
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
}