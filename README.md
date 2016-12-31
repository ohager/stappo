# stappo

`npm i -S stappo`

Maybe the smallest Application State Manager ever.

This project is just to checkout the limits on optimization. The aim is to squeeze out the last bytes and create the worlds smallest
 application state manager written in Javascript.

Besides all that fun, it is meant to be fully functional and usable for real-world applications. 

[ONLINE DEMO](https://rawgit.com/ohager/stappo/master/demo/index.html)

## Optimization Status

### 297 Bytes (web-only)


Using the Google Closure Compiler Service the web-only version can be compressed to 297 bytes

```javascript
function Stappo(a){function d(c){for(var a in c)if(c.hasOwnProperty(a)){var b=c[a];"object"==typeof b&&d(b)}return Object.freeze(c)}a=void 0===a?"stappo":a;var b;this.update=function(c){b=d(Object.assign({},b,c));window.dispatchEvent(new CustomEvent(a,{detail:b}))};this.get=function(){return b}};
```

> Note: The Closure Compiler is not part of build chain yet, so the current dist versions aren't that small! 

## Very easy to use

The overall concept is deadly simple. _Stappo_ maintains an Application State, where interested modules/components 
 can listen to, while others may update the state. 
 On state updates the subscribed listeners are called, receiving the new state. The state is __immutable__.
 
### Example

```javascript
	// stappo must be instantiated
	// this could be useful to manage large states (e.g one instance per domain) 
	const StappoClass = require('stappo');
	const stappo = new StappoClass()
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

# API (Generic Version)

### `stappo.listen(functionObj, context?):number`
 
The listen function accepts a functionObj of the following signature `function(state){}`. The state is the updated state and it is __immutable__.
The functionObj is being called on each update of the application state. The second optional argument is the calling context, also referred as the _thisArg_.
It is used to give the called functionObj its calling context (where `this` references to -- similar to `Object.prototype.call`)

The function returns an id, which can/should be used on `stappo.unlisten`.

### `stappo.unlisten(listenerId)`
 
Revokes the subscription established on `stappo.listen`. The `listenerId` is the return value from `stappo.listen`.

### `stappo.update(jsonObj)`
 
Updates the application state, i.e. merges the `jsonObj` into the application state. On update all listeners are notified.

### `stappo.get()`

Returns the current state

# API (Web-only Version)

The web only version uses the browser's event system, while the generic version implements its own observer.
Therefore, no `listen` and `unlisten` method exist. Listening to the event works like this:

```javascript
window.addEventListener('stappo', e => { console.log('state updated', e.detail)} )
const stappo = new Stappo();

stappo.update({poo: 'fart'}); // emits 'stappo' event

window.removeEventListener('stappo');
```

### `new Stappo(eventTypeName?)` - constructor  
  
Creates a new Stappo instance. When using more than one instance (e.g. for differnt domains/contexts) you need to define an custom event type name.
  
Example for multiple instances:
```javascript
const stappoProducts = new Stappo('stappo.products');
const stappoOrders = new Stappo('stappo.orders');

window.addEventListener('stappo.products', e => { console.log('state updated', e.detail)} )
window.addEventListener('stappo.orders', e => { console.log('state updated', e.detail)} )

stappoProducts.update({products: newProducts}) // emits 'stappo.products'
stappoOrders.update({orders: newOrders}) // emits 'stappo.orders'

```
  
### `stappo.update(jsonObj)`
  
Updates the application state, i.e. merges the `jsonObj` into the application state. On update all listeners are notified.
 
### `stappo.get()`
 
Returns the current state


# Roadmap

- To be even smaller I need to mess around with the module system.
- I intent to make it available also as a pre-historic standalone lib (for non-2017 individuals - like me). That way it won't have any overhead it all --- keep it fucking simple, dude!
- Use Google Closure Compiler Service as builder
