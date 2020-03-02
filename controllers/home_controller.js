module.exports.home = function (req, res) {
    return res.end('<h1>Express is up for Codeial</h1>')
}


module.exports.gaurav = function (req, res) {
    return res.end('<h1>This is another route in the route -Gaurav</h1>');
}
// module.exports.actionName =function(req,res){}