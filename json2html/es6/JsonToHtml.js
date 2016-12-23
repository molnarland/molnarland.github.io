export default class JsonToHtml
{
    /**
     * @param {string} jsonString
     * @param {HTMLElement} out
     */
    constructor (jsonString, out)
    {
        let outString = '';

        try
        {
            this.object = JSON.parse(jsonString);
            outString = this.cycle(this.object);
        }
        catch (e)
        {
            outString = jsonString;
            console.info(e.message);
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
            const tag = index;

            if(typeof object[index] === 'string')
            {
                const innerText = object[index];

                html += this.whichTagTypeWay(tag, {inner: innerText});
            }
            else
            {
                const id = this.findFromFirstChar(object[index], '#'),
                    classOfElement = this.findFromFirstChar(object[index], '.'),
                    style = this.findFromFirstChar(object[index], '*'),
                    other = this.findFromFirstChar(object[index], '-'),
                    innerText = this.findFromNotFirstChar(object[index], ['#', '.', '*', '-']);
                const innerObject = object[index].find(elem => typeof elem == 'object');

                if (innerObject)
                {
                    this.cycle(innerObject, (innerElement) =>
                    {
                        html += this.whichTagTypeWay(tag, {
                            id: id,
                            classOfElement: classOfElement,
                            style: style,
                            other: other,
                            inner: innerText + innerElement
                        });
                    });
                }
                else
                {
                    html += this.whichTagTypeWay(tag, {
                        id: id,
                        classOfElement: classOfElement,
                        style: style,
                        other: other,
                        inner: innerText
                    });
                }
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
     * @param {string} [id]
     * @param {string} [classOfElement]
     * @param {string} [style]
     * @param {string} [other]
     * @param {string} [inner]
     * @return {string}
     */
    whichTagTypeWay (tag, {id, classOfElement, style, other = '', inner = ''})
    {
        if (tag == 'input')
        {
            return this.selfClosedTag(tag, {
                id: id,
                classOfElement: classOfElement,
                style: style,
                other: other
            })
        }
        else
        {
            return this.withCloseTag(tag, {
                id: id,
                classOfElement: classOfElement,
                style: style,
                other: other,
                inner: inner
            });
        }
    }

    /**
     * @param {string} tag
     * @param {string} [id]
     * @param {string} [classOfElement]
     * @param {string} [style]
     * @param {string} [other]
     * @return {string}
     */
    selfClosedTag (tag, {id, classOfElement, style, other = ''})
    {
        id = (id) ? `id="${id}"` : '';
        classOfElement = (classOfElement) ? `class="${classOfElement}"` : '';
        style = (style) ? `style="${style}"` : '';

        return `<${tag} ${id} ${classOfElement} ${style} ${other} />`;
    }

    /**
     * @param {string} tag
     * @param {string} [id]
     * @param {string} [classOfElement]
     * @param {string} [style]
     * @param {string} [other]
     * @param {string} [inner]
     * @return {string}
     */
    withCloseTag (tag, {id, classOfElement, style, other = '', inner = ''})
    {
        id = (id) ? `id="${id}"` : '';
        classOfElement = (classOfElement) ? `class="${classOfElement}"` : '';
        style = (style) ? `style="${style}"` : '';

        return `<${tag} ${id} ${classOfElement} ${style} ${other}>
                    ${inner}
                </${tag}>`;
    }

    /**
     * @param {[]} arrayOfElements
     * @param {string} char
     * @return {*}
     */
    findFromFirstChar (arrayOfElements, char)
    {
        let found = arrayOfElements.find(elem => typeof elem == 'string' && elem.charAt(0) == char);
        return (!found) ? '' : found.substring(1);
    }

    /**
     * @param {[]} arrayOfElements
     * @param {string} char
     * @return {*}
     */
    findFromNotFirstChar (arrayOfElements, chars)
    {
        let found = arrayOfElements.find(elem => chars.indexOf(elem.charAt(0)) === -1);
        return (!found) ? '' : found;
    }
}