function Stappo(eventId='stappo') {

	var _state = {}

	function _deepFreeze(obj) {
		for(let pn in obj)
			if (typeof obj[pn] == 'object') _deepFreeze(obj[pn])
		return Object.freeze(obj)
	}
	this.update = fn =>  {
		_state = _deepFreeze(Object.assign({}, _state, fn()))
		window.dispatchEvent(new CustomEvent(eventId, { 'detail': _state}))
	}

	this.get = () => _state
}


