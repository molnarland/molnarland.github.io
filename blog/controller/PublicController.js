import {DatabaseController} from '../src/imports';
import JsonToHtml from '../../json2html/es6/JsonToHtml';

export default class PublicController
{
    constructor(language = 'en')
    {
        this.whenUrlRefreshContentRefreshToo();

        this.contentElement = '#wrapper';
        this.language = language || 'hu';
        this.helpers = require('../src/helpers');
        this.reStart = this.helpers.start;

        this.clearContent();

        const that = this,
            dc = new DatabaseController();

        setTimeout(() =>
        {
            let hashes = this.helpers.getUrlHash();
            if (hashes.length > 0)
            {
                try
                {
                    dc.select('languages', (languageResults) =>
                    {
                        if (languageResults.length > 0)
                        {
                            dc.select('posts', (postResults) =>
                            {
                                that.post = postResults[0];
                            }, {
                                where: [{
                                    operator: '=',
                                    opt1: languageResults[0].id,
                                    opt1Avail: true,
                                    opt2: 'urlId'
                                }]
                            }, () =>
                            {
                                new JsonToHtml(that.post['content'][this.language])
                                    .printOut(document.querySelector(this.contentElement));
                            });
                        }
                        else
                        {
                            listAllPreviews();
                        }
                    }, {
                        where: [{
                            operator: '=',
                            opt1: hashes.join('/'),
                            opt1Avail: true,
                            opt2: this.language
                        }]
                    });
                }
                catch (e)
                {
                    console.log(e);
                    listAllPreviews();
                }
            }
            else
            {
                listAllPreviews();
            }
        }, 10);


        function listAllPreviews()
        {
            dc.select('posts', (result) =>
            {
                that.posts = result;
                return that.postPreviews();
            }, {}, () =>
            {
                return that.posts && that.postPreviews();
            });
        }
    }

    /**
     * @param {number} [from]
     * @param {number} [to]
     */
    postPreviews(from = 0, to = this.posts.length)
    {
        let html = '';

        for (let i = from;  i < to; i++) {
            const post = this.posts[i];
            let short = this.getOneFromLanguages(post, 'short'),
                title = this.getOneFromLanguages(post, 'title'),
                url = this.getOneFromLanguages(post, 'url');

            url = (url.split('.')[1] === 'html') ? url : `#/${url}`;

            html +=
                `<section class="post-preview">
                    <div class="blog-header">
                        <h2 class="post-title">
                            <a id="post-${i + 1}" class="post-link" href="${url}">${title}</a>
                        </h2>
                        <div class="post-datas">
                            <div class="created">${post.created}</div>
                        </div>
                    </div>
                    <div class="short">${short}</div>
                </section>`;
        }

        document.querySelector(this.contentElement).innerHTML = html;

        this.helpers.addEventToAllElement('.post-link', 'click', this.reStart);
    }


    clearContent ()
    {
        document.querySelector(this.contentElement).innerHTML = '';
    }

    whenUrlRefreshContentRefreshToo ()
    {
        window.addEventListener('popstate', () =>
        {
            this.reStart();
        });
    }

    getOneFromLanguages(post, data)
    {
        let result;

        if (post[data])
        {
            if (post[data][this.language])
            {
                result = post[data][this.language];
            }
            /*else {
                switch (this.language) {
                    case 'hu':
                        result = post[data]['en'];
                        break;
                    case 'en':
                        result = post[data]['hu'];
                        break;
                }
            }*/
        }

        return (!result) ? '' : result;
    }

    iWillGo()
    {
        const dc = new DatabaseController();
        const that = this;

        dc.select('posts', (result) => {
            that.result = result;
            // console.log(result);
        }, {
            where: [
                {
                    operator: '=',
                    opt1: 'id',
                    opt2: 2,
                    opt2Avail: true
                }
            ]
        }, () => {
            document.querySelector(this.contentElement).innerHTML
                = this.result[0].content[this.content];
        });
    }
}