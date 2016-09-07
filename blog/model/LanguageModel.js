export default class LanguageModel
{
    /**
     * @param {{id: number, hu: string, en: string}} attributes
     */
    constructor(attributes)
    {
        require('../src/helpers').checkSomeTypes(
            ['object', 'number', 'string', 'string'],
            [attributes, attributes.id, attributes.hu, attributes.en]
        );

        this.id = attributes.id || null;
        this.hu = attributes.hu || null;
        this.en = attributes.en || null;
    }
}