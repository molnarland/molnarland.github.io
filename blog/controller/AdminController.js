import {DatabaseController} from '../src/imports';

export default class AdminController
{
    constructor (args)
    {
        this.helpers = require('../src/helpers');
        this.functions = require('../../script/es6/functions');

        this.contentElement = '#wrapper';
        this.dc = new DatabaseController();

        const fileName = args.file || '';

        switch (fileName)
        {
            case 'labels.html':
                this.labels();
                break;
            case 'posts.html':
                this.posts();
                break;
            default:
                break;
        }
    }

    labels ()
    {
        const that = this,
            enSelector = '#en-name',
            huSelector = '#hu-name';

        let languages = [],
            newLabels = [],
            currentLabels = [];


        this.dc.select('languages', (result) =>
        {
            languages = result;


            this.dc.select('labels', (result) =>
            {
                currentLabels = result;
            }, {once: true}, () =>
            {
                listingLabels();

                document.getElementById('new-label').addEventListener('click', newLabelClick);

                document.getElementById('save-change').addEventListener('click', saveChangeClick);
            });
        });

        function listingLabels()
        {
            let html = '';

            for(let currentLabel of currentLabels)
            {
                if (currentLabel.content)
                {
                    html += labelHtmlTemplate(currentLabel.id, currentLabel.content.hu, currentLabel.content.en)
                }
            }

            document.querySelector(that.contentElement).innerHTML = html;

            addAllDeleteEvent();
            addAllUpdateEvent();
        }

        function newLabelClick()
        {
            const enName = that.helpers.getElementValue(enSelector),
                huName = that.helpers.getElementValue(huSelector),
                errorClass = 'error';

            if (enName && huName)
            {
                newLabels.push({
                    en: enName,
                    hu: huName
                });

                that.helpers.setElementValue(enSelector, '');
                that.helpers.setElementValue(huSelector, '');

                document.querySelector(that.contentElement).innerHTML +=
                    labelHtmlTemplate(null, huName, enName);

                this.functions.removeClass(enSelector, errorClass);
                this.functions.removeClass(huSelector, errorClass);

                addAllDeleteEvent();
                addAllUpdateEvent();
            }
            else
            {
                if (!enName)
                {
                    that.functions.addClass(enSelector, errorClass);
                }
                else
                {
                    that.functions.removeClass(enSelector, errorClass);
                }

                if (!huName)
                {
                    that.functions.addClass(huSelector, errorClass);
                }
                else
                {
                    that.functions.removeClass(huSelector, errorClass);
                }
            }
        }

        function saveChangeClick()
        {
            let endLabels = [];

            //add essence of currentLabels
            for(let index in currentLabels)
            {
                let currentLabel = currentLabels[index];
                let originalLabelInfos = {};


                getLabelInfosFromNodeAndChangeNodeHtml(document.querySelector(that.contentElement).childNodes[index], (attr) =>
                {
                    originalLabelInfos[attr.elem] = attr.node.dataset.original;
                });

                let languageIndex = languages.indexOf(languages.find(
                    (language) =>
                        language.hu == originalLabelInfos.hu && language.en == originalLabelInfos.en
                ));

                languages[languageIndex].hu = currentLabel.content.hu;
                languages[languageIndex].en = currentLabel.content.en;


                endLabels.push({
                    id: currentLabel.id,
                    contentId: currentLabel.contentId
                })
            }

            for(let newLabel of newLabels)
            {
                const existLabel = currentLabels.find(
                    (label) => label.content.en == newLabel.en && label.content.hu == newLabel.hu
                );


                if (!existLabel)
                {
                    let contentId;

                    const existLanguage = languages.find(
                        (lang) => lang.en == newLabel.en && lang.hu == newLabel.hu
                    );

                    if (existLanguage)
                    {
                        contentId = existLanguage.id;
                    }
                    else
                    {
                        contentId = languages.length + 1;

                        languages.push({
                            id: contentId,
                            hu: newLabel.hu,
                            en: newLabel.en
                        });
                    }


                    endLabels.push({
                        id: endLabels.length + 1,
                        contentId: contentId
                    });
                }
            }


            that.dc.saveJSON(languages, 'languages');
            that.dc.saveJSON(endLabels, 'labels');
        }

        function labelHtmlTemplate(id, hu, en)
        {
            return `<section id="label-${id}" class="label" style="border:10px double black">
                                <p data-original="${id}" class="id">ID: <var>${id}</var></p>
                                <p data-original="${hu}" class="hu">Hungarian: <var>${hu}</var></p>
                                <p data-original="${en}" class="en">English: <var>${en}</var></p>
                                <button class="update" data-clicked="0">Update</button>
                                <button class="delete">Delete</button>
                            </section>`;
        }

        function getDataFromPElement(p)
        {
            const varTag = p.childNodes[1],
                child = varTag.childNodes[0];

            if (child.nodeName === 'INPUT')
            {
                return child.value;
            }
            else
            {
                return varTag.innerHTML;
            }
        }

        function getLabelInfosFromNodeAndChangeNodeHtml(labelSection, callback)
        {
            let result = {};
            let callCallback = that.helpers.ifExistCallbackICall;

            for (let child of labelSection.childNodes)
            {
                switch (child.className)
                {
                    case 'id':
                        result.id = getDataFromPElement(child);
                        callCallback(callback, {elem: 'id', node: child, data: result.id});
                        break;
                    case 'hu':
                        result.hu = getDataFromPElement(child);
                        callCallback(callback, {elem: 'hu', node: child, data: result.hu});
                        break;
                    case 'en':
                        result.en = getDataFromPElement(child);
                        callCallback(callback, {elem: 'en', node: child, data: result.en});
                        break;
                    default:
                        break;
                }
            }

            return result;
        }

        function searchLabel(datas, callback)
        {
            let labelInfos = that.helpers.isHtmlElement(datas)
                ? getLabelInfosFromNodeAndChangeNodeHtml(datas) : datas;


            if (labelInfos.id != 'null') //these labels still be
            {
                let arrayIndex = currentLabels.indexOf(currentLabels.find(
                    value =>
                        value.id == labelInfos.id
                        && value.content.hu == labelInfos.hu
                        && value.content.en == labelInfos.en
                ));

                if (arrayIndex > -1)
                {
                    return callback(currentLabels, arrayIndex, true);
                }
            }
            else //these labels maybe will be, other objects
            {
                let arrayIndex = newLabels.indexOf(newLabels.find(
                    value => value.hu == labelInfos.hu && value.en == labelInfos.en
                ));

                if (arrayIndex > -1)
                {
                    return callback(newLabels, arrayIndex, false)
                }
            }

            return callback(false, false, false);
        }

        function addAllDeleteEvent()
        {
            Array.from(document.querySelectorAll('.label .delete')).forEach(button =>
            {
                button.addEventListener('click', (event) =>
                {
                    let section = event.target.parentNode;

                    searchLabel(section, (labelArray, index) =>
                    {
                        labelArray.splice(index, 1);
                    });

                    section.parentNode.removeChild(section);
                });
            });
        }

        function addAllUpdateEvent()
        {
            Array.from(document.querySelectorAll('.label .update')).forEach(button =>
            {
                button.addEventListener('click', (event) =>
                {
                    let section = event.target.parentNode;

                    if (button.dataset.clicked == '0')
                    {
                        button.dataset.clicked = '1';
                        button.innerHTML = 'Save';

                        /*let labelInfos = */getLabelInfosFromNodeAndChangeNodeHtml(section, (args) =>
                        {
                            let elem = args.elem,
                                node = args.node,
                                data = args.data;

                            node.dataset.oldValue = data;

                            node.childNodes[1].innerHTML = `<input type="text" value="${data}">`;
                        });
                    }
                    else if(button.dataset.clicked == '1')
                    {
                        button.dataset.clicked = '0';
                        button.innerHTML = 'Update';

                        let oldLabels = {};

                        let labelInfos = getLabelInfosFromNodeAndChangeNodeHtml(section, (args) =>
                        {
                            let elem = args.elem,
                                node = args.node/*,
                                data = args.data*/;

                            oldLabels[elem] = node.dataset.oldValue;
                            delete node.dataset.oldValue;

                            node.childNodes[1].innerHTML = args.data;
                        });


                        searchLabel(oldLabels, (labelArray, index, isCurrent) =>
                        {
                            if (labelArray)
                            {
                                if (isCurrent)
                                {
                                    labelArray[index].id = labelInfos.id;
                                    labelArray[index].content.hu = labelInfos.hu;
                                    labelArray[index].content.en = labelInfos.en;
                                }
                                else
                                {
                                    labelArray[index].id = labelInfos.id;
                                    labelArray[index].hu = labelInfos.hu;
                                    labelArray[index].en = labelInfos.en;
                                }
                            }

                            console.log(currentLabels);
                        });
                    }
                });
            });
        }
    }

    posts ()
    {

    }
}