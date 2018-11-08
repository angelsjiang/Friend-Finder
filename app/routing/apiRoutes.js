// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON 
// of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
// This route will also be used to handle the compatibility logic.

// load data
var friendArray = require('../data/friends');

module.exports = function(app) {
    
    // API GET request
    app.get('/api/friends', function(req, res) {
        res.json(friendArray);
    });

    // API POST request
    app.post('/api/friends', function(req, res) {
        
        console.log("From apiroutes server: " + req.body.photo);
        if(req.body.photo !== "") {

            // add new friend
            friendArray.push(req.body);

            // function that goes through the req & perform calculations
            var usrScore;
            for(var i = 0; i < req.body.scores.length; i++) {
                usrScore += req.body.scores[i];
            };

            // need a function that goes through the friend array
            var closestScore = 0;
            // max diff is 50 - 10 = 40
            var closestDiff = 90; 
            // who's my closest friend?
            var closestFriend = {};
            for(var i = 0; i < friendArray.length; i++) {

                // go through each friend and calculate scores
                for(var j = 0; j < friendArray[i].scores.length; j++) {
                    closestScore += friendArray[i].scores[j]; 
                };

                // after getting the closestScore, evaluate with the usrScore
                var diff = Math.abs(usrScore - closestScore);
                if(diff < closestDiff) {
                    closestDiff = diff;
                    closestFriend = friendArray[i];
                };
                
            };

            // return true statement
            res.json(closestFriend);

            // HOWEVER, instead of returning "true", need to parse 
            // the information as name and photo
        }
        else {
            // HOWEVER, instead of returning "false", should return "please
            // complete required fields"
            res.json(false);
        }
    });
};