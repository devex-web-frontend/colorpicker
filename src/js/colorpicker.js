/**
 * Generates universal unique id
 * @see https://gist.github.com/gordonbrander/2230317#gistcomment-1618310
 * @returns {String}
 */
function uuid() {
	'use strict';

	var chr4 = function chr4() {
		return Math.random().toString(16).slice(-4);
	};
	return chr4() + chr4() + "-" + chr4() + "-" + chr4() + "-" + chr4() + "-" + (chr4() + chr4() + chr4());
}


/**
 * @copyright Devexperts
 *
 * @requires DX
 * @requires DX.Dom
 * @requires DX.Bem
 * @requires DX.Event
 * @requires DX.Tmpl
 * @requires DropDown
 * @namespace
 */
var Colorpicker = (function(DX) {
	'use strict';

	var event = DX.Event,
		CN_COLORPICKER = 'colorPicker',
		M_OPEN = 'opened',
		M_DISABLED = 'disabled',
		CN_COLORPICKER_LABEL = CN_COLORPICKER + '--label',
		CN_COLORPICKER_VALUE = CN_COLORPICKER + '--value',
		defaultColors = {
			colorList: ['#511717', '#d90100', '#ff504f', '#dddddd']
		},
		allColors = [],
		defaults = {
			BUTTON_TMPL: [
				'<button class="button" type="button">',
				'<span>',
				'<i class="' + CN_COLORPICKER_VALUE + '"></i>',
				'</span>',
				'</button>'
			].join(''),
			ARROW_TMPL: '',
			INNER_TMPL: [
				'<div class="' + CN_COLORPICKER_LABEL + '">',
				'{%= BUTTON_TMPL %}',
				'{%= ARROW_TMPL %}',
				'</div>'
			].join(''),
			OPTION_TMPL: '<li class="{%= classNames %}" style="background-color: {%= value %}"></li>',
			animationTime: 0.3
		};


	/**
	 * Check is object variable
	 * @param {*} param
	 * @returns {boolean}
	 */
	function isObject(param) {
		var type = typeof param;
		return type === 'object' && !Array.isArray(param);
	}

	/**
	 * Check is string variable
	 * @param {*} param
	 * @returns {boolean}
	 */
	function isString(param) {
		return Object.prototype.toString.call(param) === '[object String]';
	}


	/**
	 * Creates new Colorpicker
	 * @constructor Colorpicker
	 * @param {HTMLInputElement} input
	 * @param {Array} colorList
	 * @param {Object} customTemplateConfig
	 */
	return function Colorpicker(input, colorList, customTemplateConfig) {
		var block, valueElement, dropDown, config, disabled = input.disabled;

		function init() {
			config = Object.assign({}, defaults, customTemplateConfig);
			initAppearance();
			dropDown = new DropDown(block, {
				optionTmpl: config.OPTION_TMPL,
				modifiers: [CN_COLORPICKER],
				animationTime: config.animationTime
			});
			initListeners();
			setColorListHandler();
			if (disabled) {
				setDisabled();
			}
			DX.Event.trigger(input, Colorpicker.E_CREATED, {
				detail: {
					block: block,
					eventTarget: input
				}
			});
		}

		function initListeners() {
			var dropDownEventTarget = dropDown.getEventTarget();

			block.addEventListener(DX.Event.TOUCH_CLICK, toggleDropDown, true);

			dropDownEventTarget.addEventListener(DropDown.E_SHOWN, setOpenedState, true);
			dropDownEventTarget.addEventListener(DropDown.E_HIDDEN, removeOpenedState, true);
			dropDownEventTarget.addEventListener(DropDown.E_CHANGED, dropDownIndexChangeHandler, true);

			input.addEventListener(Colorpicker.E_SET_COLOR_LIST, setColorListHandler);
			input.addEventListener(Colorpicker.E_SET_COLOR, setColorByInputValue);
		}

		function initAppearance() {
			var parent = DX.Dom.getParent(input);
			block = DX.Dom.createElement('div', {
				className: CN_COLORPICKER,
				id: input.id || uuid(),
				innerHTML: DX.Tmpl.process(config.INNER_TMPL, config)
			});

			input.removeAttribute('id');
			valueElement = block.querySelector('.' + CN_COLORPICKER_VALUE);

			parent.insertBefore(block, input);
			block.appendChild(input);
		}

		function removeAppearence() {
			var parent = DX.Dom.getParent(block);
			parent.insertBefore(input, block);
			block.remove();
		}


		function destroy() {
			removeListeners();
			DX.Event.trigger(input, Colorpicker.E_DESTROYED);
			removeAppearence();
			dropDown.destroy();
		}

		function removeListeners() {
			var dropDownEventTarget = dropDown.getEventTarget();

			block.removeEventListener(DX.Event.TOUCH_CLICK, toggleDropDown, true);

			dropDownEventTarget.removeEventListener(DropDown.E_SHOWN, setOpenedState, true);
			dropDownEventTarget.removeEventListener(DropDown.E_HIDDEN, removeOpenedState, true);
			dropDownEventTarget.removeEventListener(DropDown.E_CHANGED, dropDownIndexChangeHandler, true);

			input.removeEventListener(Colorpicker.E_SET_COLOR_LIST, setColorListHandler);
			input.removeEventListener(Colorpicker.E_SET_COLOR, setColorByInputValue);
		}


		function setColorListHandler() {
			colorList = input.colorList || colorList || Colorpicker.colorList;
			setColorList(colorList);
		}

		/**
		 * Create group from color list
		 * @param {Array} colorList
		 * @param {string=} title
		 * @returns {{groupTitle: string, colors: array}}
		 */
		function createGroup(colorList, title) {
			return {
				groupTitle: title || '',
				colors: colorList
			};
		}

		function getGroups(colors) {

			colors = colors || [];

			var groups = [],
				colorsWithoutGroup = [];

			colors.forEach(function(item) {
				if (isObject(item) || isString(item)) {
					var isItGroup = Array.isArray(item.colors);
					if (isItGroup) {
						groups.push(item);
					} else {
						colorsWithoutGroup.push(item);
					}
				}
			});

			groups.unshift(
				createGroup(colorsWithoutGroup)
			);

			groups = removeEmptyGroups(groups);

			if (!groups.length) {
				colorList = defaultColors.colorList;
				groups.push(createGroup(colorList));
			}
			return groups;
		}

		/**
		 * Remove  group without colors
		 * @param {Array} groups
		 * @returns {Array}
		 */
		function removeEmptyGroups(groups) {
			return groups.filter(function(group) {
				return group.colors.length > 0;
			});
		}

		/**
		 * Get all colors from groups
		 * @param {Array} groups
		 * @returns {Array}
		 */
		function getAllColorsFromGroups(groups) {
			return groups.reduce(function(colors, group) {
				return colors.concat(group.colors);
			}, []);
		}

		/**
		 * @method setColorList
		 * @param {Array} colors
		 */
		function setColorList(colors) {
			var groups = getGroups(colors);
			groups.forEach(function(group) {
				group.colors = formatColors(group.colors);
			});
			allColors = getAllColorsFromGroups(groups);

			var dataForDropDown = prepareDataForDropDown(groups);
			dropDown.setDataList(dataForDropDown);
			setColor(allColors[0]);

		}

		/**
		 * Format color to lower case
		 * @param {Array} colors
		 * @returns {Array}
		 */
		function formatColors(colors) {
			return colors.map(function(color) {
				return color.toLowerCase();
			});
		}


		function dropDownIndexChangeHandler() {
			setColor(allColors[dropDown.getSelectedIndex()]);
			event.trigger(input, Colorpicker.E_CHANGED);
		}

		/**
		 * Get data for dropDown
		 * @param  {{groupTitle:string, options:Array}} groups
		 * @returns {Array}
		 */
		function prepareDataForDropDown(groups) {

			return groups.map(function(group) {
				return {
					label: group.groupTitle || '',
					options: group.colors.map(function(value) {
						return {
							value: value
						};
					})
				};
			});
		}

		function setColorByInputValue() {
			setColor(input.value);
		}

		function showDropDown() {
			dropDown.show();
		}

		function hideDropDown() {
			dropDown.hide();
		}

		function toggleDropDown() {
			if (!disabled) {
				if (isOpenedState()) {
					hideDropDown();
				} else {
					showDropDown();
				}
			}
		}

		function setOpenedState() {
			DX.Bem.addModifier(block, M_OPEN, CN_COLORPICKER);
		}

		function removeOpenedState() {
			DX.Bem.removeModifier(block, M_OPEN, CN_COLORPICKER);
		}

		function isOpenedState() {
			return DX.Bem.hasModifier(block, M_OPEN, CN_COLORPICKER);
		}

		function setDisabled() {
			hideDropDown();
			disabled = true;
			DX.Bem.addModifier(block, M_DISABLED);
		}

		function setEnabled() {
			disabled = false;
			DX.Bem.removeModifier(block, M_DISABLED);
		}

		/**
		 * @method setColor
		 * @param {String} color
		 */
		function setColor(color) {
			color = color.toLowerCase();
			var index = allColors.indexOf(color);
			if (index < 0) {
				index = 0;
			}
			valueElement.style.backgroundColor = allColors[index];
			dropDown.setSelectedIndex(index);
			input.value = allColors[index];
		}

		init();

		/**
		 * Disables ColorPicker and hides dropdown
		 * @method setDisabled
		 */
		this.setDisabled = setDisabled;

		/**
		 * Destroying colorpicker component and its dropdown
		 * @method destroy
		 */
		this.destroy = destroy;

		/**
		 * Enables ColorPicker
		 * @method setEnabled
		 */
		this.setEnabled = setEnabled;

		this.setColor = setColor;
		this.setColorList = setColorList;
		/**
		 * Get HTMLNode containing colorpicker
		 * @method getBlock
		 * @returns {Node}
		 */
		this.getBlock = function() {
			return block;
		};
		/**
		 * Get element which listens to events
		 * @method getEventTarget
		 * @returns {Node}
		 */
		this.getEventTarget = function() {
			return input;
		};
	};
})(DX);
/** @constant
 * @type {string}
 * @default
 * @memberof Colorpicker
 */
Colorpicker.E_CREATED = 'colorpicker:created';
/** @constant
 * @type {string}
 * @default
 * @memberof Colorpicker
 */
Colorpicker.E_DESTROYED = 'colorpicker:destroyed';
/** @constant
 * @type {string}
 * @default
 * @memberof Colorpicker
 */
Colorpicker.E_SET_COLOR_LIST = 'colorpicker:setcolorlist';
/** @constant
 * @type {string}
 * @default
 * @memberof Colorpicker
 */
Colorpicker.E_SET_COLOR = 'colorpicker:setcolor';
/** @constant
 * @type {string}
 * @default
 * @memberof Colorpicker
 */
Colorpicker.E_CHANGED = 'colorpicker:changed';