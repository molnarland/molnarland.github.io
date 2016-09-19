import {DatabaseController} from '../src/imports';

export default class LabelModel
{
    constructor (attributes = {})
    {
        this.id = attributes.id || null;
        this.lang_id = attributes.lang_id || null;

        const dc = new DatabaseController();

        if (this.lang_id)
        {
            let that = this;
            dc.select('languages', (result) =>
            {
                that.language = result[0];
            }, {
                where: [
                    {
                        operator: "=",
                        opt1: this.lang_id,
                        opt1Avail: true,
                        opt2: 'id'
                    }
                ]
            });
        }
        else
        {
            this.language = null;
        }
    }
}