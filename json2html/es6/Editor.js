import JsonToHtml from './JsonToHtml';

export default class Editor
{
    /**
     * @param {string} fileName
     * @param {string} idOfEditor
     * @param {string} idOfSaveButton
     * @param {string} idOfOutput
     */
    constructor ({fileName, idOfEditor = 'in', idOfSaveButton = 'save', idOfOutput = 'out'})
    {
        this.in = idOfEditor;
        this.out = idOfOutput;
        this.saveButton = idOfSaveButton;
        this.filename = fileName;

        this.editorInit();
        this.addJsonParseToHtmlOnEditorChange();
        this.addSaveOnButtonClick();
    }


    editorInit ()
    {
        this.editor = CodeMirror.fromTextArea(document.getElementById(this.in),
            {
                mode: "application/json",
                lineNumbers: true,
                autoCloseBrackets: true,
                showCursorWhenSelecting: true,
                lineWrapping: true,
                theme: 'monokai',
                matchBrackets: true,
                tabSize: 2,
                keyMap: 'sublime'
            });
    }

    addJsonParseToHtmlOnEditorChange ()
    {
        this.editor.on('change', function (cm)
        {
            new JsonToHtml(cm.getValue()).printOut(document.getElementById(this.out));

        }.bind(this));
    }

    addSaveOnButtonClick ()
    {
        if (this.saveButton !== false)
        {
            document.getElementById(this.saveButton).addEventListener('click', function (e)
            {
                let filename = this.fileName || prompt('What would you like for filename?');
                while (!filename)
                {
                    filename = prompt('Please type a filename!');
                }

                Editor.saveFile(this.getValueOfEditor(), filename);
            }.bind(this));
        }
    }

    getValueOfEditor ()
    {
        return this.editor.doc.cm.getValue();
    }

    /**
     * @param {string} value
     * @param {string} filename
     */
    static saveFile (value, filename)
    {
        require('../../libs/FileSaver').saveAs(
            new Blob([value], {type: 'application/json;charset=utf8'}),
            `${filename}.json`
        );
    }
}