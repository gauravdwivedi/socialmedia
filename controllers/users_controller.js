const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profiles', {
        title:'User Profile'
    });
}

module.exports.account = function (req, res) {
    return res.render('account', {
        title:'Account Details',
        name: 'Dan Walter',
        phone: '123456789'
    });
}

module.exports.signUP = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}


module.exports.signIN = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Codeial | Sign-IN'
    });
    }


    //get the sign up data

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in Signing-Up'); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user'); return; }

                return res.redirect('/users/sign-in');
             })
        } else {
            return res.redirect('back');
        }



    });
    }

    
//Sign -in and create session for the user
module.exports.createSession = function(req, res){
    //Todo
}