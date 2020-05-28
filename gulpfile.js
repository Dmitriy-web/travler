const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);

});

gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.scss")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({     
        prefix: "",
        suffix: ".min",
      }))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 4 versions"]}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.stream());

})

gulp.task('script', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
})

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.scss", gulp.parallel('styles'))
    gulp.watch("src/*.html").on('change', gulp.parallel('html'))
    gulp.watch('src/js/**/*.js', gulp.parallel('script'))
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))

});


gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"));

});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));

});


gulp.task('images', function() {
    return gulp.src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));

});



gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'images', 'html' ,'script'))