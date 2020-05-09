const User = require('../../../models/user');
const env = require('../../../config/environment');
const jwt = require('jsonwebtoken');

module.exports.createSession =async function (req, res) {
    
    try {
        let user = await User.findOne({ email: req.body.email });
        
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid Username or Password"
            });
        }
        return res.json(200, {
            message: 'Sign in succesful, here is your token, please keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(),env.jwt_secret , { expiresIn: '10000' })
            }
        });

    } catch (err) {
        console.log('****', err);
        return res.json(500, {
            message: "Internl Server Error"
            
        });
    }
}