class JsonToHtml
{
    /**
     * @param {string} fileName
     * @param {string} idOfEditor
     * @param {string} idOfSaveButton
     * @param {string} idOfOutput
     */
    constructor ({fileName, idOfEditor = 'in', idOfSaveButton = 'save', idOfOutput = 'out'})
    {
        this.in = idOfEditor;
        this.out = idOfOutput;
        this.saveButton = idOfSaveButton;

        let outter = document.getElementById(this.out);

        let editor = this.editorInit();
        editor.on('change', function (cm)
        {
            this.start(cm.getValue(), outter);
        }.bind(this));

        document.getElementById(this.saveButton).addEventListener('click', function (e)
        {
            let filename = fileName || prompt('What would you like for filename?');
            while (!filename)
            {
                filename = prompt('Please type a filename!');
            }

            JsonToHtml.saveFile(editor.doc.cm.getValue(), filename);
        });
    }

    /**
     * @return {object}
     */
    editorInit ()
    {
        return CodeMirror.fromTextArea(document.getElementById(this.in),
        {
            mode: "application/json",
            lineNumbers: true,
            autoCloseBrackets: true,
            showCursorWhenSelecting: true,
            lineWrapping: true,
            theme: 'monokai',
            matchBrackets: true,
            tabSize: 2,
            keyMap: 'sublime'
        });
    }

    /**
     * @param {string} jsonString
     * @param {HTMLElement} out
     */
    start (jsonString, out)
    {
        let outString = '';

        try
        {
            this.object = JSON.parse(jsonString);
            outString = this.cycle(this.object);
        }
        catch (e)
        {
            outString = e.message;
        }

        out.innerHTML = outString;
    }

    /**
     * @param {object} object
     * @param {function} callback - optional
     * @return {string}
     */
    cycle (object, callback)
    {
        let html = '';

        for (let index in object)
        {
            let tag = index,
                id = this.findFromFirstChar(object[index], '#'),
                classOfElement = this.findFromFirstChar(object[index], '.'),
                style = this.findFromFirstChar(object[index], '*'),
                other = this.findFromFirstChar(object[index], '-'),
                innerText = this.findFromNotFirstChar(object[index], ['#', '.', '*', '-']);
            let innerObject = object[index].find(elem => typeof elem == 'object');

            if (innerObject)
            {
                this.cycle(innerObject, (innerElement) =>
                {
                    html += this.whichTagTypeWay(tag, id, classOfElement, style, other, innerText + innerElement);
                });
            }
            else
            {
                html += this.whichTagTypeWay(tag, id, classOfElement, style, other, innerText);
            }
        }

        if (typeof callback == "function")
        {
            return callback(html);
        }

        return html;
    }

    /**
     * @param {string} tag
     * @param {string} id
     * @param {string} classOfElement
     * @param {string} style
     * @param {string} other
     * @param {string} inner
     * @return {string}
     */
    whichTagTypeWay (tag, id, classOfElement, style, other = '', inner = '')
    {
        if (inner != '' && tag == 'input')
        {
            return this.selfClosedTag(tag, id, classOfElement, style, other)
        }
        else
        {
            return this.withCloseTag(tag, id, classOfElement, style, other, inner);
        }
    }

    /**
     * @param {string} tag
     * @param {string} id
     * @param {string} classOfElement
     * @param {string} style
     * @param {string} other
     * @return {string}
     */
    selfClosedTag (tag, id, classOfElement, style, other = '')
    {
        return `<${tag} id="${id}" class="${classOfElement}" style="${style}" ${other} />`;
    }

    /**
     * @param {string} tag
     * @param {string} id
     * @param {string} classOfElement
     * @param {string} style
     * @param {string} other
     * @param {string} inner
     * @return {string}
     */
    withCloseTag (tag, id, classOfElement, style, other = '', inner = '')
    {
        return `<${tag} id="${id}" class="${classOfElement}" style="${style}" ${other}>
                    ${inner}
                </${tag}>`;
    }

    /**
     * @param {[]} arrayOfChars
     * @param {string} char
     * @return {*}
     */
    findFromFirstChar (arrayOfChars, char)
    {
        let found = arrayOfChars.find(elem => typeof elem == 'string' && elem.charAt(0) == char);
        return (!found) ? '' : found.substring(1);
    }

    /**
     * @param {[]} arrayOfChars
     * @param {string} char
     * @return {*}
     */
    findFromNotFirstChar (arrayOfChars, chars)
    {
        let found = arrayOfChars.find(elem => chars.indexOf(elem.charAt(0)) === -1);
        return (!found) ? '' : found;
    }


    /**
     * @param {string} value
     * @param {string} filename
     */
    static saveFile (value, filename)
    {
        value = `{"${filename}": ${value}}`;

        require('../../blog/lib/FileSaver').saveAs(
            new Blob([value], {type: 'application/json;charset=utf8'}),
            `${filename}.json`
        );
    }
}

new JsonToHtml({});