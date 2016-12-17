var gulp = require('gulp'),
	pug2 = require('gulp-pug2'),
	sass = require('gulp-sass'),
	coffee = require('gulp-coffee'),
	autoprefixer = require('gulp-autoprefixer'),
	webpack = require('gulp-webpack'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync').create();

var paths = {
	views: [
		'./wordsoutinjs/**/*.pug',
		'index.pug',
		'./blog/index.pug',
		'./blog/admin/*.pug',
		'./json2html/*.pug'
	],
	styles: ['./wordsoutinjs/*.sass', './style/*.sass', './blog/style/*.sass'],
	coffee: ['./wordsoutinjs/*.coffee'],
	blogJs: ['./blog/src/*.js', './blog/model/*.js', './blog/controller/*.js'],
	landingJs: ['script/es6/*.js'],
	json2HtmlJs: ['json2html/es6/*.js', './blog/controller/DatabaseController.js']
};

var basePath = './',
	base = {base: basePath};

function reloadBrowser(done)
{
	browserSync.reload();
	done();
}


gulp.task('pug', function build_html (done) {
	gulp.src(paths.views, base)
		.pipe(pug2({
			pretty: true,
			cache: false
		}))
		.pipe(gulp.dest(basePath));

	reloadBrowser(done);
});

gulp.task('sass', function build_sass (done) {
	gulp.src(paths.styles, base)
		.pipe(sass({indentedSyntax: true/*, outputStyle: 'compressed'*/}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(basePath));

	reloadBrowser(done);
});

gulp.task('coffee', function build_coffee (done) {
	gulp.src(paths.coffee, base)
		.pipe(coffee({bare: true})/*.on('error', gutil.log)*/)
		.pipe(gulp.dest(basePath));

	reloadBrowser(done);
});

gulp.task('blog-js', function (done) {
	gulp.src(paths.blogJs)
		.pipe(webpack(require('./blog.webpack.config.js')))
		.pipe(gulp.dest('blog/dist/'));

	reloadBrowser(done);
});

gulp.task('landing-js', function (done) {
	gulp.src(paths.landingJs)
		.pipe(babel()).on('error', console.error.bind(console))
		.pipe(gulp.dest('script'));

	reloadBrowser(done);
});

gulp.task('j2h-js', function (done) {
	gulp.src(paths.json2HtmlJs)
		.pipe(webpack(require('./json2html.webpack.config')))
		.pipe(gulp.dest('json2html'));

	reloadBrowser(done);
});


gulp.task('server', ['pug', 'sass', 'coffee', 'blog-js', 'landing-js', 'j2h-js'], function () {
	browserSync.init(['index.html'], {
		server: './',
		open: false
	});
});

function watch () {
	gulp.watch(paths.views, ['pug']);
	gulp.watch(paths.styles, ['sass']);
	gulp.watch(paths.coffee, ['coffee']);
	gulp.watch(paths.blogJs, ['blog-js']);
	gulp.watch(paths.landingJs, ['landing-js']);
	gulp.watch(paths.json2HtmlJs, ['j2h-js']);
}

gulp.task('watch', watch());

gulp.task('default', ['server']);
