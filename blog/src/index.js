import {LanguageModel, DatabaseController} from './imports';

var bla = new DatabaseController();
bla.select('labels', function (result)
{
    console.log(result);
});



