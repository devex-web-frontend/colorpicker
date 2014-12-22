/**
 * @copyright Devexperts
 */
var DropDownMock = (function(DX, window, document, undefined) {
	'use strict';

	/**
	 * @constructor DropDown
	 * @param {Node|Element} control
	 * @param {Object} config - {Array:modifiers, String|Number:width, String:optionTmpl, String:groupTmpl, String:innerTmpl}
	 */
	return function DropDown(control, config) {
		var block = DX.Dom.createElement('div', {
					className: 'dropDown dropDown-colorPicker'
				}),
				dataList,
				selectedIndex,
				isDDShown;

		document.body.appendChild(block);

		DX.Event.trigger(control, DropDownMock.E_CREATED, {
			detail: {
				block: block,
				eventTarget: block
			}
		});

		DropDownMock.___instance = this;

		this.setDataList = function(data) {
			dataList = data;
		};
		this.setSelectedIndex = function(index) {
			selectedIndex = index;
		};
		this.getSelectedIndex = function() {
			return selectedIndex;
		};
		this.show = function() {
			isDDShown = true;
			DX.Event.trigger(block, DropDownMock.E_SHOWN);
		};
		this.hide = function() {
			isDDShown = false;
			DX.Event.trigger(block, DropDownMock.E_HIDDEN);
		};
		this.isShown = function() {
			return isDDShown;
		};
		this.getBlock = function() {
			return block;
		};
		this.getEventTarget = function() {
			return block;
		};
	};
})(DX, window, document);

DropDownMock.E_CREATED = 'dropdown:created';
DropDownMock.E_SHOWN = 'dropdown:shown';
DropDownMock.E_HIDDEN = 'dropdown:hidden';
DropDownMock.E_CHANGED = 'dropdown:changed';