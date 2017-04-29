# Friend-Finder

 Compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site will take in results from the survey, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match. 

## Live link

[Hot friend finder!](https://hot-friend-finder.herokuapp.com/)

## Description on how to use the app

* From the home page, click the button to enter the survey.

* Enter your name and a link to your photo. 

* Answer the questions on the survey from a scale of 1 to 5.

* If you do not enter a name or photo link, the survey will not give you a result.  

* Once you get your best friend result, you can review your best friend again by going to the '/bestfriend' route or clicking the link on the bottom of the page. 

* The current list of friends can be seen in the '/friend' route or clicking the link on the bottom of the page.

## Requirements

1. The survey has ten questions. Each answer should be on a scale of 1 to 5 based on how much the user agrees or disagrees with a question.

2. The `server.js` file requires the basic npm packages: `express`, `body-parser` and `path`.

3. Your `htmlRoutes.js` file should include two routes:

   * A GET Route to `/survey` which should display the survey page.
   * A default USE route that leads to `home.html` which displays the home page. 

4. Your `apiRoutes.js` file should contain two routes:

   * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

5. The data is saved in the app as an array of objects. Each of these objects should roughly follow the format below.

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
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
```

6. Determine the user's most compatible friend using the following as a guide:

   * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
     * Example: 
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on. 
   * The closest match will be the user with the least amount of difference.

7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
   * The modal should display both the name and picture of the closest match. 



## Technologies Used 
* express
* nodeJS
* npm
* heroku

## Code Explanation

* When the user inputs their information, they create a newUser object with the name, photo link, and an array of scores. This object is then pushed into the friends array in the '/friends' route.


* The logic for picking a best friend can be found in the apiRoutes.js file. When the user submits their survey, they request the best friend object from the '/bestfriend' route. The best friend is found from the list of friends in the '/friends' route.

```
app.get("/bestfriend", function(req, res) {
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

    res.json(bestfriend);
  });
 ```

* The '/bestfriend' route returns an object that is then displayed in a model after the button is pressed and the logic is run.