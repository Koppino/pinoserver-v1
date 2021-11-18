module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            console.log(
                new Date().toLocaleString("cs-EN").replace(" ", "").replace(" ", "") + " : " + req.user.username
              );

            return next();
        }

        res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard')
    }
};