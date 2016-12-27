'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = new function () {

	var _idCounter = 0;
	var _listeners = [];
	var _state = {};

	function _deepFreeze(obj) {

		Object.getOwnPropertyNames(obj).forEach(function (name) {
			var prop = obj[name];
			if (prop && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') _deepFreeze(prop);
		});

		return Object.freeze(obj);
	}

	this.listen = function (fn, ctx) {
		_listeners.push({ id: ++_idCounter, f: fn, c: ctx });
		return _idCounter;
	};

	this.unlisten = function (hid) {
		_listeners = _listeners.filter(function (l) {
			return l.id !== hid;
		});
	};

	this.update = function (obj) {
		_state = _deepFreeze(Object.assign({}, _state, obj));
		// notify listeneres
		_listeners.forEach(function (l) {
			return l.f.call(l.c, _state);
		});
	};
}();