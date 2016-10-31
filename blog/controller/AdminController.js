import {DatabaseController} from '../src/imports';

export default class AdminController
{
    constructor (args)
    {
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
                const that = this,
                    enSelector = '#en-name',
                    huSelector = '#hu-name';

                listingLabels();

                document.getElementById('new-label').addEventListener('click', newLabelClick);

                document.getElementById('save-change').addEventListener('click', saveChangeClick);


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
                }

                function newLabelClick()
                {
                    const helpers = require('../src/helpers'),
                        functions = require('../../script/es6/functions');

                    const enName = helpers.getElementValue(enSelector),
                        huName = helpers.getElementValue(huSelector),
                        errorClass = 'error';

                    if (enName && huName)
                    {
                        newLabels.push({
                            en: enName,
                            hu: huName
                        });

                        helpers.setElementValue(enSelector, '');
                        helpers.setElementValue(huSelector, '');

                        document.querySelector(that.contentElement).innerHTML +=
                            labelHtmlTemplate(null, huName, enName);

                        functions.removeClass(enSelector, errorClass);
                        functions.removeClass(huSelector, errorClass);
                    }
                    else
                    {
                        if (!enName)
                        {
                            functions.addClass(enSelector, errorClass);
                        }
                        else
                        {
                            functions.removeClass(enSelector, errorClass);
                        }

                        if (!huName)
                        {
                            functions.addClass(huSelector, errorClass);
                        }
                        else
                        {
                            functions.removeClass(huSelector, errorClass);
                        }
                    }
                }

                function saveChangeClick()
                {
                    let endLabels = [];

                    //add essence of currentLabels
                    for(let currentLabel of currentLabels)
                    {
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
                    return `<section class="label" style="border:10px double black">
                                <p class="id">ID: ${id}</p>
                                <p class="hu">Hungarian: ${hu}</p>
                                <p class="en">English: ${en}</p>
                            </section>`;
                }
            });
        });


    }

    posts ()
    {

    }
}