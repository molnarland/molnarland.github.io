import {DatabaseController} from '../src/imports';

export default class AdminController
{
    constructor (args)
    {
        this.contentElement = '#wrapper';
        this.dc = new DatabaseController();

        const fileName = args.file || '';

        switch (fileName)
        {
            case 'labels.html':
                this.labels();
                break;
            case 'posts.html':
                this.posts();
                break;
            default:
                break;
        }
    }

    labels ()
    {
        let languages = [],
            newLabels = [],
            currentLabels = [];


        this.dc.select('languages', (result) =>
        {
            languages = result;


            this.dc.select('labels', (result) =>
            {
                currentLabels = result;
            }, {}, () =>
            {
                const that = this;

                listingLabels();

                document.getElementById('new-label').addEventListener('click', newLabelClick);

                document.getElementById('save-change').addEventListener('click', saveChangeClick);


                function listingLabels()
                {
                    let html = '';

                    for(let currentLabel of currentLabels)
                    {
                        console.log(currentLabel);

                        html +=
                            `<section class="label" style="border:5px dotted black">
                                <p class="id">ID: ${currentLabel.id}</p>
                                <p class="hu">Hungarian: ${currentLabel.content.hu}</p>
                                <p class="en">English: ${currentLabel.content.en}</p>
                            </section>`;
                    }

                    document.querySelector(that.contentElement).innerHTML = html;
                }

                function newLabelClick()
                {
                    newLabels.push({
                        en: document.getElementById('en-name').value,
                        hu: document.getElementById('hu-name').value
                    });

                    document.getElementById('en-name').value = '';
                    document.getElementById('hu-name').value = '';
                }

                function saveChangeClick()
                {
                    for(let newLabel of newLabels)
                    {
                        const existLabel = currentLabels.find(
                            (label) => label.content.en == newLabel.en && label.content.hu == newLabel.hu
                        );


                        if (!existLabel)
                        {
                            
                        }
                    }
                }
            });
        });


    }

    posts ()
    {

    }
}