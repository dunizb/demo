//删除文件
var del = require('del');
//合并CSS
var concatCss = require('gulp-concat-css');
//压缩CSS
var cssnano = require('gulp-cssnano');
//合并js
var concat = require('gulp-concat');
//压缩JS
var uglify = require('gulp-uglify');
//压缩HTML
//var minifyHTML = require('gulp-minify-html');
//重命名
var rename = require("gulp-rename");
//自动打开浏览器
//var open = require('gulp-open');
// 让gulp按顺序执行
var gulpSequence = require('gulp-sequence');

// 默认任务
gulp.task('default',['watch','sequence'],function(){
    gulp.src('./dist/index.html')
        .pipe(open({app:'chrome'}));
});

// 流程控制
gulp.task('sequence', gulpSequence('clear',['html','js','css','image']));

// 清空项目文件夹
gulp.task('clear',function(cb){

    // 删除dist目录下面的所有文件和文件夹
    del(['dist']).then(function(paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    })

    setTimeout(function(){
        return cb();
    },6000)

});

// 监听代码变化
gulp.task('watch',function(){
    gulp.watch('src/index.html',['html']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/css/*.css',['css']);
    gulp.watch('src/images/*.*',['image'])

});

// 处理js的任务
gulp.task('js', function() {
    // 直接返回gulp.src获取到的文件流
    // 当有多个输出口的话，会把当前执行到的操作先输出。当前的结果会传入下一个pipe中
    return gulp.src('src/js/*.js')
        // 合并js代码的操作
        //.pipe(concat('all.js'))
        //.pipe(gulp.dest('dist/js'))
        // 重命名js操作
        .pipe(uglify())
        //.pipe(rename("all.min.js"))
        .pipe(gulp.dest('dist/js'));
});

// 处理css的任务
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        // 合并css代码
        //.pipe(concatCss("all.css"))
        //.pipe(gulp.dest('dist/css'))
        .pipe(cssnano())
        //.pipe(rename("all.min.css"))
        .pipe(gulp.dest('dist/css'));
});

// 处理html的任务
gulp.task('html', function () {
    return gulp.src('src/*.html')
        //.pipe(minifyHTML())
        .pipe(gulp.dest('dist'))
});

// 处理image的任务
gulp.task('image', function () {
    return gulp.src('src/images/*.*')
        //.pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});
