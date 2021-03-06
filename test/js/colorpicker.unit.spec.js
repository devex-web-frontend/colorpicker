/**
 * @copyright Devexperts
 */
describe('Colorpicker', function() {
	var elementTmpl = [
			'<input  type="text" value="" id="test" />'
		].join(''),
		defaultColorList = ['#511717', '#000000', '#fefefe'],
		colorPicker,
		testElement;

	beforeEach(function() {
		document.body.innerHTML = elementTmpl;
		testElement = document.getElementById('test');
		window.DropDown = DropDownMock;
		window.Colorpicker.colorList = defaultColorList;
	});

	afterEach(function() {
		document.body.innerHTML = '';
		testElement = window.DropDown = null;
		window.Colorpicker.colorList = [];
	});

	describe('disabled', function() {

		var getDisabled;

		beforeEach(function(){
			testElement.disabled  = true;
			getDisabled = function() {
				return  document.querySelectorAll('.colorPicker-disabled');
			}
		});

		it('should has modifier `disabled` if input has attribute `disabled`', function() {
			new Colorpicker(testElement);
			expect(getDisabled().length).toEqual(1)
		});

		it('sholud remove  modifier `disabled` on method `setEnabled`', function() {
			var colorPicker = new Colorpicker(testElement);
			colorPicker.setEnabled();
			expect(getDisabled().length).toEqual(0)
		});

		it('sholud add  modifier `disabled` on method `setDisabled`', function() {
			test.disabled = false;
			var colorPicker = new Colorpicker(testElement);
			colorPicker.setDisabled();
			expect(getDisabled().length).toEqual(1)
		})

	});

	describe('dropDownData', function() {

		var dropDown,
			dataList,
			initColorPicker;

		beforeEach(function(){

			initColorPicker = function(colorList) {
				colorList = colorList || defaultColorList;
				window.Colorpicker.colorList = colorList;
				new Colorpicker(testElement);

				dropDown = DropDown.___instance;
				dataList = dropDown.getDataList();
			};

			afterEach(function() {
				window.Colorpicker.colorList = [];
			});

		});

		it('should create one group from colors without group', function() {

			initColorPicker();

			expect(dataList.length).toEqual(1);
			expect(dataList[0].label).toEqual('');
		});

		it('should create group with passed title' , function() {
			initColorPicker([
				{
					groupTitle: 'test',
					colors: ['#000', '#fff']
				}
			]);
			expect(dataList.length).toEqual(1);
			expect(dataList[0].label).toEqual('test');

		});

		it('should not create group with blank colors', function() {
			initColorPicker([
				'#000', '#fff',
				{
					groupTitle: 'test',
					colors: []
				}
			]);
			expect(dataList.length).toEqual(1);
		});

		it('should create the same number of groups from mixed config', function() {
			initColorPicker([
				'#000', '#fff',
				{
					groupTitle: 'test',
					colors: ['#000', '#fff']
				},
				'#000', '#fff'
			]);
			expect(dataList.length).toEqual(2);
		})

	});

	describe('constructor', function() {

		it('should generate .colorPicker element', function() {
			new Colorpicker(testElement);

			expect(document.querySelectorAll('.colorPicker').length).toBe(1);
			expect(document.querySelectorAll('.colorPicker--label').length).toBe(1);
			expect(document.querySelectorAll('.colorPicker--value').length).toBe(1);
		});

		it('should generate .dropDown-colorPicker element',function(){
			new Colorpicker(testElement);

			expect(document.querySelector('.dropDown-colorPicker')).not.toBeNull();
			expect(document.querySelectorAll('.dropDown-colorPicker').length).toBe(1);
		});

		it('should keep original input', function() {
			new Colorpicker(testElement);
			expect(document.querySelector('input')).toBe(testElement);
		});

		it('should fire E_CREATED', function() {
			var spy = jasmine.createSpy('created');
			testElement.addEventListener(Colorpicker.E_CREATED, spy);

			new Colorpicker(testElement);

			expect(spy).toHaveBeenCalled();
		});

		describe('colorList', function(){

			it('should set colorList from property object Colorpicker.colorList and set input value zero index color', function(){
				new Colorpicker(testElement);

				expect(testElement.value).toBe('#511717');
			});

			it('should set colorList from parameter constructor and set input value zero index color', function(){
				new Colorpicker(testElement, ['#f5f5f5', '#f4fefe']);

				expect(testElement.value).toBe('#f5f5f5');
			});

			it('should set colorList from property element ans set input value zero index color', function(){
				testElement.colorList = ['#f5f5f5', '#f4fefe'];

				new Colorpicker(testElement);

				expect(testElement.value).toBe('#f5f5f5');
			});

			it('should set colorList from property case insensitively', function(){
				testElement.colorList = ['#F5F5F5', '#F4FEFE'];

				new Colorpicker(testElement);

				expect(testElement.value).toBe('#f5f5f5');
			});

		});

	});


	describe('Events API', function() {

		describe('Dropdown.E_CHANGED', function(){

			it('should set input value when fires Dropdown.E_CHANGED', function() {

				var dropDown,
					dropDownBlock;

				new Colorpicker(testElement);

				dropDown = DropDown.___instance;
				dropDownBlock = dropDown.getBlock( );

				expect(testElement.value).toBe('#511717');

				dropDown.setSelectedIndex(2);
				DX.Event.trigger(dropDownBlock, DropDown.E_CHANGED);
				expect(testElement.value).toBe('#fefefe');

			})
		});

		describe('Colorpicker.E_SET_COLOR_LIST', function(){

			it('should update colorList and set input value color zero index', function() {

				new Colorpicker(testElement);
				expect(testElement.value).toBe('#511717');

				testElement.colorList = ['#fefefe', '#000000','#511717'];
				DX.Event.trigger(testElement, Colorpicker.E_SET_COLOR_LIST );
				expect(testElement.value).toBe('#fefefe');

			})
		});

		describe('Colorpicker.E_SET_COLOR', function(){

			it('should set DropDown color index', function() {

				var dropDown;

				new Colorpicker(testElement);
				dropDown = DropDown.___instance;

				expect(testElement.value).toBe('#511717');
				testElement.value = '#000000';
				DX.Event.trigger(testElement, Colorpicker.E_SET_COLOR );

				expect(dropDown.getSelectedIndex()).toBe(1);
				expect(testElement.value).toBe('#000000');
			})
		});

		describe('Colorpicker.E_COLOR_CHANGED', function(){

			it('should fire Colorpicker.E_COLOR_CHANGED event when color is changed by user', function() {

				new Colorpicker(testElement);
				var dropDown = (DropDown.___instance).getEventTarget();
				var spy = jasmine.createSpy();

				testElement.addEventListener(Colorpicker.E_CHANGED, spy);
				DX.Event.trigger(dropDown, DropDown.E_CHANGED);

				expect(spy).toHaveBeenCalled();
			})
		});

	});

	describe('#setColor()', function() {

		it('should set input value passed parameter',function(){
			var colorPicker = new Colorpicker(testElement);
			colorPicker.setColor('#fefefe');

			expect(testElement.value).toBe('#fefefe');
		});

		it('should set zero color if passed invalid color',function(){
			var colorPicker = new Colorpicker(testElement);
			colorPicker.setColor('#dedede');

			expect(testElement.value).toBe('#511717');
		});

		it('should set input value case insensitively',function(){
			var colorPicker = new Colorpicker(testElement);
			colorPicker.setColor('#FEfefe');

			expect(testElement.value).toBe('#fefefe');
		});

	});

	describe('Constants', function() {
		it('should provide event names as public constants', function() {
			expect(Colorpicker.E_CREATED).toBe('colorpicker:created');
			expect(Colorpicker.E_SET_COLOR_LIST).toBe('colorpicker:setcolorlist');
			expect(Colorpicker.E_SET_COLOR).toBe('colorpicker:setcolor');
			expect(Colorpicker.E_CHANGED).toBe('colorpicker:changed');
		});
	})
});