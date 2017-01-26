var fs = require('fs');
var request = require('request');
var gulp = require('gulp');
var util = require('gulp-util');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');
var sequence = require('run-sequence');
var babel = require('gulp-babel');
var replace = require('gulp-replace');

var StappoImpl = "./src/stappo.impl.js"; // generic (server/web) implementation
var StappoWebImpl = "./src/stappo.web.impl.js"; // web-only implementation
var MergeImpl = "./src/merge.impl.js";

function renderTemplate(impl, targetFile, replaceToken){
	var code = fs.readFileSync(impl, "utf8");

	return gulp.src([targetFile])
			.pipe(replace(replaceToken, code));
}

function render(impl, targetFile, replaceToken){
	var code = fs.readFileSync(impl, "utf8");
	return gulp.src([targetFile])
		.pipe(replace(replaceToken, code));
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
	return renderTemplate(StappoImpl, './src/stappo.module.template', '/*__stappo_impl__*/')
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
	return renderTemplate(StappoWebImpl, './src/stappo.module.template', '/*__stappo_impl__*/')
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

gulp.task('build:merge', function(){
	return renderTemplate(MergeImpl,'./src/merge.module.template', '/*__merge_impl__*/')
		.pipe(rename('merge.js'))
		.pipe(gulp.dest('./build'))
});

gulp.task('build:stappo', function(){
	return renderTemplate(StappoImpl,'./src/stappo.module.template', '/*__stappo_impl__*/')
		.pipe(rename('stappo.js'))
		.pipe(gulp.dest('./build'))
});

gulp.task('build:stappo.web', function(){

	var stappoCode = fs.readFileSync(StappoWebImpl, "utf8");
	var mergeCode = fs.readFileSync(MergeImpl, "utf8");

	return gulp.src(['./src/stappo.web.template'])
		.pipe(replace('/*__stappo_impl__*/', stappoCode))
		.pipe(replace('/*__merge_impl__*/', mergeCode))
		.pipe(rename('stappo.web.js'))
		.pipe(gulp.dest('./build'))
});

gulp.task('build', function(){
	sequence(['build:merge','build:stappo', 'build:stappo.web'])
});

gulp.task('run:test', function () {
	return gulp.src('spec/*-spec.js').pipe(jasmine({verbose: true}));
});

gulp.task('test', function () {
	sequence('build', 'run:test');
});

gulp.task('compile', function (cb) {
	sequence('compile:web.bundle','compile:bundle', 'compile:generic', 'compile:web', cb);
});

gulp.task('default', function (cb) {
	sequence(['build', 'compile'], 'run:test', cb);
});
