var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var jasmine = require('gulp-jasmine');
var sequence = require('run-sequence');
var babel = require('gulp-babel');


function compile() {
	return gulp.src('src/stappo.js')
		.pipe(babel({
			presets: ['es2015']
		}))
/*		.pipe(browserify({
			standalone: "stappo"
		}))
		*/
}

gulp.task('build', function () {
	compile().pipe(gulp.dest('./dist'))
});

gulp.task('build:uglify', function () {
	compile()
	.pipe(uglify({
		output: {
			ascii_only: true
		}
	}))
	.pipe(rename(function (path) {
		path.basename += ".min";
	}))
	.pipe(gulp.dest('./dist'))
});

gulp.task('build:test', function () {
	gulp.src('spec/*-spec.js')
		.pipe(preprocess({context: {DIST: true}}))
		.pipe(jasmine({verbose: true}));
});

gulp.task('default', function (cb) {
	sequence('build', 'build:uglify', 'build:test', cb);
});
