const isUserLoggedIn = require("./isUserLoggedIn");
const ContactUs = require('../models/contactus');

const renderContactUs = (req, res) => {
    res.render('contactus', { isUserLoggedIn: isUserLoggedIn(req) });
}
const postContactUs = async (req, res) => {
    const { name, email, message } = req.body;
    // Here you would typically handle the form submission, e.g., send an email or save to a database
    try{
        const contactUs = new ContactUs({
            name,
            email,
            message
        });
        await contactUs.save();
        res.redirect('/aboutus');
    }catch (error) {
        res.status(500).send("Internal Server Error");
    }
    
}   

module.exports = {renderContactUs, postContactUs}