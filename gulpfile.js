const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const svgSprite = require("gulp-svg-sprites");
const image = require("gulp-image");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

function styles(cb) {
  return src("src/sass/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer(["last 4 versions"]))
    .pipe(sourcemaps.write("sourcemaps"))
    .pipe(dest("src/css"));
  cb();
}

function buildStyles(cb) {
  return src("src/sass/style.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer(["last 4 versions"]))
    .pipe(dest("public/css"));
  cb();
}

function svg(cb) {
  return src("src/images/svg/*.svg")
    .pipe(
      svgSprite({
        mode: "symbols",
        svg: {
          svgPath: "../svg/svg/%f",
        },
      })
    )
    .pipe(dest("src/svg"));

  cb();
}

const clean = async () => {
  return del.sync(["./public/"]);
};

const compressImages = async () => {
  return src(
    ["./src/images/benefits/**/*", "./src/images/*.{jpg,jpeg,png,webp}"],
    { base: "./src/images" }
  )
    .pipe(image())
    .pipe(dest("./public/images"));
};

const copyAll = async () => {
  return src(
    [
      "./src/scripts/**/*",
      "./src/images/svg/**/*",
      "./src/images/examples/**/*",
      "./src/images/*.svg",
      "./src/images/**/*.svg",
      "./src/js/**/*",
      "./src/fonts/**/*",
      "./src/svg/**/*",
      "./src/ajax/**/*",
      "./src/*.html",
      "./src/.htaccess",
      "./src/popups/**/*",
    ],
    { base: "./src" }
  ).pipe(dest("./public"));
};

exports.styles = styles;
exports.svg = svg;
exports.default = function () {
  watch("src/sass/**/*.scss", styles);
  watch("src/images/svg/*.svg", svg);
};

const buildSeries = series(clean, compressImages, svg, buildStyles, copyAll);
exports.build = buildSeries;
