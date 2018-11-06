// Need the path package to get the correct file path for the html
var path = require("path");

// Routing 
module.exports = function(app) {
    
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    })

    // if no matches found, default to home
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};