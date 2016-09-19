import {DatabaseController} from '../src/imports';

export default class PostModel
{
    constructor(attributes = {}, callback)
    {
        this.id = attributes.id || null;
        this.created = attributes.created || null;
        this.label_ids = attributes.label_ids || null;
        this.lang_id = attributes.lang_id || null;

        const dc = new DatabaseController();

        this.selectLabels(() =>
        {
            this.selectLanguages(callback, dc)
        }, dc);


        /*end of labels' select*/
    }

    selectLabels (callback, dc = new DatabaseController())
    {
        if (this.label_ids)
        {
            this.labels = [];
            const count_of_labels = this.label_ids.length,
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
                            opt1: this.label_ids[i],
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
        }
    }

    selectLanguages (callback, dc = new DatabaseController())
    {
        if (this.lang_id)
        {
            const that = this;

            dc.select('languages', (result) =>
            {
                that.language = result[0];

                if (typeof callback == 'function')
                {
                    return callback();
                }
            }, {
                where: [
                    {
                        operator: '=',
                        opt1: this.lang_id,
                        opt1Avail: true,
                        opt2: 'id'
                    }
                ]
            });
        }
        else
        {
            this.language = null
        }
    }
}