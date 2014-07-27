module.exports = function(grunt) {

	grunt.initConfig({

		sprite: {
			buildretina: {
				'src': ['img/sprite/*@2x.png'],
				'destImg': 'img/sprite@2x.png',
				'destCSS': 'scss/_sprite.scss',
				'algorithm': 'binary-tree',
				'padding': 20,
				'engine': 'auto'
			},
			build: {
				'src': ['img/sprite/*.png', '!<%= sprite.buildretina.src %>'],
				'destImg': 'img/sprite.png',
				'padding': 10,
				'cssTemplate': '../spritesmith-retina-mixins.template.mustache',

				'cssVarMap': function (sprite) {
					sprite.image = sprite.image.replace(".png", "");
				},
				'algorithm': '<%= sprite.buildretina.algorithm %>',
				'destCSS': '<%= sprite.buildretina.destCSS %>',
				'engine': '<%= sprite.buildretina.engine %>'
			}
		},

		sass: {
			build: {
				files: {
					'main.css': 'scss/main.scss'
				},
				options: {
					sourcemap: false,
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
