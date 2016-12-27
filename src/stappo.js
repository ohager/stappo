export default new function () {

	var _idCounter = 0
	var _listeners = []
	var _state = {}

	function _deepFreeze(obj) {

		Object.getOwnPropertyNames(obj).forEach(name => {
			let prop = obj[name];
			if (prop && typeof prop === 'object')
				_deepFreeze(prop)
		});

		return Object.freeze(obj)
	}

	this.listen = (fn, ctx) => {
		_listeners.push({id: ++_idCounter, f: fn, c: ctx})
		return _idCounter
	}

	this.unlisten= hid => {
		_listeners = _listeners.filter(l => l.id !== hid)
	}

	this.update = obj =>  {
		_state = _deepFreeze(Object.assign({}, _state, obj))
		// notify listeneres
		_listeners.forEach(l => l.f.call(l.c, _state))
	}
}


