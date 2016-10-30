import {DatabaseController} from '../src/imports';

export default class LabelModel
{
    constructor (attributes = {}, callback)
    {
        this.id = attributes.id || null;
        this.contentId = attributes.contentId || null;

        const dc = new DatabaseController();

        if (this.contentId)
        {
            let that = this;
            dc.select('languages', (result) =>
            {
                that.content = result[0];

                if (typeof callback == 'function')
                {
                    return callback();
                }
            }, {
                where: [
                    {
                        operator: '=',
                        opt1: this.contentId,
                        opt1Avail: true,
                        opt2: 'id'
                    }
                ]
            });
        }
        else
        {
            this.content = null;

            if (typeof callback == 'function')
            {
                return callback();
            }
        }
    }
}