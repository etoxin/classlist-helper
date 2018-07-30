# classList Helper

An Element.classList method helper function that can be curried for functional programing.

### Example 

*Task*: Add the class `active` to all list elements.

```html
<ul>
  <li class="item">item</li>
  <li class="item">item</li>
  <li class="item">item</li>
  <li class="item">item</li>
</ul>
```

Setup:
```js
// import various libs
import { map, curry } from 'lodash';
let classListHelper = require('classlist-helper');

// Get the list of elements that you want to change
let nodeList = document.querySelectorAll('.item'); // 4 html elements
```

Usage:
```js
// Create Active method with classListHelper.
let setActive = curry(classlistHelper)('active')('add');

// Set all elements to Active.
map(nodeList, setActive);
```

After running this, the html will look like: 

```html
<ul>
  <li class="item active">item</li>
  <li class="item active">item</li>
  <li class="item active">item</li>
  <li class="item active">item</li>
  <li class="item active">item</li>
  <li class="item active">item</li>
  <li class="item active">item</li>
</ul>
```

# Other example methods

```js
// Remove a Class
let setInActive = curry(classlistHelper)('active')('remove');

// Add a Class
let setActive = curry(classlistHelper)('active')('add');

// Toggle a class 
let toggleActive = curry(classlistHelper)('active')('toggle');

// Add multiple classes / Pass an Array
let setMultiple = curry(classlistHelper)(['active','updated'])('add');

// Test all elements in an Array for a class
let anyActive = curry(classlistHelper)('active')('contains');

// Replace a class with another.
let setInactive = curry(classlistHelper)(['active', 'inactive'])('replace');
```

*Note:* For more examples please check the unit tests.