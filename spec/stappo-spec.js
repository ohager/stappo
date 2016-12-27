var stappoDir;

// @ifdef DIST
stappoDir = "../dist/stappo";
// @endif

// @ifndef DIST
stappoDir = "../src/stappo";
// @endif

var stappo = require(stappoDir);

describe("Stappo Basics", function () {

	beforeEach(function(){
	});
	
	it("first fucking useless test", function () {
		expect(false).toBeTruthy();
	});


});
