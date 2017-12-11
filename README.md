# classHelper

An Element.classList Helper function that can be curried.

## Usage

This is Element.ClassList helper 

```
import { map, curry } from 'lodash';
const classListHelper = require('classlist-helper');

let element = document.querySelector('div');

// Example 1
curry(classListHelper)('myClass')('add')(element)
curry(classListHelper)('myClass')('remove')(element)
curry(classListHelper)('myClass')('contains')(element)


// Example 2
let elementList = document.querySelector('div');
let setActive = curry(classHelper)('active')('add');

map(elementList, setActive);
```