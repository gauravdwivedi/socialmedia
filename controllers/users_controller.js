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

