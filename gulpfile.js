const { src, dest, watch, parallel } = require("gulp");

// Css e Less
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

function css(done) {
  src("src/less/app.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

// Imagens
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

const paths = {
  less: "src/less/**/*.less",
  image: "src/images/**/*",
};

function image() {
  return src(paths.image)
    .pipe(cache(imagemin({ optimizationLevel: 3 })))
    .pipe(dest("build/images"));
}

function versionWebp(done) {
  const options = {
    quality: 50,
  };
  src("src/images/**/*.{png,jpg}")
    .pipe(webp(options))
    .pipe(dest("build/images"));
  done();
}

function versionAvif(done) {
  const options = {
    quality: 50,
  };
  src("src/images/**/*.{png,jpg}")
    .pipe(avif(options))
    .pipe(dest("build/images"));
  done();
}

function dev(done) {
  watch(paths.less, css);
  watch(paths.image, image);
  watch(paths.image, versionWebp);
  watch(paths.image, versionAvif);
  done();
}

exports.css = css;
exports.dev = dev;
exports.image = image;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(css, image, versionWebp, versionAvif, dev);
