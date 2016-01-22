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
  .post(url + '/guac', {
    recipeName: 'Traditional guac-hummus',
    rating: 3,
    desc: 'y u even try dis?!??@?@?'
  })
  .afterJSON(function(recipe) {
    var id = recipe["_id"];
    var result = recipe;
    // jasmine tests
    describe('a restful controller', function() {
      // create
      it('can create a new entry on the api', function() {
        expect(result.hasOwnProperty('recipeName')).toBe(true);
        expect(result.hasOwnProperty('rating')).toBe(true);
        expect(result.hasOwnProperty('desc')).toBe(true);
        expect(result['recipeName']).toEqual('Traditional guac-hummus');
        expect(result['rating']).toEqual(3);
        expect(result['desc']).toEqual('y u even try dis?!??@?@?');
      });

      // read
      it('can read an entry on the api that we created', function() {
        frisby.create('get method')
          .get(url + '/guac/' + id)
          .expectStatus(200)
          .afterJSON(function(data) {
            expect(data.hasOwnProperty('_id')).toBe(true);
            expect(data['_id']).toEqual(id);
          }).toss();
      });


      // update
      it('can update an entry on the API', function() {
        frisby.create('update method')
          .put(url + '/guac/' + id, { rating: 1 })
          .expectStatus(200)
          .afterJSON(function(recipe) {
            expect(recipe.hasOwnProperty('_id')).toBe(true);
            expect(recipe['_id']).toEqual(id);
          }).toss();
      });

      // delete
      it('can delete an entry on the API', function() {
        frisby.create('delete method')
          .delete(url + '/guac/' + id)
          .expectStatus(200)
          .afterJSON(function(data) {
            expect(data.hasOwnProperty('message')).toBe(true);
            expect(data.message).toEqual('Recipe was deleted');
          }).toss();
      });

      // read all
      it('can get list & verify we removed one', function() {
        frisby.create('get method')
          .get(url + '/guac/')
          .expectStatus(200)
          .afterJSON(function(data) {
            if (data.length < 1) {
              expect(data.length).toBe(0);
            } else {
              var doesExist = false;
              for (var entry in data) {
                var acc = data[entry];
                var testId = acc['_id'];
                if (testId == id) {
                  doesExist == true;
                }
              }
              expect(doesExist).toBe(false);
            }
          }).toss();
      })
    });
  })
.toss();
