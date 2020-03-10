const Post = require('../models/post');
module.exports.home = function (req, res) {
   // console.log(req.cookies);
    // return res.render('home', {
    //     title: 'Home'
        
    // });

    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "Codeial |Home",
    //         posts: posts
    //     });
    // });

    Post.find({}).populate('user').exec(function (err, posts) {
        return res.render('home', {
            title: "Codeial |home",
            posts: posts
        });
    });
}





// module.exports.actionName =function(req,res){}