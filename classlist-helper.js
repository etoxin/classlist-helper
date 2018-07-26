/**
 * ClassList helper
 * @param {String} className the class you want to add,remove from a HTMLElement.
 * @param {String} method the classList method you want to use
 * @param {HTMLElement} element that you want to manipluate the class on.
 * @returns {*}
 */
function classlistHelper(className, method, element) {
  return element.classList[method](className);
}
  
module.exports = classlistHelper;