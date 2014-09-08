gulp = require 'gulp'
coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
browserify = require 'browserify'
coffeeify = require 'coffeeify'
source = require 'vinyl-source-stream'
uglify = require 'gulp-uglify'
streamify = require 'gulp-streamify'

debug = process.env.NODE_ENV is 'debug'

gulp.task 'src', (done) ->
  bd = gulp.src 'src/**/*.coffee'
  
  bd = bd.pipe sourcemaps.init() if debug

  bd = bd
    .pipe coffee
      bare: yes
    .on 'error', done
    
  bd = bd.pipe sourcemaps.write() if debug

  bd.pipe (gulp.dest 'lib/')

gulp.task 'dist', (done) ->
  bd = browserify
    entries: './src/index.coffee'
    extensions: ['.coffee']
    standalone: 'react-list-view'

  bd
    .transform coffeeify
    .bundle()
    .on 'error', done
    .pipe (source 'react-list-view.js')
    .pipe (gulp.dest 'dist/')

gulp.task 'dist:minified', (done) ->
  bd = browserify
    entries: './src/index.coffee'
    extensions: ['.coffee']
    standalone: 'react-list-view'

  bd
    .transform coffeeify
    .bundle()
    .on 'error', done
    .pipe (source 'react-list-view.min.js')
    .pipe (streamify uglify())
    .pipe (gulp.dest 'dist/')

gulp.task 'external', (done) ->
  bd = browserify
    extensions: ['.coffee']
    debug: debug

  bd
    .require './', expose: 'react-list-view'
    .require 'react'
    .bundle()
    .on 'error', done
    .pipe (source 'external.js')
    .pipe (gulp.dest 'dist/')

gulp.task 'watch', ['default'], ->
  gulp.watch 'src/**/*.coffee', ['external']

gulp.task 'default', ['src', 'dist', 'dist:minified', 'external']
