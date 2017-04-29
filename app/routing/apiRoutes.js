// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
// var friends = require("./friends.js");
var indexFriends = friends.length - 1;
var bestFriendIndex = 0;
var currentComparison = 40;

//The newest user is the last item in the array
var user = friends[indexFriends];

//Goes through the index of users in array of friends
for (var i = 0; i < indexFriends; i++){
  // console.log(friends[i].scores);
  var totalDifference = 0; 

  //Goes through the index of scores in the users being compared
  for (var j = 0; j < 10 ; j++){
    
    //Calculates the absolute value between the two array scores at each index
    var difference = Math.abs(parseFloat(user.scores[j]) - parseFloat(friends[i].scores[j]) );

    //Adds the total value of the differences
    totalDifference = totalDifference + difference;
  }

  //After calculating the total, checks to see if the total difference is less than the current difference
  if (totalDifference < currentComparison){
    
    //Stores the index of new best friend
    bestFriendIndex = i;

    //Sets lowest difference to the new number to be compared
    currentComparison = totalDifference;

    // console.log(currentComparison);
  }
}

var bestfriend = friends[bestFriendIndex];
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/friends", function(req, res) {
    res.json(bestfriend);
  });

  // app.get("/api/waitlist", function(req, res) {
  //   res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    friends.push(req.body);
    
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/clear", function() {
    // Empty out the arrays of data
    friends = [];

    console.log(friends);
  });
};
