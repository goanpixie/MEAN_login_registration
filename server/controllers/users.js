var mongoose = require('mongoose')
var User = mongoose.model('User')
var bcrypt = require('bcrypt')


function homeController() {
    this.register = function(req, res) {
        var user = User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthDate: req.body.birthDate,
            password: req.body.password,
            re_password: req.body.re_password
        })

        user.save(function(err) {
            if (err) {
                res.json(err)
            } else {
                res.json(user)
            }
        })
    }

    this.login = function(req, res) {
        console.log(req);
        User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
            if (err) {
                res.json(err)
            } else {
                if (user == null) {
                    res.json({ data: "Your information does not match our records" })
                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        res.json(user)
                    } else {
                        res.json({ data: "Your password does not match our records" })
                    }
                }
            }
        })
    }
}



module.exports = new homeController();
