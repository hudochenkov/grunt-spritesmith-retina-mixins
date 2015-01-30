module.exports = function(grunt) {

	grunt.initConfig({

		sprite: {
			buildretina: {
				'src': ['img/sprite/*@2x.png'],
				'dest': 'img/sprite@2x.png',
				'destCss': 'scss/_sprite.scss',
				'padding': 20
			},
			build: {
				'src': ['img/sprite/*.png', '!<%= sprite.buildretina.src %>'],
				'dest': 'img/sprite.png',
				'padding': 10,
				'cssTemplate': '../spritesmith-retina-mixins.template.mustache',
				'destCss': '<%= sprite.buildretina.destCss %>'
			}
		},

		sass: {
			build: {
				files: {
					'main.css': 'scss/main.scss'
				},
				options: {
					sourcemap: 'none',
					unixNewlines: true,
					style: 'expanded'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sprite', 'sass']);

};
