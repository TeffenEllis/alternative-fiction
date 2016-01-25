/* eslint-env node */

const buildDirectory = require("../webpack.config.js").buildDirectory
const config = require("../config/aws.json")
const gulp = require("gulp")
const awspublish = require("gulp-awspublish")

const cacheTime = 15
const headers = {"Cache-Control": `max-age=${cacheTime}, public`}

gulp.task("deploy", () => {
  const publisher = awspublish.create(config)

  console.log(`Deploying to  ${config.Bucket}`)

  gulp.src(`./${buildDirectory}/**`)
    .pipe(awspublish.gzip({ext: ""}))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter())
})
