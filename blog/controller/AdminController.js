import {DatabaseController} from '../src/imports';
import JsonToHtml from '../../json2html/es6/JsonToHtml';
import Editor from '../../json2html/es6/Editor';

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


                getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(document.querySelector(that.contentElement).childNodes[index], (attr) =>
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


            DatabaseController.saveJSONToFile(languages, 'languages');
            DatabaseController.saveJSONToFile(endLabels, 'labels');
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

        function getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(labelSection, callback)
        {
            let result = {};
            let callCallback = that.helpers.ifExistCallbackICall;

            for (let child of labelSection.childNodes)
            {
                switch (child.className)
                {
                    case 'id':
                        result.id = that.getDataFromPElement(child);
                        callCallback(callback, {elem: 'id', node: child, data: result.id});
                        break;
                    case 'hu':
                        result.hu = that.getDataFromPElement(child);
                        callCallback(callback, {elem: 'hu', node: child, data: result.hu});
                        break;
                    case 'en':
                        result.en = that.getDataFromPElement(child);
                        callCallback(callback, {elem: 'en', node: child, data: result.en});
                        break;
                    default:
                        break;
                }
            }

            return result;
        }

        function searchLabel(currents, news, datas, callback)
        {
            let infos = (require('../src/helpers').isHtmlElement(datas))
                ? getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(datas) : datas;


            if (infos.id != 'null') //these still don't saved
            {
                let arrayIndex = that.searchIndex(currents, //label
                    (value) =>
                        value.id == infos.id
                        && String(value.content.hu) == infos.hu
                        && String(value.content.en) == infos.en
                );


                if (arrayIndex > -1)
                {
                    return callback(currents, arrayIndex, true);
                }
            }
            else //these perhaps will be saved
            {
                let arrayIndex = that.searchIndex(news, //label
                    (value) =>
                        String(value.hu) == infos.hu
                        && String(value.en) == infos.en
                );


                if (arrayIndex > -1)
                {
                    return callback(news, arrayIndex, false)
                }
            }

            return callback(false, false, false);
        }

        {
            require('../src/helpers').addEventToAllElement('.label .delete', 'click', (attr) =>
            {
                let section = attr.section,
                    button = attr.button;

                searchLabel(section, (labelArray, index) =>
                {
                    labelArray.splice(index, 1);
                });

                section.parentNode.removeChild(section);
            });
        }

        function addAllUpdateEvent()
        {
            require('../src/helpers').addEventToAllElement('.label .update', 'click', (attr) =>
            {
                let section = attr.section,
                    button = attr.button;


                if (button.dataset.clicked == '0')
                {
                    button.dataset.clicked = '1';
                    button.innerHTML = 'Save';

                    /*let labelInfos = */getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, (args) =>
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

                    let labelInfos = getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, (args) =>
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
                    });
                }
            });
        }
    }

    posts ()
    {
        const that = this,
            labelSeparator = ', ',
            createdSelector = '#created',
            labelsSelector = '#labels',
            contentHuSelector = '#content-hu',
            contentEnSelector = '#content-en',
            titleHuSelector = '#title-hu',
            titleEnSelector = '#title-en',
			shortHuSelector = '#short-hu',
			shortEnSelector = '#short-en',
            urlHuSelector = '#url-hu',
            urlEnSelector = '#url-en',
            contentHuOutputSelector = '#content-hu-output',
            contentEnOutputSelector = '#content-en-output';

        const huEditor = initEditor(contentHuSelector, contentHuOutputSelector);
        const enEditor = initEditor(contentEnSelector, contentEnOutputSelector);

        let currentLabels = [],
            currentPosts = [],
            newPosts = [],
            languages = [];


        this.dc.select('labels', (result) =>
        {
            currentLabels = result;


            this.dc.select('posts', (result) =>
            {
                console.log(result);
                currentPosts = result;
            }, {once: true}, () =>
            {

                this.dc.select('languages', (result) =>
                {
                    languages = result;

                }, {once: true}, () =>
                {

                    listingPosts();

                    document.getElementById('new-post').addEventListener('click', newPostClick);

                    document.getElementById('save-change').addEventListener('click', saveChangeClick);
                });
            });
        }, {once: true}, () =>
        {
            setTimeout(() =>
            {
                const date = new Date();
                document.querySelector('#created').value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;


                for(let label of currentLabels)
                {
                    let option = document.createElement('option');
                    option.setAttribute('value', label.id);
                    option.innerHTML = `${label.content.hu} / ${label.content.en}`;

                    document.querySelector('#labels').appendChild(option);
                }
            }, 100);
        });

        /**
         * @param {string} inner
         * @param {string} outer
         * @return {Editor}
         */
        function initEditor(inner, outer)
        {
            return new Editor({
                idOfEditor: inner.substring(1),
                idOfSaveButton: false,
                idOfOutput: outer.substring(1)
            });
        }

        function listingPosts()
        {
            let html = '';

            for(let currentPost of currentPosts)
            {
                if (currentPost.content)
                {
                    let labelsHu = [],
                        labelsEn = [];

                    for (let label of currentPost.labels)
                    {
                        labelsHu.push(label.content.hu);
                        labelsEn.push(label.content.en);
                    }


                    html += postHtmlTemplate(
                        currentPost.id,
                        currentPost.created,
                        labelsHu,
                        labelsEn,
                        currentPost.content.hu,
                        currentPost.content.en,
                        currentPost.title.hu,
                        currentPost.title.en,
						currentPost.short.hu,
						currentPost.short.en,
                        currentPost.url.hu,
                        currentPost.url.en
                    );
                }
            }


            document.querySelector(that.contentElement).innerHTML = html;

            addAllDeleteEvent();
            addAllUpdateEvent();
        }

        /**
         * @param {number|null} id
         * @param {string} created
         * @param {string[]} labelsHu
         * @param {string[]} labelsEn
         * @param {string} contentHu
         * @param {string} contentEn
         * @param {string} titleHu
         * @param {string} titleEn
		 * @param {string} shortHu
		 * @param {string} shortEn
         * @param {string} urlHu
         * @param {string} urlEn
         * @return {string}
         */
        function postHtmlTemplate(id, created, labelsHu, labelsEn, contentHu, contentEn, titleHu, titleEn, shortHu, shortEn, urlHu, urlEn)
        {
            let labelHuString = labelsHu.join(labelSeparator),
                labelEnString = labelsEn.join(labelSeparator);

            return `<section id="post-${id}" class="post" style="border: 10px dotted saddlebrown">
                        <p data-original="${id}" class="id">ID: <var>${id}</var></p>
                        <p data-original="${created}" class="created">Created: <var>${created}</var></p>
                        <p data-original="${labelHuString}" class="label-hu">Labels in hungarian: <var>${labelHuString}</var></p>
                        <p data-original="${labelEnString}" class="label-en">Labels in english: <var>${labelEnString}</var></p>
                        <p data-original="${contentHu}" class="content-hu">Content in hungarian: <var>${contentHu}</var></p>
                        <p data-original="${contentEn}" class="content-en">Content in english: <var>${contentEn}</var></p>
						<p data-original="${shortEn}" class="short-en">Short in english: <var>${shortEn}</var></p>
                        <p data-original="${urlHu}" class="url-hu">Url in hungarian: <var>${urlHu}</var></p>
                        <p data-original="${urlEn}" class="url-en">Url in english: <var>${urlEn}</var></p>
                        <button class="update" data-clicked="0">Update</button>
                        <button class="delete">Delete</button>
                    </section>`;
        }

        function newPostClick()
        {
            const created = that.helpers.getElementValue(createdSelector),
                labels = that.helpers.getElementValue(labelsSelector),
                contentHu = that.helpers.getElementValue(contentHuSelector, huEditor),
                contentEn = that.helpers.getElementValue(contentEnSelector, enEditor),
                titleHu = that.helpers.getElementValue(titleHuSelector),
                titleEn = that.helpers.getElementValue(titleEnSelector),
				shortHu = that.helpers.getElementValue(shortHuSelector),
                shortEn = that.helpers.getElementValue(shortEnSelector),
                urlHu = that.helpers.getElementValue(urlHuSelector),
                urlEn = that.helpers.getElementValue(urlEnSelector),
                valuesAndSelectors = [
                    {value: created, selector: createdSelector},
                    {value: labels, selector: labelsSelector},
                    {value: contentHu, selector: contentHuSelector},
                    {value: contentEn, selector: contentEnSelector},
                    {value: titleHu, selector: titleHuSelector},
                    {value: titleEn, selector: titleEnSelector},
                    {value: shortHu, selector: shortHuSelector},
                    {value: shortEn, selector: shortEnSelector},
                    {value: shortEn, selector: shortEnSelector},
                    {value: urlHu, selector: urlHuSelector},
                    {value: urlEn, selector: urlEnSelector}
                ],
                errorClass = 'error';


            //true is error, false isn't error
            let existError = false;
            for (let valueAndSelector of valuesAndSelectors)
            {
                const value = valueAndSelector.value,
                    selector = valueAndSelector.selector;

                if (value)
                {
                    that.functions.removeClass(selector, errorClass);
                }
                else
                {
                    that.functions.addClass(selector, errorClass);
                    existError = true;
                }
            }

            if(!existError)
            {
                newPosts.push({
                    created: created,
                    labels: labels,
                    content: {hu: contentHu, en: contentEn},
                    title: {hu: titleHu, en: titleEn},
                    short: {hu: shortHu, en: shortEn},
                    url: {hu: urlHu, en: urlEn}
                });

                that.functions.checkSelector(that.contentElement, (element) =>
                {
                    let fullLabelsHu = [],
                        fullLabelsEn = [];


                    for(let oneLabel of labels)
                    {
                        let foundLabel = currentLabels.find((label) => label.id == oneLabel);

                        fullLabelsHu.push(foundLabel.content.hu);
                        fullLabelsEn.push(foundLabel.content.en);
                    }

                    element.innerHTML += postHtmlTemplate(
                        null, created, fullLabelsHu, fullLabelsEn, contentHu,
                        contentEn, titleHu, titleEn, shortHu, shortEn, urlHu, urlEn
                    );
                });

                for(let valueAndSelector of valuesAndSelectors)
                {
                    const selector = valueAndSelector.selector;


                    if (selector != createdSelector && selector != labelsSelector)
                    {
                        that.helpers.setElementValue(selector, '');
                    }
                    else if (selector == labelsSelector)
                    {
                        that.helpers.changeAllOptionInSelect(selector, false);
                    }
                }
            }

            addAllDeleteEvent();
            addAllUpdateEvent();
        }

        function saveChangeClick()
        {
            let endPosts = [];

            console.log(currentPosts);
            for (let index in currentPosts)
            {

                //it isn't drop correctly a datas of posts
                let currentPost = currentPosts[index],
                    originalPostInfos = {};

                getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(document.querySelector(that.contentElement).childNodes[index], (attr) =>
                {
                    originalPostInfos[attr.elem] = attr.node.dataset.original;
                });


                let contentLanguageIndex = languages.indexOf(languages.find(
                        (language) => String(language.hu) == originalPostInfos['content-hu'] && String(language.en) == originalPostInfos['content-en']
                    )),
                    titleLanguageIndex = languages.indexOf(languages.find(
                        (language) => String(language.hu) == originalPostInfos['title-hu'] && String(language.en) == originalPostInfos['title-en']
                    )),
                    shortLanguageIndex = languages.indexOf(languages.find(
                        (language) => String(language.hu) == originalPostInfos['short-hu'] && String(language.en) == originalPostInfos['short-en']
                    )),
                    urlLanguageIndex = languages.indexOf(languages.find(
                        (language) => String(language.hu) == originalPostInfos['url-hu'] && String(language.en) == originalPostInfos['url-en']
                    ));

                languages[contentLanguageIndex].hu = currentPost.content.hu;
                languages[contentLanguageIndex].en = currentPost.content.en;
                languages[titleLanguageIndex].hu = currentPost.title.hu;
                languages[titleLanguageIndex].en = currentPost.title.en;
                languages[shortLanguageIndex].hu = currentPost.short.hu;
                languages[shortLanguageIndex].en = currentPost.short.en;
                languages[urlLanguageIndex].hu = currentPost.url.hu;
                languages[urlLanguageIndex].en = currentPost.url.en;

                endPosts.push({
                    id: currentPost.id,
                    created: currentPost.created,
                    labelIds: currentPost.labelIds,
                    contentId: currentPost.contentId,
                    titleId: currentPost.titleId,
                    shortId: currentPost.shortId,
                    urlId: currentPost.urlId
                });
            }

            for(let newPost of newPosts)
            {
                const existPost = currentPosts.find(
                    (post) => post.content.en == newPost.en && post.content.hu == newPosts.hu
                );


                if (!existPost)
                {
                    endPosts.push({
                        id: endPosts.length + 1,
                        created: newPost.created,
                        labelIds: that.helpers.arrayElementsConvertToNumber(newPost.labels),
                        contentId: addTextToLanguageAndReturnId(newPost, 'content'),
                        titleId: addTextToLanguageAndReturnId(newPost, 'title'),
                        shortId: addTextToLanguageAndReturnId(newPost, 'short'),
                        urlId: addTextToLanguageAndReturnId(newPost, 'url')
                    });
                }
            }


            DatabaseController.saveJSONToFile(languages, 'languages');
            DatabaseController.saveJSONToFile(endPosts, 'posts');
        }

        /**
         * @param {object} post
         * @param {string} which Content, title or url
         * @return {number}
         */
        function addTextToLanguageAndReturnId(post, which)
        {
            const existLanguage = languages.find(
                (lang) => lang.en == post[which].en && lang.hu && post[which].hu
            );

            if (existLanguage)
            {
                return existLanguage.id;
            }
            else
            {
                const id = languages.length + 1;

                languages.push({
                    id: id,
                    hu: post[which].hu,
                    en: post[which].en
                });


                return Number(id);
            }
        }

        /**
         * @param postSection
         * @param {Function} onePostInfoCallback
         * @param {Function} allPostInfosCallback
         * @returns {{content: {}, title: {}, short: {}, url: {}}}
         */
        function getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(postSection, onePostInfoCallback, allPostInfosCallback)
        {
            let result = {
                    // labels: {},
                    content: {},
                    title: {},
                    short: {},
                    url: {}
                },
                getData = that.getDataFromPElement;


            for(let child of postSection.childNodes)
            {
                const className = child.className;
                if (className && child.nodeName !== 'BUTTON')
                {
                    let data = getData(child);

                    // let classNamePieces = className.split('-');
                    // switch (classNamePieces.length)
                    // {
                    //     case 1:
                    //         result[classNamePieces[0]] = data;
                    //         break;
                    //     case 2:
                    //         if (!result[classNamePieces[0]])
                    //         {
                    //             result[classNamePieces[0]] = {};
                    //         }
                    //         result[classNamePieces[0]][classNamePieces[1]] = data;
                    //         break;
                    //     default:
                    //         break;
                    // }

                    that.helpers.stringSplitAndCreateObject(className, '-', result, data);

                    if (typeof onePostInfoCallback === 'function')
                    {
                        onePostInfoCallback({elem: className, node: child, data: data})
                    }
                }
            }

            if (typeof allPostInfosCallback === 'function')
            {
                return allPostInfosCallback(result);
            }
        }

        function addAllDeleteEvent()
        {
            require('../src/helpers').addEventToAllElement('.post .delete', 'click', (attr) =>
            {
                let section = attr.section,
                    button = attr.button;

                searchPosts(
                    currentPosts,
                    newPosts,
                    section,
                    (postArray, index) =>
                    {
                        postArray.splice(index, 1);
                    }
                );

                section.parentNode.removeChild(section);
            });
        }

        function addAllUpdateEvent()
        {
            that.helpers.addEventToAllElement('.post .update', 'click', (attr) =>
            {
                let section = attr.section,
                    button = attr.button;

                if (button.dataset.clicked == '0')
                {
                    // let changeTheDom = function changeTheDom()
                    // {
                    //
                    // }

                    button.dataset.clicked = '1';
                    button.innerHTML = 'Save';

                    getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, (args) =>
                    {
                        let elem = args.elem,
                            node = args.node,
                            data = args.data;

                        node.dataset.oldValue = data;

                        let child = node.childNodes[1];

                        switch (elem)
                        {
                            case 'content-hu':
                            case 'content-en':
                                child.innerHTML = `<textarea>${data}</textarea>`;
                                break;
                            case 'label-hu':
                                let html = '<select multiple>';
                                for (let label of currentLabels)
                                {
                                    html +=
                                        `<option value="${label.id}" ${(label.content.hu == data) ? "selected" : ""}>
                                            ${label.content.hu} / ${label.content.en}
                                        </option>`;
                                }
                                child.innerHTML = html + '</select>';
                                break;
                            case 'label-en':
                                child.innerHTML = ' ';
                                break;
                            default:
                                child.innerHTML = `<input type="text" value="${data}">`;
                                break;
                        }
                    });
                }
                else
                {
                    //i pass the oldPostDatas variable to searchPost function, it's the reason of mistake

                    let oldPostDatas = {},
                        labelsHu = [],
                        labelsEn = [];

                    const changeBackTheDom = function changeBackTheDom(args)
                    {
                        button.dataset.clicked = '0';
                        button.innerHTML = 'Update';

                        let elem = args.elem,
                            node = args.node,
                            data = args.data;

                        oldPostDatas[elem] = node.dataset.oldValue;
                        delete node.dataset.oldValue;

                        switch (elem)
                        {
                            case 'label-hu':
                                for (let index in data)
                                {
                                    let foundLabel = currentLabels.find(label => label.id == data[index]);

                                    labelsHu.push(foundLabel.content.hu);
                                    labelsEn.push(foundLabel.content.en);
                                }
                                node.childNodes[1].childNodes[0].remove();
                                node.childNodes[1].innerHTML = labelsHu.join(', ');
                                break;
                            case 'label-en':
                                node.childNodes[1].innerHTML = labelsEn.join(', ');
                                break;
                            default:
                                node.childNodes[1].innerHTML = data;
                                break;
                        }

                    };
                    const callSearchFunction = function callSearchFunction()
                    {
                        searchPosts(
                            currentPosts,
                            newPosts,
                            oldPostDatas,
                            (postArray, index/*, isCurrent*/) =>
                            {
								console.log(postArray); 
                                if (postArray) //false :( TODO
                                {
                                    postArray[index].id = postInfos.id;
                                    postArray[index].created = postInfos.created;
                                    postArray[index].title.hu = postInfos['title-hu'];
                                    postArray[index].title.en = postInfos['title-en'];
                                    postArray[index].content.hu = postInfos['content-hu'];
                                    postArray[index].content.en = postInfos['content-en'];
                                    postArray[index].short.en = postInfos['short-en'];
                                    postArray[index].short.en = postInfos['short-en'];
                                    postArray[index].url.hu = postInfos['url-hu'];
                                    postArray[index].url.en = postInfos['url-en'];
                                }
                            }
                        );
                    };

                    return getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, changeBackTheDom, callSearchFunction);
                }
            });
        }

        /**
         * @param {*[]} currents
         * @param news
         * @param datas
         * @param callback
         * @returns {*}
         */
        function searchPosts(currents, news, datas, callback)
        {
            let searching = function searching(datas)
            {
                let arrayIndex = -1;

                arrayIndex = that.searchIndex(currents,
                    (value) =>
                        value.id == datas.id
                        && datas.content
                        && String(value.content.hu) == datas.content.hu
                        && String(value.content.en) == datas.content.en
                );

                if (arrayIndex > -1)
                {
                    return callback(currents, arrayIndex, true);
                }


                arrayIndex = that.searchIndex(news, //post
                    (value) =>
                        String(value.content.hu) == datas['content-hu']
                        && String(value.content.en) == datas['content-en']
                );

                if (arrayIndex > -1)
                {
                    return callback(news, arrayIndex, false);
                }


                return callback(false, false, false);
            };

            // let infos = (require('../src/helpers').isHtmlElement(datas))
            //     ? getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(datas) : datas;

            if (that.helpers.isHtmlElement(datas))
            {
                console.log(datas);
                return getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(datas, null, searching);
            }

            return searching(datas);
        }

    }

    /**
     * @param {HTMLElement} p
     * @return {string|string[]}
     */
    getDataFromPElement (p)
    {
        const varTag = p.childNodes[1],
            child = varTag.childNodes[0];

        if (child.nodeName === '#text')
        {
            return varTag.innerHTML;
        }
        else
        {
            return require('../src/helpers').getElementValue(child);
        }   
     }


    /**
	 * @param {*[]} array
	 * @param {function} callback
	 * @return {number}
	 */
    searchIndex (array, callback)
    {
		return array.indexOf(array.find(
			(elem) => callback(elem)
		));
	}
}
