function merge(dest, src){

	const isObj = o => typeof o == 'object'

	if(!dest) return src

	for(let pn in src){
		const sp = src[pn]
		let dp = dest[pn]
		dest[pn] = isObj(sp)? ( isObj(dp) ? merge(dp,sp) : sp) : sp
	}
	return dest
}