# classHelper

An Element.classList Helper function that can be curried.

## Usage

This is Element.ClassList helper 

```
import { map, curry } from 'lodash';
const classlistHelper = require('classlist-helper');

let element = document.querySelector('div');

// Example 1
curry(classlistHelper)('myClass')('add')(element)
curry(classlistHelper)('myClass')('remove')(element)
curry(classlistHelper)('myClass')('contains')(element)


// Example 2
let elementList = document.querySelector('div');
let setActive = curry(classHelper)('active')('add');

map(elementList, setActive);
```