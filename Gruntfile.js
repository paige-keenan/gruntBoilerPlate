module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: ['application/sass/*.scss'],
        tasks: ['sass'],
      },

      jade: {
        files: ['application/jade/*.jade'],
        tasks: ['jade:compile']
      },   

      coffee: {
        files: ['application/coffee/*.coffee'],
        tasks: ['coffee']
      },

      options: {
        livereload: true
      },
      files: ['public']        
    }, 

    express: {
      all: {
        options:{
          port: 9000,
          hostname: 'localhost',
          bases: ['./public'],
          livereload: true 
        }
      }
    },      

    open: {
      all: {
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },


    sass: {
      dist: {
        files: {
          'public/main/stylesheets/application.css': 'application/sass/*.scss'
        }
      }
    },


    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          'public/index.html': 'application/jade/index.jade'
        }
      }
    },

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: '',
        src: ['application/coffee/*.coffee'],
        dest: 'public/main/js/',
        ext: '.js'
      }      
    }

  });

  // Require all tasks found in `package.json`
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Registered taks
  grunt.registerTask('server', [
    'express',
    'open',
    'jade',
    'sass',
    'coffee',
    'watch'
  ]);
};