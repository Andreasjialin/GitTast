//编写代码，查阅文档之后，官方给我们制定的写法
const gulp = require("gulp");

/*
    第一个参数  任务名字（自定义）
    第二个参数  回调函数

    运行任务：需要在控制台输入  gulp 任务名
*/

//简单的操作
//拷贝和整理.html文件  gulp.src 文件的源路径  gulp.dest() 文件的目的路径(不存在，会自动创建)  pipe方法进行执行
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());//实时同步，每次保存刷新下
})

//拷贝图片
gulp.task("images", function(){
    // return gulp.src("images/*.{jpg,png}")
    // return gulp.src("images/*/*")

    //拷贝所有的图片，包括文件夹外的和文件夹内部的
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//拷贝数据源  我们将多个文件夹中的文件，拷贝到一个文件夹内部去
gulp.task("data", function(){
    return gulp.src(["xml/*.xml", "json/*.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})




/*
    scss css预编译器（如果css能够像JS一样，可以去进行编程就OK）
    scss当做是一个升级版的css的就行了。
    scss里面直接兼容css所有的写法。 想办法将scss代码编译成css文件

    gulp-scss
    gulp-sass
    gulp-minify-css
    gulp-rename  

    .css
    .min.css
*/
const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");//压缩css
const rename = require("gulp-rename");//重命名插件

gulp.task("scss", function(){
    return gulp.src("*.css")
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})



//由于1.js和2.js，所写的代码属于同一类功能的函数
//将两个文件中的内容进行合并，
//gulp-concat  合并文件  压缩 gulp-uglify   【注】类似jquery和jquery.cookie的框架，不能对其进行压缩
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());

})

//一次性执行多个任务
gulp.task("build", ["copy-html", "images", "data", 'scss', 'scripts'], function(){
    console.log("项目建立成功");
})



//gulp提供监听的机制，自动监听文件，如果发现文件发生改变，自动执行任务，完成更新
gulp.task("watch", function(){
    //编写我们监听的文件  
    //第一个参数  监听文件路径  第二个参数（数组）  执行的任务
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("images/**/*", ["images"]);
    gulp.watch(["*.json"], ["data"]);
    gulp.watch("scss/*.scss", ['css']);
    gulp.watch(["*.js","!gulpfile.js"], ['scripts']);

})



//gulp-connect 本地启动一个服务器
const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",   //指定服务器的根目录
        port: 9995,
        livereload: true //启动实时刷新
    })
})

//同时执行watch和server这两个任务  设置默认任务  执行 gulp
gulp.task("default", ["server", 'watch']);