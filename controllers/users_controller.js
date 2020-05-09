const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profiles', {
            title: ' User Profile',
            profile_user: user
        });
    });
}

module.exports.update = async function (req,res) {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }

    console.log(req.body.pic);

    if (req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);

            

            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('****Multi Err', err);
                } 
                
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        //for deleting we need module file system and also the path module

                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //saving the path of the uploaded file into the avatar filed in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
    }
    
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}


module.exports.account = function (req, res) {
    return res.render('account', {
        title:'Account Details',
        name: 'Dan Walter',
        phone: '123456789'
    });
}

module.exports.signUP = function (req, res) {

    if (req.isAuthenticated()) {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}


module.exports.signIN = function (req, res) {
    
    if (req.isAuthenticated()) {
        
       return res.redirect('/users/profile');
    }
    req.flash('success', 'Logged in Successfully');
    return res.render('user_sign_in', {
        title: 'Codeial | Sign-IN'
    });
    }
//send password email
module.exports.forgotPassword = function (req, res) {
    return res.render('forgot_password', {
        title: 'Codeial | Forgot Password'
    });
}

//reset-password 

module.exports.resetPassword = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        

        if (err) {
            console.log('error in finding user');
            return;
        }

        if (!user) {
            console.log('user doesnot exits');
            return res.redirect('back');
        } else {
            
        }
    })
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
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    //Todo
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have Logged Out');
    
    return res.redirect('/');
}