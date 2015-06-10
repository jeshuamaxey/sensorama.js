module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      sensorama: {
        files: {
          'build/sensorama.min.js': ['src/sensorama.js']
        }
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'src/*.js',
        'test/*.js',
        '!test/karma.conf.js'
      ]
    },

    karma: {
      run: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      dev: {
        configFile: 'test/karma.conf.js',
        autoWatch: true
      }
    },
  });
 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('watch', ['karma:dev']);
  
  grunt.registerTask('build', ['uglify:sensorama']);
  grunt.registerTask('default', ['build']);

  grunt.registerTask('test', ['jshint', 'karma:run']);

};