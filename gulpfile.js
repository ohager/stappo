var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var jasmine = require('gulp-jasmine');
var sequence = require('run-sequence');
var babel = require('gulp-babel');


// make a task that prepares the pure stappo object to be exported in different manners
// 1. Separate the pure class in a single file without any specific export
// 2. Mount different export scenarios, and append pure class file content (use https://www.npmjs.com/package/gulp-replace)
// 3. Adjust the build targets

// --- that way, we provide a generic AMD/UMD/CommonJS/ES6 modularization stuff via browserify
// --- A server side thing, for node
// --- Classical pure client side lib to be loaded inserted via HTML

function compileES5() {
	return gulp.src('src/stappo.js')
		.pipe(babel({
			presets: ['es2015']
		}))
}

gulp.task('build:es5', function () {
	return compileES5()
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
	return compileES5()
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
	return gulp.src('spec/*-spec.js').pipe(jasmine({verbose: true}));
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
