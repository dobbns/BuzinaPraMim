// Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


// Arquivos CSS
var buzinaCss = "./platforms/android/assets/www/css/*.less";
var buzinaHtml = "./platforms/android/assets/www/*.html";

// Minificando CSS
gulp.task('build:css', function(){
    gulp.src(buzinaCss)
   .pipe(less())
   .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
   .pipe(concat('style.min.css'))
   .pipe(minifyCss())
   .pipe(gulp.dest('www/css'));
});

// Local server using browsersync
gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('watch', function(){
    gulp.watch([
         buzinaCss,
         buzinaHtml
        ],
        ['build:css','reload']).on('change', function(event) {
          console.log('\r\r >>> O arquivo ' + event.path +' foi modificado.\r >>> Reexecutando as Tarefas, aguarde...\r\r');
    });
});

gulp.task('serve', ['build:css','watch', ], function() {
    browserSync.init({
        server: {
            baseDir: "./platforms/android/assets/www/"
        }
    });
});

gulp.task('default', ['serve']);
