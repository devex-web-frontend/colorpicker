angular.scenario.dsl('triggerCustomEvent', function() {
	return function(selector, type,  params, detail) {
		return this.addFutureAction('Triggering custom event ' + type, function($window, $document, done) {
			var DX = $window.DX,
				element = $document.find(selector).get(0);

			function eventHandler() {
				done();
				element.removeEventListener(type, eventHandler);
			}

			element.addEventListener(type, eventHandler);
			DX.Event.trigger(element, type, params, detail);
		});
	};
});