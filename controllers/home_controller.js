const Post = require('../models/post');
const User = require('../models/user');



// module.exports.home = function (req, res) {
//    // console.log(req.cookies);
//     // return res.render('home', {
//     //     title: 'Home'
        
//     // });

//     // Post.find({}, function (err, posts) {
//     //     return res.render('home', {
//     //         title: "Codeial |Home",
//     //         posts: posts
//     //     });
//     // });


//     //populate the user for each post
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path:'user'
//             }
//         })
//         .exec(function (err, posts) {
//             User.find({}, function (err, users) {
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     posts: posts,
//                     all_users: users
//                 });
//             });

      
//     });
// }


module.exports.home = async function (req, res) {
    try {


        //populate the likes for each post and comment
        //populate the user for each post
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes');
        
        
        
        let users = await User.find({});

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }
}


// module.exports.actionName =function(req,res){}