var merge = require("../build/merge.js");

describe("Deep Merge", function () {

	it("should merge simple objects", function () {
		const merged = merge({ a: 1 },{ b: 2 });
		expect(merged).toEqual( {a:1,b:2});
	});

	it("should merge simple objects into empty target", function () {
		const merged = merge({},{ a: 1 });
		expect(merged).toEqual( {a:1});
	});

	it("should merge simple objects with array values", function () {
		const merged = merge({ a: 1 },{ b: [1,2,3] });
		expect(merged).toEqual( {a:1,b:[1,2,3]});
	});

	it("should work for empty source objects", function () {
		const merged = merge({ a: 1 },{});
		expect(merged).toEqual( {a:1});
	});

	it("should overwrite existing properties", function () {
		const merged = merge({ a: 1, b : 'a' },{ a: 2, b : { h: 2}});
		expect(merged).toEqual( {a:2, b : {h : 2}});
	});

	it("should merge deep objects (depth 2)", function () {
		const merged = merge({ a: { b : 1 } },{ a: { c: 2} });
		expect(merged).toEqual( {a: { b : 1, c : 2}});
	});

	it("should merge deep objects (depth 3)", function () {
		const merged = merge({ a: { b : { y: 1 } } }, { a: { b: { x: 1 }, c: 2} });
		expect(merged).toEqual( {a: { b : { x: 1, y: 1}, c : 2}});
	});

	it("should merge somewhat deep objects", function () {
		const merged = merge({
			a: 2,
			b : { h : { x: 1, y: 2} },
			c : [ {s : "1"}, {s: "2"} ]
		},
		{
			a: { h : "word" },
			b : { h : { z: 100 } },
			d : { h :  [1,2,3] }
		})

		expect(merged).toEqual(
			{
				a: { h : "word" },
				b : { h : { x: 1, y: 2, z: 100} },
				c : [ {s : "1"}, {s: "2"} ],
				d : { h :  [1,2,3] }
			}
		);
	});

});
