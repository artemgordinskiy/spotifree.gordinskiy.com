module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: ['js/*.js'],
                dest: 'dist/scripts.js'
            },
            css: {
                src: ['css/*.css'],
                dest: 'dist/styles.css'
            }
        },

        uglify: {
            js: {
                files: {'dist/scripts.js': ['dist/scripts.js']}
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['styles.css'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true,
                    collapseWhitespace: true
                }, files: {
                    'dist/index.html': 'index.html',
                    'dist/contact.html': 'contact.html',
                    'dist/about.html': 'about.html',
                    'dist/troubleshooting.html': 'troubleshooting.html',
                    'dist/404.html': '404.html'
                }
            }
        },

        uncss: {
            dist: {
                options: {
                    ignoreSheets: [/cdnjs\.cloudflare\.com/],
                    ignore: [/\.active/, /\.open/, /\.disabled/]
                },
                files: {
                    'dist/styles.css': ['index.html', 'about.html', 'contact.html', 'troubleshooting.html']
                }
            }
        },

        'string-replace': {
            replace_asset_src: {
                files: {
                    'dist/': ['dist/*.html']
                },
                options: {
                    replacements: [
                        {
                            pattern: /rel="stylesheet"\shref="dist\//g,
                            replacement: 'rel="stylesheet" href="'
                        },
                        {
                            pattern: /src="dist\//g,
                            replacement: 'src="'
                        }
                    ]
                }
            }
        },

        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'dist/',
                src: ['**/*'],
                dest: 'dist/compressed/'
            }
        },

        csscss: {
            dist: {
                src: ['dist/styles.css']
            }
        },

        watch: {
            everything: {
                files: ['js/*.js', 'css/*.css', '*.html'],
                tasks: ['build-dev']
            }
        },

        clean: ["dist"]
    });

    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-csscss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('build-dev', [
        'clean',
        'concat:js',
        'concat:css'
    ]);

    grunt.registerTask('build-prod', [
        'clean',
        'concat:js',
        'concat:css',
        'uncss',
        'uglify',
        'cssmin',
        'htmlmin',
        'string-replace:replace_asset_src',
        'compress'
    ]);
};
