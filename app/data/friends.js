// ===============================================================================
// DATA
// Below data will hold all of the friends we've made.
// Initially we just set it equal to a "dummy" friend.
// But you could have it be an empty array as well.
// ===============================================================================

var friends = [
  {
    "name": "Ahmed",
    "photo":"http://www.cutestpaw.com/wp-content/uploads/2011/11/Miss-You-My-Love.jpg",
  	"scores":[
      1,
      1,
      4,
      2,
      5,
      1,
      2,
      5,
      3,
      1
    ]
  },
  {
    "name": "Boody Fool",
    "photo":"http://cdn.hercampus.com/s3fs-public/2015/09/18/Poodle.jpg",
  	"scores":[
      2,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
  }
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = friends;
