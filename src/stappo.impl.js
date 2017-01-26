function Stappo(merge) {

	var _lCount = 0
	var _listeners = {}
	var _state

	function immutable(obj) {
		for(const pn in obj)
			if (typeof obj[pn] == 'object') immutable(obj[pn])

		return Object.freeze(obj)
	}

	this.listen = (fn, ctx) => {
		// use object map instead of array (is smaller and faster)
		_listeners[++_lCount] = { f: fn, c: ctx }
		return _lCount
	}

	this.unlisten= hid => {
		delete _listeners[hid];
	}

	this.update = obj =>  {
		_state = immutable(merge(_state, obj))
		// notify listeners
		for(const pn in _listeners){
			const l = _listeners[pn]
			l.f.call(l.c, _state)
		}
	}

	this.get = () => _state
}


