let assert = require('assert');
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
    describe('Method tests', function () {
        it('should be a function', () => {
            assert.equal(typeof classListHelper, 'function');
        });
    });
    describe('General tests', function () {
        it('should accepts second argument of "contains" and returns', function () {
            document.body.innerHTML = testdoms[0];
            let el = document.querySelector('.foo');

            let a = classListHelper('foo', 'contains', el);
            let b = classListHelper('non-existant', 'contains', el);

            assert.equal(a, true);
            assert.equal(b, false);
        });
        it('should accept "item" and return index', function () {
            document.body.innerHTML = testdoms[0];
            let el = document.querySelector('.foo');

            let a = classListHelper(0, 'item', el);

            assert.equal(a, 'foo')
        });
        it('should work with replace', function () {
            document.body.innerHTML = testdoms[0];
            let el = document.querySelector('.foo');

            classListHelper(['foo', 'bam'], 'replace', el);

            assert.equal(document.body.innerHTML, '<div class="bam bar"></div>');
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

            assert.equal(document.body.innerHTML, '<div class="foo bar zapp"></div><div class="foo boom zapp"></div><div class="foo baz zapp"></div>');
        });
        it('should remove class foo on all elements', () => {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            let setInactive = curry(classListHelper)('foo')('remove');

            map(els, setInactive);

            assert.equal(document.body.innerHTML, '<div class="bar"></div><div class="boom"></div><div class="baz"></div>');
        });
        it('should toggle class "boom"', function () {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            map(els, curry(classListHelper)('boom')('toggle'));

            assert.equal(document.body.innerHTML, '<div class="foo bar boom"></div><div class="foo"></div><div class="foo baz boom"></div>');
        });
        it('should test all divs for class "foo", should return all true', function () {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            let hasFoo = map(els, curry(classListHelper)('foo')('contains'));

            assert.deepEqual(hasFoo, [true, true, true])
        });
        it('should test all divs for class "bar", return true, false, false', function () {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            let hasFoo = map(els, curry(classListHelper)('bar')('contains'));

            assert.deepEqual(hasFoo, [true, false, false])
        });
        it('should return second class from each Element', function () {
            document.body.innerHTML = testdoms[2];
            let els = document.querySelectorAll('.foo');

            let classes = map(els, curry(classListHelper)(1)('item'));

            assert.deepEqual(classes, ['bar', 'boom', 'baz']);
        });
    });
});