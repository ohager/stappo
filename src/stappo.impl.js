function Stappo() {

	var _lCount = 0
	var _listeners = {}
	var _state = {}

	function _deepFreeze(obj) {
		for(let pn in obj)
			if (typeof obj[pn] == 'object') _deepFreeze(obj[pn])

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

	this.update = fn =>  {
		_state = _deepFreeze(Object.assign({}, _state, fn(_state)))
		// notify listeners
		for(let pn in _listeners){
			let l = _listeners[pn]
			l.f.call(l.c, _state)
		}
	}

	this.get = () => _state
}


