"use strict";

const gulp = require("gulp");
let tsProject;

const tsc = function () {
    const ts = require("gulp-typescript");

    if (!tsProject) {
        tsProject = ts.createProject("tsconfig.json");

    }
    const reporter = ts.reporter.fullReporter();

    const tsResult = tsProject.src()
        .pipe(tsProject(reporter));
    return tsResult.js
        .pipe(gulp.dest("./src/chess/assets/js"));

};

gulp.task("default", function () {
    return gulp.watch(["./src/chess/assets/js/**/*.ts"], tsc)
});
