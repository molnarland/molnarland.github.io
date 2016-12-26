//run with: $ babel-node CreateHtmlFromJson.js

require("babel-core").transform("code", {
    presets: ["es2017", "es2016", "es2015"]
});

import {DatabaseController} from '../src/imports';
import FileSystem from 'fs';
import JSONToHTML from '../../json2html/es6/JsonToHtml';
const HTMLMinify = require('html-minifier').minify;

let languages = [];

deleteAllHTML(() =>
{
    loopForPosts((post) =>
    {
        let fileNames = getAllFileName(post);

        createAllHTML(post, fileNames);
        changeAllUrlInJSON(post, fileNames);

        creatingNewLanguagesObject(post);
    }, () =>
    {
        FileSystem.writeFileSync('../json/languages.json', JSON.stringify({languages: languages}));
    });
});


function loopForPosts(callback, end)
{
    const dc = new DatabaseController();
    dc.select('posts', (posts) =>
    {
        for (let post of posts)
        {
            callback(post, dc);
        }

        end();
    });
}

function deleteHTMLFiles(language, callback)
{
    const directory = `../posts/${language}`;
    let files = FileSystem.readdirSync(directory);

    for (let file of files)
    {
        const filePath = `${directory}/${file}`;
        if (FileSystem.existsSync(filePath))
        {
            FileSystem.unlinkSync(filePath);
        }
    }

    if (typeof callback === 'function')
    {
        callback();
    }
}

function deleteAllHTML(callback)
{
    deleteHTMLFiles('en', () =>
    {
        deleteHTMLFiles('hu', callback);
    });
}

function createHTMLFile(post, language, filename)
{
    const html = new JSONToHTML(post.content[language]).getHtml();
    FileSystem.writeFileSync(
        `../posts/${language}/${filename}.html`,
        HTMLMinify(html, {
            collapseWhitespace: true,
            removeComments: true
        })
    );
}

function createAllHTML(post, fileNames)
{
    createHTMLFile(post, 'hu', fileNames.hu);
    createHTMLFile(post, 'en', fileNames.en);
}

function getFileName(post, language)
{
    let titleOfPost = String(post.title[language]),
        titleOfHTMLFile = '';

    for (let char of titleOfPost)
    {
        titleOfHTMLFile += getCharFromAnotherOne(char);
    }

    return titleOfHTMLFile;
}

function getAllFileName(post)
{
    return {
        hu: getFileName(post, 'hu'),
        en: getFileName(post, 'en')
    }
}

function changeUrlInJSON(post, language, filename)
{
    post.url[language] = `posts/${language}/${filename}.html`;
}

function changeAllUrlInJSON(post, fileNames)
{
    changeUrlInJSON(post, 'hu', fileNames.hu);
    changeUrlInJSON(post, 'en', fileNames.en)
}

function creatingNewLanguagesObject(post)
{
    languages.push(post.content);
    languages.push(post.title);
    languages.push(post.url);

    for (let label of post.labels)
    {
        languages.push(label.content);
    }
}

/**
 * @param {string} char
 * @return {string}
 */
function getCharFromAnotherOne(char)
{
    char = char.toLocaleLowerCase();

    switch (char)
    {
        case 'á':
            return 'a';
            break;
        case 'é':
            return 'e';
            break;
        case 'í':
            return 'i';
            break;
        case 'ó':
        case 'ö':
        case 'ő':
            return 'o';
            break;
        case 'ú':
        case 'ü':
        case 'ű':
            return 'u';
            break;
        case ' ':
            return '_';
            break;
        default:
            return char;
            break;
    }
}