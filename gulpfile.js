var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	coffee = require('gulp-coffee'),
	autoprefixer = require('gulp-autoprefixer'),
	webpack = require('gulp-webpack'),
	browserSync = require('browser-sync').create();

var paths = {
	views: ['./wordsoutinjs/**/*.pug', '*.pug'],
	styles: ['./wordsoutinjs/*.sass'],
	coffee: ['./wordsoutinjs/*.coffee'],
	feature_js: ['./blog/src/index.js']
};

var basePath = './',
		base = {base: basePath};


gulp.task('pug', function build_html (done) {
	gulp.src(paths.views, base)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(basePath));

	browserSync.reload();
	done();
});

gulp.task('sass', function build_sass (done) {
	gulp.src(paths.styles, base)
		.pipe(sass({indentedSyntax: true/*, outputStyle: 'compressed'*/}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(basePath));

	browserSync.reload();
	done();
});

gulp.task('coffee', function build_coffee (done) {
	gulp.src(paths.coffee, base)
		.pipe(coffee({bare: true})/*.on('error', gutil.log)*/)
		.pipe(gulp.dest(basePath));

	browserSync.reload();
	done();
});

gulp.task('webpack', function (done) {
	gulp.src(paths.feature_js)
		.pipe(webpack(require('./webpack.config')))
		.pipe(gulp.dest('blog/dist/'));

	browserSync.reload();
	done();
});

gulp.task('server', ['pug', 'sass', 'coffee', 'webpack'], function () {
	browserSync.init(['index.html'], {
		server: './'
	});

	watch();
});

function watch () {
	gulp.watch(paths.views, ['pug']);
	gulp.watch(paths.styles, ['sass']);
	gulp.watch(paths.coffee, ['coffee']);
	gulp.watch(paths.feature_js, ['webpack']);
}

gulp.task('watch', watch());

gulp.task('default', ['server']);