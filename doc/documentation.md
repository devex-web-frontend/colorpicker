#Index

**Classes**

* [class: Colorpicker](#Colorpicker)
  * [new Colorpicker(input, colorList)](#new_Colorpicker)
  * [const: Colorpicker.E_CREATED](#Colorpicker.E_CREATED)
  * [const: Colorpicker.E_SET_COLOR_LIST](#Colorpicker.E_SET_COLOR_LIST)
  * [const: Colorpicker.E_SET_COLOR](#Colorpicker.E_SET_COLOR)
  * [const: Colorpicker.E_CHANGED](#Colorpicker.E_CHANGED)

**Namespaces**

* [Colorpicker](#Colorpicker)
  * [const: Colorpicker.E_CREATED](#Colorpicker.E_CREATED)
  * [const: Colorpicker.E_SET_COLOR_LIST](#Colorpicker.E_SET_COLOR_LIST)
  * [const: Colorpicker.E_SET_COLOR](#Colorpicker.E_SET_COLOR)
  * [const: Colorpicker.E_CHANGED](#Colorpicker.E_CHANGED)

**Functions**

* [setColorList(colors)](#setColorList)
* [setColor(color)](#setColor)
* [setDisabled()](#setDisabled)
* [setEnabled()](#setEnabled)
* [getBlock()](#getBlock)
* [getEventTarget()](#getEventTarget)
 
<a name="Colorpicker"></a>
#class: Colorpicker
**Members**

* [class: Colorpicker](#Colorpicker)
  * [new Colorpicker(input, colorList)](#new_Colorpicker)
  * [const: Colorpicker.E_CREATED](#Colorpicker.E_CREATED)
  * [const: Colorpicker.E_SET_COLOR_LIST](#Colorpicker.E_SET_COLOR_LIST)
  * [const: Colorpicker.E_SET_COLOR](#Colorpicker.E_SET_COLOR)
  * [const: Colorpicker.E_CHANGED](#Colorpicker.E_CHANGED)

<a name="new_Colorpicker"></a>
##new Colorpicker(input, colorList)
Creates new Colorpicker

**Params**

- input `HTMLInputElement`  
- colorList `Array`  

<a name="Colorpicker.E_CREATED"></a>
##const: Colorpicker.E_CREATED
**Type**: `string`  
**Default**: `colorpicker:created`  
<a name="Colorpicker.E_SET_COLOR_LIST"></a>
##const: Colorpicker.E_SET_COLOR_LIST
**Type**: `string`  
**Default**: `colorpicker:setcolorlist`  
<a name="Colorpicker.E_SET_COLOR"></a>
##const: Colorpicker.E_SET_COLOR
**Type**: `string`  
**Default**: `colorpicker:setcolor`  
<a name="Colorpicker.E_CHANGED"></a>
##const: Colorpicker.E_CHANGED
**Type**: `string`  
**Default**: `colorpicker:changed`  
<a name="Colorpicker"></a>
#Colorpicker
**Copyright**: Devexperts  
**Members**

* [Colorpicker](#Colorpicker)
  * [const: Colorpicker.E_CREATED](#Colorpicker.E_CREATED)
  * [const: Colorpicker.E_SET_COLOR_LIST](#Colorpicker.E_SET_COLOR_LIST)
  * [const: Colorpicker.E_SET_COLOR](#Colorpicker.E_SET_COLOR)
  * [const: Colorpicker.E_CHANGED](#Colorpicker.E_CHANGED)

<a name="Colorpicker.E_CREATED"></a>
##const: Colorpicker.E_CREATED
**Type**: `string`  
**Default**: `colorpicker:created`  
<a name="Colorpicker.E_SET_COLOR_LIST"></a>
##const: Colorpicker.E_SET_COLOR_LIST
**Type**: `string`  
**Default**: `colorpicker:setcolorlist`  
<a name="Colorpicker.E_SET_COLOR"></a>
##const: Colorpicker.E_SET_COLOR
**Type**: `string`  
**Default**: `colorpicker:setcolor`  
<a name="Colorpicker.E_CHANGED"></a>
##const: Colorpicker.E_CHANGED
**Type**: `string`  
**Default**: `colorpicker:changed`  
<a name="setColorList"></a>
#setColorList(colors)
**Params**

- colors `Array`  

<a name="setColor"></a>
#setColor(color)
**Params**

- color `String`  

<a name="setDisabled"></a>
#setDisabled()
Disables ColorPicker and hides dropdown

<a name="setEnabled"></a>
#setEnabled()
Enables ColorPicker

<a name="getBlock"></a>
#getBlock()
Get HTMLNode containing colorpicker

**Returns**: `Node`  
<a name="getEventTarget"></a>
#getEventTarget()
Get element which listens to events

**Returns**: `Node`  
