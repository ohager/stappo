function Stappo(eventId='stappo') {

	var state

	function _deepFreeze(obj) {
		for(let pn in obj)
			if (typeof obj[pn] == 'object') _deepFreeze(obj[pn])
		return Object.freeze(obj)
	}
	this.update = fn =>  {
		state = _deepFreeze(Object.assign({}, state, fn()))
		window.dispatchEvent(new CustomEvent(eventId, { 'detail': state}))
	}

	this.get = () => state
}


