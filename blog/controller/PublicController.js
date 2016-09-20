import {DatabaseController} from '../src/imports';

export default class PublicController
{
    constructor(language = 'en')
    {
        this.bodyId = document.body.id = 'public';
        this.language = language || 'hu';

        const that = this,
            dc = new DatabaseController();

        /*dc.select('posts', (result) =>
        {
            that.posts = result;
        }, {}, () =>
        {
            return that.postPreviews();
        });*/

        this.iWillGo();
    }

    /**
     * @param {number} from
     * @param {number} to
     */
    postPreviews(from = 0, to = this.posts.length)
    {
        var html = '';

        for (let i = from; i < to; i++)
        {
            const post = this.posts[i];

            html += `<section class="post-preview">
                        <div class="blog-header">
                            <h2 class="post-title"></h2>
                            <div class="post-datas">
                                <div class="created">${post.created}</div>
                            </div>
                        </div>
                        ${post.language[this.language]}
                    </section>`;
        }

        document.getElementById(this.bodyId).innerHTML = html;
    }

    iWillGo()
    {
        const dc = new DatabaseController();
        this.result;
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
            document.getElementById(this.bodyId).innerHTML
                = this.result[0].language[this.language];
        });
    }
}