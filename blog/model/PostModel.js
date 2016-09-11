import {DatabaseController} from '../src/imports';

export default class PostModel
{
    constructor(attributes = {})
    {
        this.id = attributes.id || null;
        this.created = attributes.created || null;
        this.label_ids = attributes.label_ids || null;
        this.lang_id = attributes.lang_id || null;

        const dc = new DatabaseController(),
            that = this;

        if (this.label_ids)
        {
            this.labels = [];

            for (let label_id of this.label_ids)
            {
                dc.select('labels', function (result)
                {
                    that.labels.push(result[0]);
                }, {
                    where: [
                        {
                            operator: '=',
                            opt1: label_id,
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

        if (this.lang_id)
        {
            dc.select('languages', function (result)
            {
                that.language = result[0];
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