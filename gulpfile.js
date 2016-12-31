var path = require('path');
var fs = require('fs');
var request = require('request');
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
var post = require("gulp-post");

var StappoImpl = "./src/stappo.impl.js"; // generic (server/web) implementation
var StappoWebImpl = "./src/stappo.web.impl.js"; // web-only implementation

function renderTemplate(impl, targetFile){
	var stappoImpl = fs.readFileSync(impl, "utf8");
	return gulp.src([targetFile])
		.pipe(replace('/*__stappo_impl__*/', stappoImpl));
}

function compile(srcFile, destFile){
	var stappoImpl = fs.readFileSync(srcFile, "utf8");

	var form = {form: {
		js_code: stappoImpl,
		output_format: 'text',
		output_info:'compiled_code'
	}};

	return  request.post("http://closure-compiler.appspot.com/compile", form)
		.pipe(fs.createWriteStream(destFile))

}

gulp.task("compile:web",function(){
	return compile(StappoWebImpl, './dist/stappo.web.min.js');
});

gulp.task("compile:generic",function(){
	return compile(StappoImpl, './dist/stappo.min.js');
});

gulp.task('compile:bundle', function () {
	return renderTemplate(StappoImpl, './src/stappo.module.template')
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
			path.basename = path.basename.replace('module','bundle');
		}))
		.pipe(gulp.dest('./dist'))
});


gulp.task('compile:web.bundle', function () {
	return renderTemplate(StappoWebImpl, './src/stappo.module.template')
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
			path.basename = path.basename.replace('module','web.bundle');
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('run:test', function () {
	return gulp.src('spec/*-spec.js').pipe(jasmine({verbose: true}));
});

gulp.task('test', function (cb) {
	sequence('compile:bundle', 'run:test', cb);
});

gulp.task('build', function (cb) {
	sequence('compile:web.bundle','compile:bundle', 'compile:generic', 'compile:web', cb);
});


gulp.task('default', function (cb) {
	sequence(['build'], 'run:test', cb);
});
