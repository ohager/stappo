# stappo

`npm i -S stappo`

Maybe the smallest Application State Manager ever.

This project is just to checkout the limits on optimization. The aim is to squeeze out the last bytes and create the worlds smallest
 application state manager written in Javascript.

Besides all that fun, it is meant to be fully functional and usable for real-world applications. 

[ONLINE DEMO](https://rawgit.com/ohager/stappo/master/demo/index.html)

## A brief introduction to Application State Management

Nowadays, web applications can be quite complex and the big challenge of such complex (web) applications how to manage their complexity. State-of-the-art is component based development; 
Libraries/Frameworks like ReactJS, Angular2, Aurelia, VueJS, RiotJS and others applies this concept. This allows the devs to break down everything in more or less decoupled and (hopefully) 
reusable parts, which can be put together like Lego(tm).

Besides the composition feature a web application needs to communicate with the backend to store or fetch persistent data. The common approach to interoperate with the backend is a REST-like/-ful API, 
or even more recent techniques like GraphQL (Relay). 

Each application of a certain complexity (usually the complexity doesn't need to be high, as you may see in the demo) needs to maintain some shared data amongst its components. This data represents a specific situation at a specific moment of that application while a user interacts with it. 
This is considered as application state. That state should be

1. accessible by all components of an application
2. ideally, stored in a single place (_Single Source of Truth_)
3. mutable by a well-defined interface only 

> __Definition__: An application state is a deterministic situation at a certain moment of that application within the context of user interaction.

As one can see in the [ONLINE DEMO](https://rawgit.com/ohager/stappo/master/demo/index.html), even very simple applications must share states amongst it components. 
The demo consists of very few components (<10), but has to share a item list and a search term:

On adding a new item via the single input field, the item list must be updated. Additionally, the search bar allows text-based filtering; the item list is being updated on changed search term and changed item. 
This is still a very simple scenario, but it shows that _three components interoperate with two shared states_.
      

## Versions

1. __Generic Bundle__ `./dist/stappo.bundle.js` - A browserified bundle usable either on client- (Browser) or server-side (NodeJS). The bundles supports AMD/UMD/CommonJS/ES6 module importation.
2. __Generic__ `.dist/stappo.min.js` - Usable on client or server-side, but without any module support (plain ES5 class)
3. __Web-Only Bundle__ `./dist/stappo.web.bundle.js` - Only for browsers, supports AMD/UMD/CommonJS/ES6 module  
4. __Web-Only__ `./dist/stappo.web.min.js` - Plain class, for browsers only...no overhead at all!    

### Generic vs Web-Only

The generic version implements its own observer (aka pub/sub) pattern, and therefore doesn't rely on specific platform.
The web-only version uses custom events of the browsers event system (addEventListener). The web-only version is smaller than the generic version.


## Optimization Status

### 298 Bytes (web-only)

Using the Google Closure Compiler Service the web-only version can be compressed to 298 bytes

```javascript
function Stappo(a){function d(c){for(var a in c)if(c.hasOwnProperty(a)){var b=c[a];"object"==typeof b&&d(b)}return Object.freeze(c)}a=void 0===a?"stappo":a;var b;this.update=function(c){b=d(Object.assign({},b,c));window.dispatchEvent(new CustomEvent(a,{detail:b}))};this.get=function(){return b}};
```
[Show file](https://raw.githubusercontent.com/ohager/stappo/master/dist/stappo.web.min.js) 

### Other sizes

1. __Generic Bundle__ `./dist/stappo.bundle.js` - 1.330 bytes
2. __Generic__ `.dist/stappo.min.js` - 360 bytes
3. __Web-Only Bundle__ `./dist/stappo.web.bundle.js` - 1.303 bytes  
4. __Web-Only__ `./dist/stappo.web.min.js` - 298 bytes    


## Very easy to use

The overall concept is deadly simple. _Stappo_ maintains an Application State, where interested modules/components 
 can listen to, while others may update the state. 
 On state updates the subscribed listeners are called, receiving the new state. The state is __immutable__.
 
### Example Generic Bundle

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
