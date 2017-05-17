'use strict';

let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let autoprefixer = require('autoprefixer');
let postcss = require('gulp-postcss');
let cssnano = require('cssnano');
let rename = require("gulp-rename");
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let spritesmith = require('gulp.spritesmith');
let merge = require('merge-stream');
let uglify = require('gulp-uglify');
let path = {
	css: {
		source: './staticcontent/source/scss/styles.scss',
		dest: {
			public: './staticcontent/css',
			markup: '../markup/staticcontent/css'
		},
		deploy: {
			source: './staticcontent/css/all.css',
			dest: {
				public: './staticcontent/css',
				markup: '../markup/staticcontent/css'
			},
		},
		watch: 'staticcontent/source/scss/**/*.scss'
	},
	js: {
		source: [
			'./staticcontent/source/js/polyfills/*.js',
			'./staticcontent/source/js/helpers/*.js',
			'./staticcontent/source/js/components/*.js',
			'./staticcontent/source/js/app.js'
		],
		dest: {
			public: './staticcontent/js',
			markup: '../markup/staticcontent/js'
		},
		deploy: {
			source: './staticcontent/js/all.js',
			dest: {
				public: './staticcontent/js',
				markup: '../markup/staticcontent/js'
			},
		},
		watch: 'staticcontent/source/js/**/*.js'
	},
	sprite: {
		png: {
			source: {
				x1: './staticcontent/source/img/sprite/png/*.png',
				x2: './staticcontent/source/img/sprite/png/*@2x.png'
			},
			dest: {
				img: {
					public: './staticcontent/img',
					markup: '../markup/staticcontent/img',
				},
				css: './staticcontent/source/scss/helpers'
			}
		}
	}
};


gulp.task('css', () => {
	let processors = [
		autoprefixer()
	];

	return gulp.src( path.css.source )
		.pipe( sourcemaps.init() )
		.pipe( sass({ outputStyle: 'expanded' }).on( 'error', sass.logError) )
		.pipe( postcss(processors) )
		.pipe( sourcemaps.write() )
		.pipe( rename({ basename: 'all' }) )
		.pipe( gulp.dest( path.css.dest.public ) )
		.pipe( gulp.dest( path.css.dest.markup ) );
});


gulp.task('deploy-css', () => {
	let processors = [
		cssnano({
			autoprefixer: false,
			discardComments: {
				removeAll: true
			},
			reduceIdents: false,
			svgo: false,
			zindex: false
		})
	];

	return gulp.src( path.css.deploy.source )
		.pipe( postcss(processors) )
		.pipe( gulp.dest( path.css.deploy.dest.public ) )
		.pipe( gulp.dest( path.css.deploy.dest.markup ) );
});


gulp.task('js', () => {
	return gulp.src( path.js.source )
		.pipe( sourcemaps.init() )
		.pipe( concat( 'all.js' ) )
		.pipe( babel({
			presets: ['es2015']
		}) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( path.js.dest.public ) )
		.pipe( gulp.dest( path.js.dest.markup ) );
});


gulp.task('deploy-js', () => {
	return gulp.src( path.js.deploy.source )
		.pipe( uglify() )
		.pipe( gulp.dest( path.js.deploy.dest.public ) )
		.pipe( gulp.dest( path.js.deploy.dest.markup ) );
});


gulp.task('sprite-png', () => {
	let spriteData = gulp.src( path.sprite.png.source.x1 )
		.pipe(spritesmith({
			cssName: '_sprite.scss',
			imgName: 'sprite.png',
			imgPath: '/staticcontent/img/sprite.png',
			retinaSrcFilter: path.sprite.png.source.x2,
			retinaImgName: 'sprite@2x.png',
			retinaImgPath:'/staticcontent/img/sprite@2x.png',
			padding: 8
		}));

	let imgStream = spriteData.img
		.pipe( gulp.dest( path.sprite.png.dest.img.public ) )
		.pipe( gulp.dest( path.sprite.png.dest.img.markup ) );
	let cssStream = spriteData.css.pipe( gulp.dest( path.sprite.png.dest.css ) );

	return merge( imgStream, cssStream );
});


gulp.task('watch', () => {
	gulp.watch( path.css.watch, ['css'] );
	gulp.watch( path.js.watch, ['js'] );
});


gulp.task('default', ['sprite-png', 'css', 'js', 'watch']);


gulp.task('deploy', ['deploy-css', 'deploy-js']);
