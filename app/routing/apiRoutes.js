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
        if(req.body.photo !== "" && req.body.name !== "") {
                var bestie = logic(req);
                // return true statement
                console.log(bestie);
                res.json(bestie);


                // add new friend
                friendArray.push(req.body);

        }
        else {
            // HOWEVER, instead of returning "false", should return "please
            // complete required fields"
            res.json(false);
        }
    });

    function logic(req) {
        // function that goes through the req & perform calculations
        var closestFriend;
        var checked = false;
        var usrScore = 0;

        for(var i = 0; i < req.body.scores.length; i++) {
            usrScore = usrScore + parseInt(req.body.scores[i]);
            checked = true;
        };

        if(checked) {
            // NEED to put this somewhere else? it could be asynchronous
            // var friendScore = 0;
            // max diff is 50 - 10 = 40
            var closestDiff = 40; 
            var diff = 0;

            for(var i = 0; i < friendArray.length; i++) {

                var friendScore = 0; // DO I HAVE TO INITILIZE NUM TO 0 BEFORE I USE IT AS NUM VARIABLE???????

                // go through each friend and calculate scores
                for(var j = 0; j < friendArray[i].scores.length; j++) {
                    friendScore = friendScore + parseInt(friendArray[i].scores[j]);

                };

                // after getting the closestScore, evaluate with the usrScore
                // console.log("\n--------------\n");
                // console.log("usescore " + usrScore);
                // console.log("friendscore " + friendScore);
                // console.log("absolute equation : " + Math.abs(usrScore - friendScore));
                // console.log("\n--------------\n");
                diff = Math.abs(usrScore - friendScore);


                if(diff < closestDiff) {
                    closestDiff = diff;
                    closestFriend = friendArray[i];
                }

            };
        }
        
        return closestFriend;

    };
};