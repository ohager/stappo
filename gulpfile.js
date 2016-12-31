var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var jasmine = require('gulp-jasmine');
var sequence = require('run-sequence');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var replace = require('gulp-replace');
const compiler = require('google-closure-compiler-js').gulp();

var StappoImpl = "./src/stappo.impl.js"; // generic (server/web) implementation
var StappoWebImpl = "./src/stappo.web.impl.js"; // web-only implementation

function renderTemplate(targetFile){
	var stappoImpl = fs.readFileSync(StappoImpl, "utf8");
	var outFile = path.basename(targetFile).replace('.temp','');
	return gulp.src([targetFile])
		.pipe(replace('/*__stappo_impl__*/', stappoImpl));
}

gulp.task('compile', function() {
	return gulp.src(StappoWebImpl, {base: './'})
	// your other steps here
		.pipe(compiler({
			compilationLevel: 'SIMPLE',
			warningLevel: 'VERBOSE',
			outputWrapper: '(function(){\n%output%\n}).call(this)',
			jsOutputFile: 'stappo.web.min.js'  // outputs single file
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build:lib', function () {
	return gulp.src(StappoImpl)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify({
			output: {
				ascii_only: true
			}
		}))
		.pipe(rename(function (path) {
			path.basename = path.basename.replace("impl","min");
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('build:web', function () {
	return gulp.src(StappoWebImpl)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify({
			output: {
				ascii_only: true
			}
		}))
		.pipe(rename(function (path) {
			path.basename = path.basename.replace("impl","min");
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('build:bundle', function () {
	return renderTemplate('./src/stappo.module.template')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(browserify({
			standalone: "stappo"
		}))
		.pipe(uglify({
			output: {
				ascii_only: true
			}
		}))
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('module.template','bundle');
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('run:test', function () {
	return gulp.src('spec/*-spec.js').pipe(jasmine({verbose: true}));
});

gulp.task('test', function (cb) {
	sequence('build:bundle', 'run:test', cb);
});

gulp.task('build', function (cb) {
	sequence('build:bundle', 'build:lib', 'build:web', cb);
});


gulp.task('default', function (cb) {
	sequence(['build'], 'run:test', cb);
});
