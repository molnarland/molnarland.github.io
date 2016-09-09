export default class LanguageModel
{
    /**
     * @param {{id: number, hu: string, en: string}} attributes
     */
    constructor(attributes = {})
    {
        this.id = attributes.id || null;
        this.hu = attributes.hu || null;
        this.en = attributes.en || null;
    }
}