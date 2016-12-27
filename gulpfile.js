var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var jasmine = require('gulp-jasmine');
var sequence = require('run-sequence');
var babel = require('gulp-babel');


function compileES5() {
	return gulp.src('src/stappo.js')
		.pipe(babel({
			presets: ['es2015']
		}))
}

gulp.task('build:es5', function () {
	compileES5()
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

gulp.task('build:bundle', function () {
	compileES5()
		.pipe(browserify({
			standalone: "stappo"
		}))

		.pipe(uglify({
			output: {
				ascii_only: true
			}
		}))
		.pipe(rename(function (path) {
			path.basename += ".bundle.min";
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('run:test', function () {
	gulp.src('spec/*-spec.js').pipe(jasmine({verbose: true}));
});

gulp.task('test', function (cb) {
	sequence('build:es5', 'run:test', cb);
});

gulp.task('build', function (cb) {
	sequence('build:es5','build:bundle', cb);
});

gulp.task('default', function (cb) {
	sequence(['build'], 'run:test', cb);
});
