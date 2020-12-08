const gulp = require("gulp");
const srcset = require("gulp-srcset").default;
const using = require("gulp-using");
const mozjpeg = require("imagemin-mozjpeg");
const optipng = require("imagemin-optipng");
const pngquant = require("imagemin-pngquant");

const imageDest = "_site/assets/images/";
const sizes = [2000];

gulp.task("images", () =>
  gulp
    .src("assets/images/**/*.{jpg,jpeg,JPG,JPEG,png,PNG}")
    .pipe(
      srcset([
        {
          processing: {
            jpg: {
              quality: 90,
            },
          },
          optimization: {},
          width: sizes,
          skipOptimization: false,
        },
      ])
    )
    .pipe(using({ prefix: "Writing", color: "yellow" }))
    .pipe(gulp.dest(imageDest))
);
