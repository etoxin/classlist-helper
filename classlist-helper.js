/**
 * ClassList helper
 * @param {String|Array} className the class you want to add,remove from a HTMLElement.
 * @param {String} method the classList method you want to use
 * @param {HTMLElement} element that you want to manipluate the class on.
 * @returns {*}
 */
function classlistHelper(className, method, element) {
    if (Array.isArray(className)) {
        return element.classList[method](...className);
    } else {
        return element.classList[method](className);
    }
}

module.exports = classlistHelper;
