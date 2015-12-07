module.exports = function(grunt) {
	grunt.initConfig({

		concat : {
			options: {
				separator: '\n\n //-------------------------------\n',
				banner: '\n\n //-------------------------------\n'
			},
			dist : {
				src: ['components/scripts/*.js'],
				dest: 'builds/development/js/script.js'
		  }
		}, //concat

		sass : {
			dist: {
				options : {
					style: 'expanded'
				},
				files : [{
					src : 'components/styles/sass/style.scss',
					dest : 'builds/development/css/style.css'
				}]
			}

		}, // sass

		connect : {
			server : {
				options : {
					hostname: 'localhost',
					port: 3000,
					base: 'builds/development'
				}
			}
		}, //connect

		wiredep : {
			task : {
				src : 'builds/development/**/*.html'
			}
		},

		watch : {
			scripts: {
		    files: ['components/scripts/**/*.js', 
		    		'builds/development/**/*.html', 
		    		'components/styles/sass/**/*.scss'],
		    tasks: ['concat','sass'],
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
	grunt.registerTask('default', ['wiredep', 'concat', 'sass', 'connect', 'watch']); //define tasks with order they run in array, also define if to run specific task concat:dist or concat:prod

}; //wrapper function