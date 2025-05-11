const isUserLoggedIn = require("./isUserLoggedIn");
const renderCart = (req, res) => {
    res.render('cart', { isUserLoggedIn: isUserLoggedIn(req) });
}
module.exports = {
    renderCart
}