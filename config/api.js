const jwt = require('jsonwebtoken'),
      user = mongoose.model('User');




module.exports = function(app) {

  app.post('/api/auth/login', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;


  });

};


