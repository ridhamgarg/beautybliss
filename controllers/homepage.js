
const isUserLoggedIn = require("./isUserLoggedIn");
const renderAboutUs = async (req, res) => {
    res.render('aboutus', {isUserLoggedIn: isUserLoggedIn(req) });
}

module.exports = {
    renderAboutUs
}