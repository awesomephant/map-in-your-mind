const gulp = require("gulp");
const srcset = require("gulp-srcset").default;
const using = require("gulp-using");
const imageminWebp = require("imagemin-webp");
const imageDest = "_site/assets/images/";

gulp.task("images", () =>
  gulp
    .src("assets/images/**/*.{jpg,jpeg,JPG,JPEG,png,PNG}")
    .pipe(
      srcset([
        {
          processing: {
            webp: {
              quality: 70,
            },
          },
          optimization: {
            webp: imageminWebp({
              quality: 75,
            }),
          },
          format: ["png", "webp"],
          postfix: "",
          scalingUp: true,
          skipOptimization: true,
        },
      ])
    )
    .pipe(using({ prefix: "Writing", color: "yellow" }))
    .pipe(gulp.dest(imageDest))
);
