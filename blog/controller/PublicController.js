import {DatabaseController} from '../src/imports';

export default class PublicController
{
    constructor(language = 'en')
    {
        this.contentElement = '#wrapper';
        this.language = language || 'hu';

        const that = this,
            dc = new DatabaseController();

        dc.select('posts', (result) =>
        {
            that.posts = result;
        }, {}, () =>
        {
            return that.postPreviews();
        });

        // this.iWillGo();
    }

    /**
     * @param {number} from
     * @param {number} to
     * @param {function} callback
     */
    postPreviews(from = 0, to = this.posts.length)
    {
        var html = '';

        for (let i = from; i < to; i++)
        {
            const post = this.posts[i];
            let content = this.getOneFromLanguages(post, 'content'),
                title = this.getOneFromLanguages(post, 'title'),
                url = this.getOneFromLanguages(post, 'url');


            html +=
                `<section class="post-preview">
                    <div class="blog-header">
                        <h2 class="post-title">
                            <a id="post-${i+1}" class="post-link" href="#/${url}">${title}</a>
                        </h2>
                        <div class="post-datas">
                            <div class="created">${post.created}</div>
                        </div>
                    </div>
                    ${content}
                </section>`;
        }

        document.querySelector(this.contentElement).innerHTML = html;

        let reStart = require('./../src/helpers').start;

        for (let i = from; i < to; i++)
        {
            document.getElementById(`post-${i+1}`).addEventListener('click', reStart);
        }
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
            else
            {
                switch (this.language)
                {
                    case 'hu':
                        result = post[data]['en'];
                        break;
                    case 'en':
                    default:
                        result = post[data]['hu'];
                        break;
                }
            }
        }

        return (!result) ? '' : result;
    }

    iWillGo()
    {
        const dc = new DatabaseController();
        const that = this;

        dc.select('posts', (result) =>
        {
            that.result = result;
            console.log(result);
        }, {
            where: [
                {
                    operator: '=',
                    opt1: 'id',
                    opt2: 2,
                    opt2Avail: true
                }
            ]
        }, () =>
        {
            document.querySelector(this.contentElement).innerHTML
                = this.result[0].content[this.content];
        });
    }
}