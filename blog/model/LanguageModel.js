export default class LanguageModel
{
    /**
     * @param {{id: number, hu: string, en: string}} attributes
     * @param {function} callback
     */
    constructor(attributes = {}, callback)
    {
        this.id = attributes.id || null;
        this.hu = attributes.hu || null;
        this.en = attributes.en || null;

        if (typeof callback === 'function')
        {
            callback();
        }
    }
}