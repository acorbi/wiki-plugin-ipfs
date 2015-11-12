module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({

    authors: {
      prior: [
        "Alex Corbi <alex@open-steps.org>"
      ]
    },

    browserify: {
      build: {
        src: 'src/**.js',
        dest: 'client/ipfs.js',
        options: {
          debug: true,
          browserifyOptions: {
            debug: true
          }
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
        
      }
    },

    watch: {
      all: {
        files: ['src/*.js', 'test/*.js'],
        tasks: ['browserify', 'mochaTest'] //
      }
    }
  });

  grunt.registerTask('build', ['browserify', 'mochaTest']); //'browserify',
  grunt.registerTask('default', ['build']);

};
