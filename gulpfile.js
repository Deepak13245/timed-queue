let gulp=require('gulp');
let ts=require('gulp-typescript');
let merge=require('gulp-merge');
let maps=require('gulp-sourcemaps');
let minify=require('gulp-minify');

gulp.task('src',()=>{
    let tsproject=ts.createProject('./tsconfig.json');
    let result=gulp.src('src/*.ts')
            .pipe(maps.init())
            .pipe(tsproject());            ;
    return merge([
        result.js.pipe(maps.write('./'))
                .pipe(minify({
                  ext:{
                      src:'.js',
                      min:'.min.js'
                  }  
                }))
                .pipe(gulp.dest('dist/js')),
        result.dts.pipe(gulp.dest('dist/definitions')),
    ]);
});


gulp.task('default',['src']);