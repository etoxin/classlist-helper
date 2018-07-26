let assert = require('chai').assert;
let jsdom = require('mocha-jsdom');
let map = require('lodash').map;
let curry = require('lodash').curry;

let classListHelper = require('../classlist-helper.js');

let testdoms = [
    `<div class="foo bar"></div>`,
    `<div class="foo bar boom"></div>`,
    `<div class="foo bar"></div><div class="foo boom"></div><div class="foo baz"></div>`
];

describe('classListHelper', function () {
    jsdom();
    describe('General tests', function () {
        it('should be a function', function () {
            assert.equal(typeof classListHelper, 'function');
        });
        it('should accepts second argument of "contains" and returns', function () {
            document.body.innerHTML = testdoms[0];
            let el = document.querySelector('.foo');

            let a = classListHelper('foo', 'contains', el);
            let b = classListHelper('non-existant', 'contains', el);

            assert.equal(a, true);
            assert.equal(b, false);
        });
        it('should be able to accept all classList single argument methods', function () {
            document.body.innerHTML = testdoms[1];
            let el = document.querySelector('.foo');

            classListHelper('bam', 'add', el);
            classListHelper('bingo', 'add', el);
            classListHelper('boom', 'remove', el);
            classListHelper('kazzam', 'toggle', el);
            assert.equal(el.classList.contains('kazzam'), true);
            classListHelper('kazzam', 'toggle', el);

            assert.equal(el.classList.contains('bam'), true);
            assert.equal(el.classList.contains('bingo'), true);
            assert.equal(el.classList.contains('boom'), false);
            assert.equal(el.classList.contains('kazzam'), false);
        });
        it('should add class "boom" to div', () => {
            document.body.innerHTML = testdoms[0];
            let el = document.querySelector('.foo');

            classListHelper('boom', 'add', el);

            assert.equal(el.classList.contains('boom'), true);
        });
        it('should remove class "test" to div', () => {
            document.body.innerHTML = testdoms[0];
            let el = document.querySelector('.foo');

            classListHelper('test', 'remove', el);

            assert.equal(el.classList.contains('test'), false);
        });
        it('should add the class "bam" & remove the class "boom"', function () {
            document.body.innerHTML = testdoms[1];
            let el = document.querySelector('.foo');

            classListHelper('bam', 'add', el);
            classListHelper('boom', 'remove', el);

            assert.equal(el.classList.contains('bam'), true);
            assert.equal(el.classList.contains('boom'), false);
            assert.equal(el.classList.contains('foo'), true);
        });
    });
    describe('Curried tests', function() {;
        it('should add class zapp to all elements', () => {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            map(els, curry(classListHelper)('zapp')('add'));

            assert(els[0].classList.contains('zapp'), true);
            assert(els[1].classList.contains('zapp'), true);
            assert(els[2].classList.contains('zapp'), true);
        });
        it('should remove class foo on all elements', () => {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            let setInactive = curry(classListHelper)('foo')('remove');

            map(els, setInactive);

            assert(els[0].classList.contains('foo'), false);
            assert(els[1].classList.contains('foo'), false);
            assert(els[2].classList.contains('foo'), false);
        });
    });
});