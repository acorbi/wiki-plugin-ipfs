module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    
    authors: {
      prior: [
        "Alex Corbi <alex@open-steps.org>"
      ]
    },
    
    coffee: {
      client: {
        expand: true,
        options: {
          sourceMap: true
        },
        src: ['client/*.coffee', 'server/*.coffee', 'test/*.coffee'],
        ext: '.js'
      }
    },

    browserify: {
      build: {
        src: 'client/ipfs_src.js',
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
        files: ['client/*.coffee', 'server/*.coffee', 'test/*.coffee'],
        tasks: ['coffee', 'browserify', 'mochaTest'] //
      }
    }
  });

  grunt.registerTask('build', ['coffee', 'browserify', 'mochaTest']); //'browserify', 
  grunt.registerTask('default', ['build']);

};
