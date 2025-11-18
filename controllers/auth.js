export const redirectIfLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/user');
    }
    next();
};

export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/user/login');
    }
    next();
};
