var rewrite = require("connect-modrewrite");

module.exports = function(grunt) {
    grunt.initConfig({

        concat: {
            options: {
                separator: '\n\n //-------------------------------\n',
                banner: '\n\n //-------------------------------\n'
            },
            dist: {
                src: ['components/scripts/**/*.js'],
                dest: 'builds/development/js/script.js'
            }
        }, //concat

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    src: 'components/styles/sass/style.scss',
                    dest: 'builds/development/css/style.css'
                }]
            }

        }, // sass

        connect: {

            options: {
                middleware: function(connect, options, middlewares) {
                    var rules = [
                        "!\\.html|\\.xml|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif|\\.woff|\\.woff2|\\.ttf|\\.eot$ /index.html"
                    ];
                    middlewares.unshift(rewrite(rules));
                    return middlewares;
                }
            },
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 3000,
                    base: 'builds/development'
                }
            }
        }, //connect

        watch: {
            scripts: {
                files: ['components/scripts/**/*.js',
                    'builds/development/**/*.html',
                    'components/styles/sass/**/*.scss'
                ],
                tasks: ['concat', 'sass'],
                options: {
                    spawn: false, //make the process of running tasks a bit faster
                    livereload: true
                },
            },
        }, //watch

    }); //initConfig

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.registerTask('default', ['connect', 'concat', 'sass', 'watch']); //define tasks with order they run in array, also define if to run specific task concat:dist or concat:prod

}; //wrapper function