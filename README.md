# stappo

Maybe the smallest Application State Manager ever.

This project is just to checkout the limits on optimization. The aim is to squeeze out the last bytes and create the worlds smallest
 application state manager written in Javascript.

Besides all that fun, it is meant to be fully functional and usable for real-world applications. 

## Usage

In the near future a first version for npm will be published.

To use it right now, just pick up the `./dist/stappo.min.js`, or the browserified version `./dist/stappo.bundle.min.js`

In fact, these builds have some overhead, which I want to see ow to get rid of it. 


## Very easy to use

The overall concept is deadly simple. _Stappo_ maintains an Application State, where interested modules/components 
 can listen to, while others may update the state. 
 On state updates the subscribed listeners are called, receiving the new state. The state is __immutable__.
 
### Example

```javascript
	const stappo = require('stappo');
	// 
	const listener = stappo.listen( state => {
	    console.log("Updated State", JSON.stringify(state, "  "));
	});
	 
	// update the state --- it'll be merged into the application state
	stappo.update({ 
	    foo: { 
	        bar : { 
	            a: 42, 
	            b : [0,1,2]
	        }
	}});
	// stop listen to state changes
	stappo.unlisten(listener);
```

# API

### `stappo.listen(functionObj, context?):number`
 
The listen function accepts a functionObj of the following signature `function(state){}`. The state is the updated state and it is __immutable__.
The functionObj is being called on each update of the application state. The second optional argument is the calling context, also referred as the _thisArg_.
It is used to give the called functionObj its calling context (where `this` references to -- similar to `Object.prototype.call`)

The function returns an id, which can/should be used on `stappo.unlisten`.


### `stappo.unlisten(listenerId)`
 
Revokes the subscription established on `stappo.listen`. The `listenerId` is the return value from `stappo.listen`.

### `stappo.update(jsonObj)`
 
Updates the application state, i.e. merges the `jsonObj` into the application state. On update all listeners are notified.


# Roadmap

- To be even smaller I need to mess around with the module system. 
- I intent to make it available also as a pre-historic standalone lib (for non-2017 individuals - like me). That way it won't have any overhead it all --- keep it fucking simple, dude!
- Additionally, I want to include Google Closure Compiler to make it even smaller...e.g. like this:
(402 bytes)
``` javascript
window.Stappo=new function(){function e(b){Object.getOwnPropertyNames(b).forEach(function(a){(a=b[a])&&"object"===typeof a&&e(a)});return Object.freeze(b)}var f=0,c=[],d={};this.listen=function(b,a){c.push({id:++f,f:b,c:a});return f};this.unlisten=function(b){c=c.filter(function(a){return a.id!==b})};this.update=function(b){d=e(Object.assign({},d,b));c.forEach(function(a){return a.f.call(a.c,d)})}};
```
