import {DatabaseController} from '../src/imports';

export default class PostModel
{
    constructor(attributes = {}, callback)
    {
        this.id = attributes.id || null;
        this.created = attributes.created || null;
        this.labelIds = attributes.labelIds || null;
        this.titleId = attributes.titleId || null;
        this.contentId = attributes.contentId || null;
        this.urlId = attributes.urlId || null;

        const dc = new DatabaseController();


        this.selectLabels(() =>
        {
            this.selectOne('contentId', 'content', () =>
            {
                this.selectOne('titleId', 'title', () =>
                {
                    this.selectOne('urlId', 'url', callback, dc);
                }, dc);
            }, dc)
        }, dc);
    }



    selectLabels (callback, dc = new DatabaseController())
    {
        if (this.labelIds)
        {
            this.labels = [];
            const count_of_labels = this.labelIds.length,
                that = this;

            for (let i = 0; i < count_of_labels; i++)
            {
                dc.select('labels', (result) =>
                {
                    that.labels.push(result[0]);

                    if (typeof callback == 'function' && i === count_of_labels-1)
                    {
                        return callback();
                    }

                }, {
                    where: [
                        {
                            operator: '=',
                            opt1: this.labelIds[i],
                            opt1Avail: true,
                            opt2: 'id'
                        }
                    ]
                });
            }
        }
        else
        {
            this.labels = null;

            if (typeof callback == 'function')
            {
                return callback();
            }
        }
    }


    selectOne (id, real, callback, dc = new DatabaseController())
    {
        if (this[id])
        {
            const that = this;

            dc.select('languages', (result) =>
            {
                that[real] = result[0];

                if (typeof callback == 'function')
                {
                    return callback();
                }
            }, {
                where: [
                    {
                        operator: '=',
                        opt1: this[id],
                        opt1Avail: true,
                        opt2: 'id'
                    }
                ]
            });
        }
        else
        {
            this[real] = null;

            if (typeof callback == 'function')
            {
                return callback();
            }
        }
    }
}