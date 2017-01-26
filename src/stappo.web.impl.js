function Stappo(merge, eventId='stappo') {

	var state

	// maybe extract this guy!
	function immutable(obj) {
		for(let pn in obj)
			if (typeof obj[pn] == 'object') immutable(obj[pn])
		return Object.freeze(obj)
	}

	this.update = obj =>  {
		state = immutable(merge(state, obj))
		window.dispatchEvent(new CustomEvent(eventId, { 'detail': state}))
	}

	this.get = () => state
}


