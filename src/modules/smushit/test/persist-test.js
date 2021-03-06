var Persist = require('../lib/persist').Persist;
var nodeunit = require("nodeunit");

var persist;

exports['persist'] = nodeunit.testCase({
	
	setUp: function(callback){
		persist = new Persist();
		callback();
	},
	
	tearDown: function(callback){
		persist.clear();
		callback();
	},

	"persist getItem": function(test){
		test.equal(null, persist.getItem('a'));
		test.done();
	},
	
	"persist setItem & removeItem": function(test){
		persist.clear();
		test.equal(null, persist.getItem('a'));
		persist.setItem('a', 'A');
		test.equal('A', persist.getItem('a'));
		persist.removeItem('a');
		test.equal(null, persist.getItem('a'));
		test.done();
	},

	"persist clear": function(test){		
		test.equal(null, persist.getItem('a'));
		persist.setItem('a', 'A');
		persist.setItem('b', 'B');
		persist.setItem('c', 'C');
		test.equal('A', persist.getItem('a'));
		test.equal('B', persist.getItem('b'));
		test.equal('C', persist.getItem('c'));
		persist.removeItem('a');
		test.equal(null, persist.getItem('a'));
		test.equal('B', persist.getItem('b'));
		test.equal('C', persist.getItem('c'));
		persist.clear();
		test.equal(null, persist.getItem('b'));
		test.equal(null, persist.getItem('c'));
		test.done();
	},

	"persist length": function(test){
		persist.clear();
		test.equal(0, persist.length);
		persist.setItem('a', 'A');
		test.equal(1, persist.length);
		persist.setItem('b', 'B');
		persist.setItem('c', 'C');
		test.equal(3, persist.length);
		persist.removeItem('a');
		test.equal(2, persist.length);
		persist.clear();
		test.equal(0, persist.length);
		test.done();
	},
	
	"persist each": function(test){
		persist.clear();
		var m = {
			'a': 'A',
			'b': 'B',
			'c': 'C'
		}
		persist.setItem('a', 'A');
		persist.setItem('b', 'B');
		persist.setItem('c', 'C');
		persist.each(function(key, value){
			test.equal(m[key], value);
			delete m[key];
		});
		var mKeyCount = 0;
		for(var i in m){
			mKeyCount ++;
		}
		test.equal(0, mKeyCount);
		test.done();
	}
	
});