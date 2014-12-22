angular.scenario.dsl('blur', function() {
	return function(selector) {
		return this.addFutureAction('blur on ' + selector, function($window, $document, done) {
			var element = $document.find(selector).get(0),
				event = document.createEvent('HTMLEvents');

			event.initEvent('blur', false, false);

			function blurHandler() {
				element.removeEventListener('blur', blurHandler);
				done();
			}
			element.addEventListener('blur', blurHandler);
			element.dispatchEvent(event);
		});
	};
});