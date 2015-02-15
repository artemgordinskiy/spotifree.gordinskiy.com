/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        copy: {
          main: {
            files: [
              // includes files within path and its sub-directories
              {expand: true, src: ['**'], dest: 'dist/'}
            ]
          }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['js/*.js'],
                dest: 'dist/scripts.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'dist/scripts.js',
                dest: 'dist/scripts.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        uncss: {
            options: {
                ignoreSheets: [/cdnjs.cloudflare.com/]
            },
            dist: {
                files: {
                    'dist/css/tidy-main.css': ['index.html'],
                    'dist/css/tidy-secondary.css': ['about.html', 'contact.html', 'troubleshooting.html']
                },
                options: {
                    compress: true
                }
            },
            processhtml: {
              dist: {
                files: {
                  'dist/index.html': ['index.html'],
                  'dist/about.html': ['about.html'],
                  'dist/contact.html': ['contact.html'],
                  'dist/troubleshooting.html': ['troubleshooting.html']
                }
              }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            }
        }
    });

    // These plugins provide necessary tasks.
//    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'uncss']);

};
