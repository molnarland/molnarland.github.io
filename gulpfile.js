var gulp = require('gulp'),
	pug2 = require('gulp-pug2'),
	sass = require('gulp-sass'),
	coffee = require('gulp-coffee'),
	autoprefixer = require('gulp-autoprefixer'),
	webpack = require('gulp-webpack'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync').create(),
	notify = require('gulp-notify');

var paths = {
	pug: [
		'./wordsoutinjs/**/*.pug',
		'index.pug',
		'./blog/index.pug',
		'./blog/admin/*.pug',
		'./json2html/*.pug'
	],
	sass: ['./wordsoutinjs/*.sass', './style/*.sass', './blog/style/*.sass'],
	coffee: ['./wordsoutinjs/*.coffee'],
	blogJs: ['./blog/src/*.js', './blog/model/*.js', './blog/controller/*.js'],
	landingJs: ['script/es6/*.js'],
	json2HtmlJs: ['json2html/es6/*.js']
};

var basePath = './',
	base = {base: basePath};

var notifyObject = {
	'title': '',
	'subtitle': '',
	'message': '',
	'onLast': true
};


gulp.task('pug', function (done) {
	gulp.src(paths.pug, base)
		.pipe(pug2({
			pretty: true,
			cache: false
		}))
		.pipe(gulp.dest(basePath))
		.pipe(notify({
			'title': 'Pug',
			'message': 'Compiled',
			'onLast': true
		}));

	reloadBrowser(done);
});

gulp.task('sass', function (done) {
	gulp.src(paths.sass, base)
		.pipe(sass({indentedSyntax: true/*, outputStyle: 'compressed'*/}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(basePath))
        .pipe(notify({
            'title': 'Sass',
            'message': 'Compiled',
            'onLast': true
        }));

	reloadBrowser(done);
});

gulp.task('coffee', function (done) {
	gulp.src(paths.coffee, base)
		.pipe(coffee({bare: true})/*.on('error', gutil.log)*/)
		.pipe(gulp.dest(basePath))
        .pipe(notify({
            'title': 'CoffeeScripts',
            'message': 'Compiled',
            'onLast': true
        }));

	reloadBrowser(done);
});

gulp.task('blogJs', function (done) {
	gulp.src(paths.blogJs)
		.pipe(webpack(require('./blog.webpack.config.js')))
		.pipe(gulp.dest('blog/dist/'))
		.pipe(notify({
			'title': 'BlogJS',
			'message': 'Compiled',
			'onLast': true
    }));

	reloadBrowser(done);
});

gulp.task('landingJs', function (done) {
	gulp.src(paths.landingJs)
		.pipe(babel()).on('error', console.error.bind(console))
		.pipe(gulp.dest('script'))
		.pipe(notify({
			'title': 'LandingJS',
			'message': 'Compiled',
			'onLast': true
    }));

	reloadBrowser(done);
});

gulp.task('json2html', function (done) {
	gulp.src(paths.json2HtmlJs)
		.pipe(webpack(require('./json2html.webpack.config')))
		.pipe(gulp.dest('json2html'))
		.pipe(notify({
			'title': 'Json to Html',
			'message': 'Compiled',
			'onLast': true
    }));

	reloadBrowser(done);
});


gulp.task('fullServer', ['pug', 'sass', 'coffee', 'blogJs', 'landingJs', 'json2html'], function () {
	watch();
	browserSyncInit();
});

function browserSyncInit(callback) {
    browserSync.init(['index.html'], {
        server: './',
        open: false
    }/*, function ()
	{

        notify({
            'title': 'Server ',
            'message': 'Compiled',
            'onLast': true
        });
	}*/);
}

function reloadBrowser(done)
{
    browserSync.reload();
    done();
}

function watch (tasks = ['pug', 'sass', 'coffee', 'blogJs', 'landingJs', 'json2html']) {
	for (var index = 0; index < tasks.length; index++)
	{
		var task = tasks[index];

        gulp.watch(paths[task], [task]);
	}
}

gulp.task('server', browserSyncInit);

gulp.task('default', ['fullServer']);
gulp.task('jws', ['pug', 'sass', 'json2html'], function () { //j2h watching + server
	watch(['pug', 'sass', 'json2html']);
    browserSyncInit();
});
gulp.task('lws', ['pug', 'sass', 'landingJs'], function () { //landing watching + server
	watch(['pug', 'sass', 'landingJs']);
    browserSyncInit();
});
gulp.task('bws', ['pug', 'sass', 'blogJs'], function () { //blog watching + server
	watch(['pug', 'sass', 'blogJs']);
    browserSyncInit();
});