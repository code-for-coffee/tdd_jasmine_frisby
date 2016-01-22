// describe a suite of tests
// describe('a suite of tests to run', function() {
//
//   // it has a test...
//   it('wants to make sure jasmine likes it', function() {
//     expect(0).toEqual(0);
//     expect(0).toBe(0);
//   });
//
// });

var url = "http://localhost:3000/api";
var frisby = require('frisby');

frisby.create('Create an entry via POST')
  .post(url + '/gauc', {
    recipeName: 'Traditional guac-hummus',
    rating: 3,
    desc: 'y u even try dis?!??@?@?'
  })
  .afterJSON(function(recipe) {
    var id = recipe["_id"];
    var result = recipe;
    // jasmine tests
    describe('a restful controller', function() {
      it('can create a new entry on the api', function() {
        expect(result.hasOwnProperty('recipeName')).toBe(true);
        expect(result.hasOwnProperty('rating')).toBe(true);
        expect(result.hasOwnProperty('desc')).toBe(true);
        expect(result['recipeName']).toEqual('Traditional guac-hummus');
        expect(result['rating']).toEqual(3);
        expect(result['desc']).toEqual('y u even try dis?!??@?@?');
      });
    });
  })
.toss();
