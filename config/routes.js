<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
'use strict';
=======
let async = require('async');
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature


module.exports = function (app, passport, auth) {
    //User Routes
<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
    const users = require('../app/controllers/users');
    const jwtAuth = require('../app/controllers/auth');
=======
    let users = require('../app/controllers/users');
    let jwtAuth = require('../app/controllers/auth');
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/chooseavatars', users.checkAvatar);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    app.post('/users/avatars', users.avatars);

    // Donation Routes
    app.post('/donations', users.addDonation);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    // Answer Routes
<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
    const answers = require('../app/controllers/answers');
=======
    let answers = require('../app/controllers/answers');
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature
    app.get('/answers', answers.all);
    app.get('/answers/:answerId', answers.show);
    // Finish with setting up the answerId param
    app.param('answerId', answers.answer);

    // Question Routes
<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
    const questions = require('../app/controllers/questions');
=======
    let questions = require('../app/controllers/questions');
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature
    app.get('/questions', questions.all);
    app.get('/questions/:questionId', questions.show);
    // Finish with setting up the questionId param
    app.param('questionId', questions.question);

    // Avatar Routes
<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
    const avatars = require('../app/controllers/avatars');
    app.get('/avatars', avatars.allJSON);

    //Home route
    const index = require('../app/controllers/index');
=======
    let avatars = require('../app/controllers/avatars');
    app.get('/avatars', avatars.allJSON);

    //Home route
    let index = require('../app/controllers/index');
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature
    app.get('/play', index.play);
    app.get('/', index.render);

    //JWT Token (Signup and Login)
<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
=======
    app.post('/api/auth/signup', jwtAuth.signUp);
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature
    app.post('/api/auth/login', jwtAuth.login);
};
