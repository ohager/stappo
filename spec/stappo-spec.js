var stappoDir;

// @ifdef DIST
stappoDir = "../dist/stappo";
// @endif

// @ifndef DIST
stappoDir = "../src/stappo";
// @endif

var stappo = require(stappoDir);

describe("Stappo", function () {

	beforeEach(function(){
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
