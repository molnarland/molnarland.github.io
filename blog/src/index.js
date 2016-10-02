import {PublicController, AdminController} from './imports';

const parameters = require('./helpers').getUrlParameters();

if (parameters[0][0] === 'blog' && parameters[0][1] === 'admin')
{
    const ac = new AdminController();
}
else
{
    const pc = new PublicController();
}