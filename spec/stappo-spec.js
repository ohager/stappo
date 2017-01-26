var Stappo = require("../build/stappo.js");
var stappo;

describe("Stappo Generic (Bundle)", function () {

	beforeEach(function(){
		stappo = new Stappo();
	});

	it("should notify only active listeners", function () {
		const listener1 = stappo.listen( s => {
			expect(s.a).toBe(1);
		});

		const listener2 = stappo.listen( s => {
			throw "Shouldn't be called";
		});

		stappo.unlisten(listener2);
		stappo.update({a:1});
		stappo.unlisten(listener1);

	});

	it("should merge simple state and notify", function () {

		const listener = stappo.listen( s => {
			expect(s.a).toBe(1);
		});

		stappo.update({a:1});
		stappo.unlisten(listener);
	});



	it("should make multiple updates and notify", function () {

		stappo.update({a:1});
		stappo.update({a:2});

		const listener = stappo.listen( s => {
			expect(s.a).toBe(3);
		});
		stappo.update({a:3});
		stappo.unlisten(listener);
	});

	it("should merge complex state and notify", function () {

		stappo.update({a:{ b: { c: 1}}});

		const listener = stappo.listen( s => {
			expect(s.a.b).toEqual( {c:1, d:2} );
		});

		stappo.update({a:{ b: { d: 2}}});
		stappo.unlisten(listener);
	});

	it("should allow computed properties", function () {

		const listener = stappo.listen( s => {
			expect(s.a).toBe(2);
			expect(s.b).toBe(200);
		});

		stappo.update({a:2, get b() {return this.a * 100} });
		stappo.unlisten(listener);
	});

	it("should return current state", function () {
		expect(stappo.get()).toBe(undefined)
		stappo.update({a:1})
		expect(stappo.get().a).toBe(1)
	});

	it("should have deeply immutable state", function () {

		const listener = stappo.listen( s => {
			s.a.foo = 2;
			s.b.bar[0] = 100;
			expect(s.a.foo).toBe(1);
			expect(s.b.bar[0]).toBe(0);
		});

		stappo.update({
			a: { foo: 1},
			b : {bar: [0,1,2]}
		});
		stappo.unlisten(listener);
	});


});
