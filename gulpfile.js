var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		coffee = require('gulp-coffee'),
		autoprefixer = require('gulp-autoprefixer');

var paths = {
	views: ['./wordsoutinjs/**/*.pug', '*.pug'],
	styles: ['./wordsoutinjs/*.sass'],
	scripts: ['./wordsoutinjs/*.coffee']
};

var basePath = './',
		base = {base: basePath};



gulp.task('pug', function build_html () {
	return gulp.src(paths.views, base)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(basePath));
});

gulp.task('sass', function build_sass () {
	return gulp.src(paths.styles, base)
		.pipe(sass({indentedSyntax: true/*, outputStyle: 'compressed'*/}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(basePath));
});

gulp.task('coffee', function build_coffee () {
	return gulp.src(paths.scripts, base)
		.pipe(coffee({bare: true})/*.on('error', gutil.log)*/)
		.pipe(gulp.dest(basePath));
});


gulp.task('watch', function () {
	gulp.watch(paths.views, ['pug']);
	gulp.watch(paths.styles, ['sass']);
	gulp.watch(paths.scripts, ['coffee']);
});

gulp.task('default', ['watch', 'pug', 'sass', 'coffee']);