angular.scenario.dsl('keydown', function() {
	return function(selector, code) {
		return this.addFutureAction('keydown on ' + selector + ' with code: ' + code, function($window, $document, done) {
			var element = $document.find(selector).get(0),
				event = document.createEvent('UIEvents');

			event.initUIEvent('keydown', false, false);
			event.key = code;

			function keydownHandler() {
				element.removeEventListener('keydown', keydownHandler);
				done();
			}
			element.addEventListener('keydown', keydownHandler);
			element.dispatchEvent(event);
		});
	};
});