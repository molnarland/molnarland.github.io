import {DatabaseController} from '../src/imports';

export default class PublicController
{
    constructor()
    {
        this.bodyId = document.body.id = 'public';

        const that = this,
            dc = new DatabaseController();

        dc.select('posts', (result) =>
        {
            that.posts = result;
        }, {}, () =>
        {
            return that.postPreviews();
        });
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
                        ${post.language.hu}
                    </section>`;
        }

        document.getElementById(this.bodyId).innerHTML = html;
    }
}