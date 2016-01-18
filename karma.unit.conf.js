// Karma configuration
// Generated on Tue Aug 27 2013 14:49:15 GMT+0400 (Московское время (зима))

module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',


		// frameworks to use
		frameworks: ['jasmine'],

		preprocessors: {
			'src/js/*.js': ['coverage']
		},


		// list of files / patterns to load in the browser
		files: [
			'node_modules/babel-core/browser-polyfill.js',
			'lib/es5-shim/**/es5-shim.js',
			'lib/object-array-utils/src/**/*.js',
			'lib/classlist/**/classList.js',
			'lib/dxjs/src/**/dx.core.js',
			'lib/dxjs/src/**/dx.*.js',
			'lib/dropdown/src/**/*.js',
			'src/js/*.js',
			'test/js/mocks/**/*-mock.js',
			'test/js/*.unit.spec.js'
		],

		// list of files to exclude
		exclude: [],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots', 'coverage'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 30000
	});
};
