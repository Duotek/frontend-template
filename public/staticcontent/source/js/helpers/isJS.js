/**
 * Check JS support
 * @returns {boolean}
 */
(function checkJSsupport() {
	document.documentElement.classList.remove('no-js');
	document.documentElement.classList.add('js');
	return true;
})();
